@extends('layouts.user.default')

@section("title", "Dashboard")

@section('content')

<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			@include("errors.message")
			<div class="panel panel-default">
				<div class="panel-heading">
					<div class="row">
						<div class="col-sm-10">
							Dashboard
						</div>
						<div class="col-sm-2 text-right">
							<a class="btn btn-sm btn-success" href="{{route('user.edm.create')}}">
								<span class="glyphicon glyphicon-plus"></span> New
							</a>
						</div>
					</div>
				</div>
				<div class="panel-body table-responsive">
					@if(count($edms) === 0)
					No EDMs yet.
					@else
						<table class="table table-bordered table-striped">
							<thead>
								<tr>
									<th>Action</th>
									<th>EDM Name</th>
								</tr>
							</thead>
							<tbody>
						@foreach($edms as $e)
							<tr>
								<td>
									<form method="post" action="{{route('user.edm.destroy', ['id' => $e->id])}}" accept-charset="UTF-8" class="yForm form-horizontal" onsubmit="return confirm('Is it OK to delete this EDM?')">
										{{ method_field('DELETE') }}

										{{ csrf_field() }}

										<a href="{{route('user.edm.edit', ['id' => $e->id])}}" class="btn btn-primary">
											<span class="glyphicon glyphicon-pencil"></span> Edit
										</a>

										<button type="submit" class="btn btn-sm btn-danger">
											<span class="glyphicon glyphicon-trash"></span> Delete
										</button>
									</form>
								</td>
								<td>{{str_limit($e->edm_name)}}</td>
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
