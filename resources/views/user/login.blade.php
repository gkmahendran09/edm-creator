@extends("layouts.user.default")

@section("title", "Login")

@section("content")
  <div class="container-fluid">
    <div class="row">
		<div class="col-md-8 col-md-offset-2">
      @include("errors.message")
			<div class="panel panel-default">
				<div class="panel-heading">Login</div>
				<div class="panel-body">
  				<form method="post" action="{{route('user_login')}}" accept-charset="UTF-8" novalidate="novalidate" class="form-horizontal yForm">
            {!! csrf_field() !!}

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'email',err:'Invalid email ID')" for="email">E-Mail Address</label>
							<div class="col-md-6">
								<input class="form-control" name="email" type="text">
                {!! sem($errors, 'email') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid Password')" for="password">Password</label>
							<div class="col-md-6">
								<input class="form-control" name="password" type="password" value="">
                {!! sem($errors, 'password') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<div class="checkbox">
									<label>
									<input name="remember" type="checkbox" value="1"> Remember Me
									</label>
								</div>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<button type="submit" class="btn btn-primary">Login</button>
								{{-- <a class="btn btn-link" href="/user/password/email">Forgot Your Password?</a> --}}
							</div>
						</div>
					</form>
				</div>
			</div>
      <div class="panel panel-default">
				<div class="panel-heading">Social Login</div>
				<div class="panel-body">
						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<a href="{{ route('social_login', ['provider' => 'google']) }}">
                  <img src="/assets/images/signin-google-3.png">
                </a>
							</div>
						</div>
				</div>
			</div>
		</div>

	</div>
  </div>

@endsection
