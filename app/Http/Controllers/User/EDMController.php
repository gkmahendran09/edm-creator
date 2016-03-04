<?php
namespace App\Http\Controllers\User;

use App\Models\System\Template;
use App\Models\User\User;
use App\Models\User\EDM;

use App\Http\Requests\User\EDM\CreateEDMRequest;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Chumper\Zipper\Zipper;

use Auth, Session, Validator, Storage, Blade;

class EDMController extends Controller
{

	protected function getRawHTML($edm, $relative_links = false)
	{
		$scope_values = json_decode($edm->scope_values);

		$html = $edm->html_header;
		$html .= '<title>' . $scope_values->properties->pageTitle . '</title>';
		if($scope_values->properties->isResponsive) {
			$html .= $edm->css;
		}
		$html .= '</head><body style="background-color:' . $scope_values->properties->pageBackground . '; position:relative">';

		// remove angular tags
		$purehtml = $edm->html;
		$purehtml = preg_replace("/(<rgedm.*?>)/", "", $purehtml);
		$purehtml = preg_replace("/(<\/rgedm.*?>)/", "", $purehtml);

		// relative links
		if($relative_links) {
			$html .= preg_replace("/\/user\/edm\/front\-end\-asset\?path\=\/app\/edms\/(.*)\/images/", "images",$purehtml);
		} else {
			$html .= $purehtml;
		}
		$html .= $edm->html_footer;

		return $html;
	}

	protected function createZip($user_id, $edm)
	{
		$html = self::getRawHTML($edm, true); // edm object, relative links?

		$file_path = 'edms/'. $user_id . '-' . str_slug($edm->edm_name);
		$file_name = '/index.html';
		$full_path = $file_path . $file_name;
		Storage::put($full_path, $html);

		$zipper = new Zipper;

		$package_path = storage_path('app/'. $file_path . '/package.zip');
		$package_file_path = storage_path('app/'. $file_path . '/index.html');
		$images = glob(storage_path('app/'. $file_path) . '/images/*'); // TODO: Instead - we need to compare "imageAssets" array

		$zipper->make($package_path);
		$zipper->add($package_file_path);
		$zipper->folder('images')->add($images);

		return $package_path;
	}

	public function __construct()
  {
      $this->middleware('auth');
  }
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$edms = Auth::user()->edms;

		return view('user.edm.index')->with('edms', $edms);

	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create()
	{
		$templates = Template::select('id', 'template_name')
														->get();

		return view('user.edm.create')->with("templates", $templates);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \App\Http\Requests\User\EDM\CreateEDMRequest  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(CreateEDMRequest $request)
	{
		$template = Template::findOrFail($request->input('template'));

		$edm = new EDM();

		$edm->user_id 		 		 = Auth::user()->id;
		$edm->edm_name 		 		 = $request->input('edm_name');
		$edm->html_header	 		 = $template->html_header;
		$edm->html_footer	 		 = $template->html_footer;
		$edm->css							 = $template->css;
		$edm->html						 = $template->html;
		$edm->scope_values		 = $template->scope_values;
		$edm->created_by			 = Session('USER.name');
		$edm->updated_by			 = Session('USER.name');

		$edm->save();

		return redirect()->route('user.edm.edit',['id' => $edm->id]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
			//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		$edm = EDM::where('user_id',Auth::user()->id)->findOrFail($id);
		return view('user.edm.edit')->with('edm', $edm);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \App\Http\Requests\User\EDM\CreateEDMRequest  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		$rules = array(
			'html' => 'required',
			'scope_values' 	=> 'required',
		);

		$validator = Validator::make($request->all(), $rules);

		if ($validator->fails())
		{
			return redirect()->back()->withInput()->withErrors($validator->errors());
		}
		else
		{
			$edm = EDM::where('user_id',Auth::user()->id)->findOrFail($id);

			$edm->html 						= $request->html;
			$edm->scope_values 		= $request->scope_values;
			$edm->updated_by      = Session("USER.name");

			$edm->save();

			Session::flash('flash_success', 'EDM Saved!');

			return redirect()->route('user.edm.edit',['id' => $id]);
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
			EDM::where('user_id',Auth::user()->id)
					->where('id', $id)
					->delete();

			Session::flash('flash_success', 'EDM Deleted!');

			return redirect()->route('user.edm.index');
	}

	public function download($id)
	{
		$user_id = Auth::user()->id;
		$edm = EDM::where('user_id', $user_id)->findOrFail($id);

		$package_path = self::createZip($user_id, $edm);


		return response()->download($package_path);
	}

	public function preview($id)
	{
		$edm = EDM::where('user_id',Auth::user()->id)->findOrFail($id);

		$html = self::getRawHTML($edm, false); // edm object, relative links?

		return response($html, 200)->header('Content-Type', 'text/html');
	}

	public function frontEndTemplate()
	{
		$path = base_path() . '/resources/assets/js/builder' . request()->path;
		if(file_exists($path)) {
			$file = file_get_contents($path);
			return response($file, 200)->header('Content-Type', 'text/html');
		} else {
			abort('404');
		}
	}

	//---------------------------------------------
	// Asset Management
	//---------------------------------------------

	public function frontEndAsset()
	{
		$path = storage_path() . request()->path;
		if(file_exists($path)) {
			$file = file_get_contents($path);
			return response($file, 200);
		} else {
			abort('404');
		}
	}

	public function getAssetManager($id)
	{
		$user_id = Auth::user()->id;
		$edm = EDM::where('user_id', $user_id)->findOrFail($id);
		$scope_values = json_decode($edm->scope_values);

		$image_assets = $scope_values->imageAssets;

		return view('user.edm.asset_manager')->with(['edm' => $edm, 'image_assets' => $image_assets]);

	}

	public function postAssetManager($id, Request $request)
	{
		$user_id = Auth::user()->id;
		$edm = EDM::where('user_id', $user_id)->findOrFail($id);

		$rules = array(
			'image' => 'required|max:500|mimes:png,gif,jpeg,jpg'
		);

		$validator = Validator::make($request->all(), $rules);

		if ($validator->fails() || !$request->file('image')->isValid())
		{
			return redirect()->back()->withInput()->withErrors($validator->errors());
		}
		else
		{
			$destinationPath = '/app/edms/'. $user_id . '-' . str_slug($edm->edm_name) . '/images';
			$fileName = uniqid() . "." . $request->file('image')->getClientOriginalExtension();

			$full_path = $destinationPath . "/" . $fileName;

			$request->file('image')->move(storage_path() . $destinationPath, $fileName);

			$scope_values = json_decode($edm->scope_values);

			array_push($scope_values->imageAssets, $full_path);

			$new_scope_values = $scope_values;

			$edm->scope_values 		= json_encode($new_scope_values);
			$edm->updated_by      = Session("USER.name");

			$edm->save();

			Session::flash('flash_success', 'New asset Added!');

			return redirect()->route('user.edm.get_asset_manager',['id' => $id]);
		}

	}


	public function deleteAssetManager($id, Request $request)
	{
		$user_id = Auth::user()->id;
		$edm = EDM::where('user_id', $user_id)->findOrFail($id);

		$scope_values = json_decode($edm->scope_values);


		$file_path = storage_path() . $scope_values->imageAssets[$request->input('image_asset_id')];
		if(file_exists($file_path)) {
			unlink($file_path);
		}

		array_splice($scope_values->imageAssets, $request->input('image_asset_id'), 1);

		$new_scope_values = $scope_values;

		$edm->scope_values 		= json_encode($new_scope_values);
		$edm->updated_by      = Session("USER.name");

		$edm->save();

		Session::flash('flash_success', 'Asset Deleted!');

		return redirect()->route('user.edm.get_asset_manager',['id' => $id]);

	}

	//---------------------------------------------
	// END:: Asset Management
	//---------------------------------------------
}
