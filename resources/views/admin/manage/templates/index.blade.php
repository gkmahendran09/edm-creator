@extends('layouts.admin.default')

@section("title", "Manage Templates")

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			@include("errors.message")
			<div class="panel panel-default">
				<div class="panel-heading">
					<div class="row">
						<div class="col-sm-10">
							<a href="{{route('admin_dashboard')}}">Dashboard</a> > Manage Templates
						</div>
						<div class="col-sm-2 text-right">
							<a href="{{route('admin.templates.create')}}" class="btn btn-sm btn-success">
								<span class="glyphicon glyphicon-plus"></span> New
							</a>
						</div>
					</div>
				</div>
				<div class="panel-body table-responsive">
					@if(count($templates) == 0)
						No Templates Found.
					@else
						<table class="table table-bordered table-striped">
							<thead>
								<tr>
									<th>Action</th>
									<th>Template Name</th>
									<th>HTML Header</th>
									<th>HTML Footer</th>
									<th>CSS</th>
									<th>HTML</th>
									<th>Scope Values</th>
								</tr>
							</thead>
							<tbody>
									@foreach( $templates as $t )
										<tr>
											<td>
												<a href="{{route('admin.templates.edit', ['id' => $t->id])}}" class="btn btn-primary">
													<span class="glyphicon glyphicon-pencil"></span> Edit
												</a>
											</td>
											<td>{{str_limit($t->template_name)}}</td>
											<td>{{str_limit($t->html_header)}}</td>
											<td>{{str_limit($t->html_footer)}}</td>
											<td>{{str_limit($t->css)}}</td>
											<td>{{str_limit($t->html)}}</td>
											<td>{{str_limit($t->scope_values)}}</td>
									</tr>
									@endforeach
							</tbody>
						</table>
					@endif
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
