<?php
namespace App\Http\Controllers\Admin;

use App\Models\System\Template;

use App\Http\Requests\Admin\Templates\CreateTemplateRequest;
use App\Http\Requests\Admin\Templates\UpdateTemplateRequest;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Session;

class TemplateController extends Controller
{
    public function __construct()
    {
      $this->middleware('auth_admin');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $templates = Template::all();
      return view('admin.manage.templates.index')->with("templates", $templates);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      return view('admin.manage.templates.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Admin\CreateTemplateRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTemplateRequest $request)
    {
      $template = new Template($request->all());
      $template->created_by = Session("ADMIN.name");
      $template->updated_by = Session("ADMIN.name");

      $template->save();

      Session::flash('flash_success', 'New Template Created!');

      return redirect()->route('admin.templates.index');
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
      $template = Template::findOrFail($id);
      return view('admin.manage.templates.edit')->with("template", $template);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Admin\UpdateTemplateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTemplateRequest $request, $id)
    {
        $template = Template::findOrFail($id);

        $template->html_header      = $request->input('html_header');
        $template->html_footer      = $request->input('html_footer');
        $template->css              = $request->input('css');
        $template->html             = $request->input('html');
        $template->scope_values     = $request->input('scope_values');
        $template->updated_by       = Session("ADMIN.name");

        $template->save();

        Session::flash('flash_success', 'Template Updated!');

        return redirect()->route('admin.templates.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      if($id != 1)
      {
        Template::destroy($id);

        Session::flash('flash_success', 'Template Deleted!');

        return redirect()->route('admin.templates.index');
      }
      else
      {
        Session::flash('flash_error', 'This template can\'t be Deleted!');

        return back();
      }
    }
}
