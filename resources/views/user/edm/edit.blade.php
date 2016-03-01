@extends('layouts.user.edm.builder')

@section("title", "Edit")


@section('content')

<div id="edit-edm" data-ng-app="edmApp" id="edm-builder" data-ng-controller="edmController">
	@include("partials.nav.user", ["edm", $edm])
	@include("errors.message")
	<div class="container-fluid">
	<div class="row">
		<div class="col-md-2 floating-section" id="edm-components">
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
					 <a href="javascript:void(0);" data-ng-click="edm.addComponent('header');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Header</a>
					 <a href="javascript:void(0);" data-ng-click="edm.addComponent('header_para');" class="list-group-item"><span class="glyphicon glyphicon-plus-sign"></span> Header + Para</a>
					</div>					
				</div>
			</div>
		</div>
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">
					<div class="row">
						<div class="col-sm-12">
							Edit: {{$edm->edm_name}}
						</div>
					</div>
				</div>
				<div class="panel-body table-responsive">
					<div id="edm-document" class="edm-component active" data-ng-click="edm.showProperties('<edm-component-properties></edm-component-properties>')">
						<edm-component edm='edm'>
							<component data-ng-repeat='c in edm.components' edm='edm' c='c'></component>
						</edm-component>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-2 floating-section" id="edm-properties">
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
		function getScopeValues() {
			return ({!! $edm->scope_values !!});
		}

		function getCurrentScopeValues() {
			var html = $("#edm-document").html();
			var scope_values = angular.toJson($('#edit-edm').scope().edm);
			$("#form_html").val(html);
			$("#form_scope_values").val(scope_values);
			return true;
		}
	</script>
@endsection
