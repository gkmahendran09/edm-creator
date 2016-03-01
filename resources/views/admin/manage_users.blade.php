@extends('layouts.admin.default')

@section("title", "Manage Users")

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			@include("errors.message")
			<div class="panel panel-default">
				<div class="panel-heading"><a href="{{route('admin_dashboard')}}">Dashboard</a> > Manage Users</div>
				<div class="panel-body">
					@if(count($users) == 0)
						No Users Found.
					@else
						<table class="table table-bordered table-striped">
							<thead>
								<tr>
									<th>First Name</th>
									<th>Last Name</th>
									<th>E-mail</th>
									<th>Current Status</th>
									<th>Update Status</th>
								</tr>
							</thead>
							<tbody>
								@foreach( $users as $u )
									<tr>
										<td>{{$u->first_name}}</td>
										<td>{{$u->last_name}}</td>
										<td>{{$u->email}}</td>
										<td>{{$u->status}}</td>
										<td>
											<form method="post" action="{{route('admin.users.store')}}">
												{!! csrf_field() !!}
												<input type="hidden" name="id" value="{{$u->id}}">
											@if($u->status == "Inactive")
													<input type="hidden" name="status" value="Active">
													<input type="submit" class="btn btn-success" value="Approve">
											@elseif($u->status == "Active")
												<input type="hidden" name="status" value="Inactive">
												<input type="submit" class="btn btn-danger" value="Disapprove">
											@endif
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
	</div>
</div>
@endsection
