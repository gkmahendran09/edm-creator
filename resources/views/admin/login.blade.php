@extends("layouts.admin.default")

@section("title", "Admin Login")

@section("content")
  <div class="container-fluid">
    <div class="row">
		<div class="col-md-8 col-md-offset-2">
      @include("errors.message")
			<div class="panel panel-default">
				<div class="panel-heading">Admin Login</div>
				<div class="panel-body">
  				<form method="post" action="{{route('admin_login')}}" accept-charset="UTF-8" novalidate="novalidate" class="form-horizontal yForm">
            {!! csrf_field() !!}

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',type:'uname',err:'Invalid Username')" for="user_name">Username</label>
							<div class="col-md-6">
								<input class="form-control" name="user_name" type="text" value="{{old('user_name')}}">
                {!! sem($errors, 'user_name') !!}
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
								<button type="submit" class="btn btn-primary">Login</button>
								{{-- <a class="btn btn-link" href="/user/password/email">Forgot Your Password?</a> --}}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

	</div>
  </div>

@endsection
