@extends('layouts.admin.default')

@section("title", "Create Templates")

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			@include("errors.message")
			<div class="panel panel-default">
				<div class="panel-heading">
					<div class="row">
						<div class="col-sm-12">
							<a href="{{route('admin_dashboard')}}">Dashboard</a> >
							<a href="{{route('admin.templates.index')}}">Manage Templates</a> >
							Create Template
						</div>
					</div>
				</div>
				<div class="panel-body">
					<form method="post" action="{{route('admin.templates.store')}}" accept-charset="UTF-8" class="yForm form-horizontal">
						{!! csrf_field() !!}

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'template_name',err:'Invalid Template Name')" for="template_name">Template Name</label>
							<div class="col-md-6">
								<input class="form-control" name="template_name" type="text" value="{!! old('template_name') !!}">
								{!! sem($errors, 'template_name') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'html_header',err:'Invalid HTML Header')" for="html_header">HTML Header</label>
							<div class="col-md-6">
								<textarea class="form-control" name="html_header" type="text">{!! old('html_header') !!}</textarea>
								{!! sem($errors, 'html_header') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'html_footer',err:'Invalid HTML Footer')" for="html_footer">HTML Footer</label>
							<div class="col-md-6">
								<textarea class="form-control" name="html_footer" type="text">{!! old('html_footer') !!}</textarea>
								{!! sem($errors, 'html_footer') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'css',err:'Invalid CSS')" for="css">CSS</label>
							<div class="col-md-6">
								<textarea class="form-control" name="css" type="text">{!! old('css') !!}</textarea>
								{!! sem($errors, 'css') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'css',err:'Invalid HTML')" for="html">HTML</label>
							<div class="col-md-6">
								<textarea class="form-control" name="html" type="text">{!! old('html') !!}</textarea>
								{!! sem($errors, 'html') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>


						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'scope_values',err:'Invalid Scope Values')" for="scope_values">Scope Values</label>
							<div class="col-md-6">
								<textarea class="form-control" name="scope_values" type="text">{!! old('scope_values') !!}</textarea>
								{!! sem($errors, 'scope_values') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>


						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<button type="submit" class="btn btn-warning">Create</button>
								<a href="{{route('admin.templates.index')}}" class="btn btn-primary">Back</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
