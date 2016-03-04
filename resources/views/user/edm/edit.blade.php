@extends('layouts.user.edm.builder')

@section("title", "Edit")


@section('content')
<div id="edit-edm" data-ng-app="edmApp" data-ng-controller="edmController" hotkey="{'s': edm.save}">
		@include("partials.nav.user", ["edm", $edm])
		<div class="container-fluid" id="edm-workspace">
			@include("errors.message")
			<div class="row">
				<div class="col-md-1 floating-section" id="edm-components">
					<div class="row">
						<div class="panel panel-default">
							<div class="panel-heading">
								<div class="row">
									<div class="col-sm-12">
										Components
									</div>
								</div>
							</div>
							<div class="panel-body table-responsive">
								<div class="list-group">
									<a href="javascript:void(0);" data-ng-click="edm.addComponent('banner');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Banner</a>
									<a href="javascript:void(0);" data-ng-click="edm.addComponent('text');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Text</a>
									<a href="javascript:void(0);" data-ng-click="edm.addComponent('header');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Header</a>
									<a href="javascript:void(0);" data-ng-click="edm.addComponent('header_para');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Header + Para</a>
								</div>
							</div>
						</div>
						<div class="panel panel-default">
							<div class="panel-heading">
								<div class="row">
									<div class="col-sm-12">
										Tools
									</div>
								</div>
							</div>
							<div class="panel-body table-responsive">
								<a href="{{route('user.edm.get_asset_manager', ['id' => $edm->id])}}" class="btn btn-block btn-success" title="Asset Manager">
									<span class="glyphicon glyphicon-folder-open"></span> Asset
								</a>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-8 col-md-offset-1" id="edm-builder">
					<div class="panel panel-default">
							<div class="panel-heading">
								<div class="row">
									<div class="col-sm-6">
										Edit: {{$edm->edm_name}}
									</div>
									<div class="col-sm-5 col-sm-offset-1">
										<div class="row">
											<div class="col-sm-3 text-right">
												<form method="post" id="edm_save_form" action="{{route('user.edm.update', ['id' => $edm->id])}}" accept-charset="UTF-8" onsubmit="return getCurrentScopeValues();">
													{{ method_field('PUT') }}

													{{ csrf_field() }}
													<input type="hidden" name="html" id="form_html" value="{{$edm->html}}">
													<input type="hidden" name="scope_values" id="form_scope_values" value="{{$edm->scope_values}}">

													<button type="submit" class="btn btn-success btn-xs edm-menu-button">
														<span class="glyphicon glyphicon-cloud-upload"></span> Save [s]
													</button>
												</form>
											</div>
											<div class="col-sm-4 text-right">
												<a href="{{route('user.edm.preview', ['id' => $edm->id])}}" target="_blank" class="btn btn-primary btn-xs edm-menu-button">
													<span class="glyphicon glyphicon-link"></span> Preview Link
												</a>
											</div>
											<div class="col-sm-5 text-right">
												<form method="post" action="{{route('user.edm.download', ['id' => $edm->id])}}" accept-charset="UTF-8">

													{{ csrf_field() }}

													<button type="submit"  class="btn btn-default btn-xs edm-menu-button">
														<span class="glyphicon glyphicon-download"></span> Download Package
													</button>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="panel-body table-responsive">
								<p class="lead">
									Page Title: @{{edm.properties.pageTitle}}
								</p>
								<div id="edm-document" class="edm-component active" style="background: @{{edm.properties.pageBackground}};" data-ng-click="edm.showProperties('<rgedm-edm-component-properties></rgedm-edm-component-properties>')">
									<rgedm-edm-component edm="edm">
										<rgedm-component data-ng-repeat="c in edm.components |  orderObjectBy:'order':false" edm="edm" c="c"></rgedm-component>
									</rgedm-edm-component>
								</div>
							</div>
						</div>
				</div>
				<div class="col-md-3 floating-section" id="edm-properties">
					<div class="panel panel-default">
						<div class="panel-body table-responsive">
						</div>
					</div>
				</div>
			</div>
		</div>
</div>
@endsection

@section('scripts')
	<script>
		function getImageUploadURL() {
			{{-- var url = "{{route('user.edm.image_upload', ['id' => $edm->id])}}"; --}}
			return ;
		}

		function getScopeValues() {
			return ({!! $edm->scope_values !!});
		}


		window.onbeforeunload = function() {
			// return 'Are you sure that you want to leave this page?';
				// if(confirm('Do you want to save recent changes?')) {
				// 	$("#edm_save_form").submit(); //TODO: ajax form submit
				// }
		};
	</script>
@endsection
