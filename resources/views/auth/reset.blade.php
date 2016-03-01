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
					@include('errors.message')

					{!! Form::open(['novalidate' => 'novalidate', 'class' => 'form-horizontal vForm']) !!}
						{!! Form::hidden('token', $token) !!}
						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'email',err:'Invalid email ID')" for="email">E-Mail Address</label>
							<div class="col-md-6">
								{!! Form::text('email', old('email'), ["class" => "form-control"]) !!}
								{!! sem($errors, 'email') !!}
								<span class="vErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid Password')" for="password">Password</label>
							<div class="col-md-6">
								{!! Form::password('password', ["class" => "form-control"]) !!}
								{!! sem($errors, 'password') !!}
								<span class="vErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid Password')" for="password_confirmation">Confirm Password</label>
							<div class="col-md-6">
								{!! Form::password('password_confirmation', ["class" => "form-control"]) !!}
								{!! sem($errors, 'password_confirmation') !!}
								<span class="vErrMsg"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-4">&nbsp;</label>
							<div class="col-md-6">
								<button type="submit" class="btn btn-primary">
									Reset Password
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
