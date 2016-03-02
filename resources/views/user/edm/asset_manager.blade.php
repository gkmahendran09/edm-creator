@extends('layouts.user.edm.builder')

@section("title", "Edit")


@section('content')

<div>
		@include("partials.nav.user", ["edm", $edm])
		@include("errors.message")
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-2">
					<a href="{{route('user.edm.edit', ['id' => $edm->id])}}" class="btn btn-block btn-success" title="Continue Editing">
						<span class="glyphicon glyphicon-edit"></span> Continue Editing
					</a>
				</div>
				<div class="col-md-7">
					<div class="panel panel-default">
						<div class="panel-heading">
							<div class="row">
								<div class="col-sm-12">
									Assets: {{$edm->edm_name}}
								</div>
							</div>
						</div>
						<div class="panel-body table-responsive">
							@if(count($image_assets) == 0)
								No assets found.
							@else
								<table class="table table-bordered table-striped">
									<thead>
										<th>Preview</th>
										<th>Manage</th>
									</thead>
									<tbody>
										@foreach($image_assets as $key => $i)
											<tr>
												<td width="30%">
													<img src="{{route('user.edm.front_end_asset')}}?path={{$i}}" width="100">
												</td>
												<td>
													<form method="post" action="{{route('user.edm.delete_asset_manager', ['id' => $edm->id])}}" accept-charset="UTF-8" class="yForm form-horizontal" onsubmit="return confirm('Is it OK to delete this asset?')">
														{{ method_field('DELETE') }}

														{{ csrf_field() }}

														<input type="hidden" name="image_asset_id" required="true" value="{{$key}}">

														<button type="submit" class="btn btn-sm btn-danger">
															<span class="glyphicon glyphicon-trash"></span> Delete
														</button>
													</form>
												</td>
											</tr>
										@endforeach
									</tbody>
								</table>
							@endif
						</div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="panel panel-default">
						<div class="panel-heading">
							<div class="row">
								<div class="col-sm-12">
									Add New
								</div>
							</div>
						</div>
						<div class="panel-body">
							<form method="post" action="{{route('user.edm.post_asset_manager', ['id' => $edm->id])}}" accept-charset="UTF-8" enctype="multipart/form-data">
								{{ csrf_field() }}
								<div class="form-group">
									<label>Choose an image</label>
									<input type="file" name="image" required="true" accept="image/*">
									{!! sem($errors, 'image') !!}
				        </div>

								<div class="form-group list-group text-danger">
									<p class="list-group-item">Supported Formats: .jpg, .png, .gif</p>
									<p class="list-group-item">Max. File size: 500KB</p>
								</div>

								<button type="submit" class="btn btn-sm btn-primary">
									<span class="glyphicon glyphicon-plus"></span> Add
								</button>
							</form>

						</div>
					</div>
				</div>
			</div>
		</div>
</div>
@endsection

@section('scripts')

@endsection
