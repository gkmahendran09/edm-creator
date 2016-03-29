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
										Components <button class="btn btn-default toolbox-toggler"><span class="glyphicon glyphicon-wrench"></span> Hide</button>
									</div>
								</div>
							</div>
							<div class="panel-body table-responsive" id="component-list-parent">
								<div class="panel panel-default">

									<!-- Basic Components -->
									<div class="panel-heading">
										<a href="#basic" data-toggle="collapse" data-parent="#component-list-parent">Basic</a>
									</div>
									<div class="panel-body panel-collapse collapse in" id="basic">
										<div class="list-group">
											<a href="javascript:void(0);" data-ng-click="edm.addComponent('banner');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Banner</a>
											<a href="javascript:void(0);" data-ng-click="edm.addComponent('text');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Text</a>
											<a href="javascript:void(0);" data-ng-click="edm.addComponent('rich-text');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Rich Text</a>
										</div>
									</div>
									<!--// Basic Components -->

									<!-- Featured Images -->
									<div class="panel-heading">
										<a href="#featured-image" data-toggle="collapse" data-parent="#component-list-parent">Featured Images</a>
									</div>
									<div class="panel-body panel-collapse collapse" id="featured-image">
										<div class="list-group">
											<a href="javascript:void(0);" data-ng-click="edm.addComponent('image-bullet');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Image + Bullet</a>
											<a href="javascript:void(0);" data-ng-click="edm.addComponent('image-para');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Image + Para</a>
										</div>
									</div>
									<!--// Basic Components -->

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
								<a data-ng-disabled="edm.changed" data-ng-attr-href="@{{edm.changed ? '#' : edm.assetManagerURL }}" data-ng-attr-title="@{{edm.changed ? 'Save the EDM to continue' : 'Go to Asset Manager' }}" class="btn btn-block btn-success">
									<span class="glyphicon glyphicon-folder-open"></span> Asset
								</a>
							</div>
						</div>

					</div>
				</div>
				<div class="col-md-9" id="edm-builder">
					<div class="panel panel-default">
							<div class="panel-heading">
								<div class="row">
									<div class="col-sm-6">
										Edit: {{$edm->edm_name}}  <button class="btn btn-default toolbox-toggler"><span class="glyphicon glyphicon-wrench"></span> Toolbox</button>
									</div>
									<div class="col-sm-5 col-sm-offset-1">
										<div class="row">
											<div class="col-sm-3 text-right">
												<form method="post" id="edm_save_form" action="{{route('user.edm.update', ['id' => $edm->id])}}" accept-charset="UTF-8" onsubmit="return getCurrentScopeValues();">
													{{ method_field('PUT') }}

													{{ csrf_field() }}
													<input type="hidden" name="html" id="form_html" value="{{$edm->html}}">
													<input type="hidden" name="scope_values" id="form_scope_values" value="{{$edm->scope_values}}">

													<button type="submit" class="btn btn-success edm-menu-button" data-ng-disabled="!edm.changed">
														<span class="glyphicon glyphicon-cloud-upload"></span> Save [s]
													</button>
												</form>
											</div>
											<div class="col-sm-4 text-right">
												<a  data-ng-disabled="edm.changed" data-ng-attr-href="@{{edm.changed ? '#' : edm.previewURL }}" data-ng-attr-title="@{{edm.changed ? 'Save the EDM to continue' : 'Preview EDM' }}" data-ng-attr-target="@{{edm.changed ? '' : '_blank' }}" class="btn btn-primary edm-menu-button">
													<span class="glyphicon glyphicon-link"></span> Preview Link
												</a>
											</div>
											<div class="col-sm-5 text-right">
												<form method="post" action="{{route('user.edm.download', ['id' => $edm->id])}}" accept-charset="UTF-8">

													{{ csrf_field() }}

													<button type="submit"  class="btn btn-default edm-menu-button"  data-ng-disabled="edm.changed">
														<span class="glyphicon glyphicon-download"></span> Download Package
													</button>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="panel-body table-responsive">
								{{-- <pre style="position: absolute; right: 0; max-width: 500px; overflow: auto;">
									@{{ edm | json }}
								</pre> --}}
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

		function getAssetManagerURL() {
			return '{{route('user.edm.get_asset_manager', ['id' => $edm->id])}}';
		}

		function getPreviewURL() {
			return '{{route('user.edm.preview', ['id' => $edm->id])}}';
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

		$( ".bootbox" ).draggable({ handle: ".modal-header" });

	</script>
@endsection
