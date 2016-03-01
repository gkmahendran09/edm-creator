@extends('layouts.admin.default')

@section("title", "Edit Template")

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			@include("errors.message")
			<div class="panel panel-default">
				<div class="panel-heading">
					<div class="row">
						<div class="col-sm-10">
							<a href="{{route('admin_dashboard')}}">Dashboard</a> >
							<a href="{{route('admin.templates.index')}}">Manage Templates</a> >
							Edit Template
						</div>
						@if($template->id == 1)
						<div class="col-sm-2 text-right">Default Template</div>
						@else
						<div class="col-sm-2 text-right">
							<form method="post" action="{{route('admin.templates.destroy', ['id' => $template->id])}}" accept-charset="UTF-8" class="yForm form-horizontal" onsubmit="return confirm('Is it OK to delete this template?')">
								{{ method_field('DELETE') }}

								{{ csrf_field() }}

								<button type="submit" class="btn btn-sm btn-danger">
									<span class="glyphicon glyphicon-trash"></span> Delete
								</button>
							</form>
						</div>
						@endif
					</div>
				</div>
				<div class="panel-body">
					<form method="post" action="{{route('admin.templates.update', ['id' => $template->id])}}" accept-charset="UTF-8" class="yForm form-horizontal">
						{{ method_field('PUT') }}

						{{ csrf_field() }}

						<div class="form-group">
							<label class="col-md-4 control-label">Template Name</label>
							<div class="col-md-6">
								<p class="control-label" style="text-align: left;">{{$template->template_name}}</p>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'html_header',err:'Invalid HTML Header')" for="html_header">HTML Header</label>
							<div class="col-md-6">
								<textarea class="form-control" name="html_header" type="text">{!! $template->html_header !!}</textarea>
								{!! sem($errors, 'html_header') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'html_footer',err:'Invalid HTML Footer')" for="html_footer">HTML Footer</label>
							<div class="col-md-6">
								<textarea class="form-control" name="html_footer" type="text">{!! $template->html_footer !!}</textarea>
								{!! sem($errors, 'html_footer') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'css',err:'Invalid CSS')" for="css">CSS</label>
							<div class="col-md-6">
								<textarea class="form-control" name="css" type="text">{!! $template->css !!}</textarea>
								{!! sem($errors, 'css') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'css',err:'Invalid HTML')" for="html">HTML</label>
							<div class="col-md-6">
								<textarea class="form-control" name="html" type="text">{!! $template->html !!}</textarea>
								{!! sem($errors, 'html') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'scope_values',err:'Invalid Scope Values')" for="scope_values">Scope Values</label>
							<div class="col-md-6">
								<textarea class="form-control" name="scope_values" type="text">{!! $template->scope_values !!}</textarea>
								{!! sem($errors, 'scope_values') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<button type="submit" class="btn btn-warning">Update</button>
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
