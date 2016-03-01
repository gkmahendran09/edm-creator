{{-- TODO --}}
@extends('layouts.user.default')

@section("title", "Reset Password")

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">Reset Password</div>
				<div class="panel-body">
					@if (session('status'))
						<div class="alert alert-success">
							{{ session('status') }}
						</div>
					@endif
					@include('errors.message')
					{!! Form::open(['novalidate' => 'novalidate', 'class' => 'form-horizontal vForm']) !!}

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'email',err:'Invalid email ID')" for="email">E-Mail Address</label>
							<div class="col-md-6">
								{!! Form::text('email', old('email'), ["class" => "form-control"]) !!}
								{!! sem($errors, 'email') !!}
								<span class="vErrMsg"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-4 control-label">&nbsp;</label>
							<div class="col-md-6">
								<button type="submit" class="btn btn-primary">
									Send Password Reset Link
								</button>
							</div>
						</div>
					{!! Form::close() !!}
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
