@extends("layouts.user.default")

@section("title", "Register")

@section("content")
  <div class="container-fluid">
  	<div class="row">
  		<div class="col-md-8 col-md-offset-2">
  			<div class="panel panel-default">
  				<div class="panel-heading">Register</div>
  				<div class="panel-body">
						<form method="post" action="{{route('user_register')}}" accept-charset="UTF-8" class="form-horizontal">
              {!! csrf_field() !!}

  						<div class="form-group">
  							<label class="col-md-4 control-label" rel="(req:'Yes',type:'email',err:'Invalid email ID')" for="email">E-Mail </label>
  							<div class="col-md-6">
  								<input class="form-control" name="email" type="email" value="{{old('email')}}" required="true">
                  {!! sem($errors, 'email') !!}
  								<span class="yErrMsg"></span>
  							</div>
  						</div>

  						<div class="form-group">
  							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid Password')" for="password">Password</label>
  							<div class="col-md-6">
  								<input class="form-control" name="password" type="password" value="{{old('password')}}" required="true">
                  {!! sem($errors, 'password') !!}
  								<span class="yErrMsg"></span>
  							</div>
  						</div>
  						<div class="form-group">
  							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid Password')" for="password_confirmation">Confirm Password</label>
  							<div class="col-md-6">
  								<input class="form-control" name="password_confirmation" type="password" value="{{old('password_confirmation')}}" required="true">
                  {!! sem($errors, 'password_confirmation') !!}
  								<span class="yErrMsg"></span>
  							</div>
  						</div>
  						<div class="form-group">
  							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid First name')" for="first_name">First Name</label>
  							<div class="col-md-6">
  								<input class="form-control" name="first_name" type="text" value="{{old('first_name')}}" required="true">
                  {!! sem($errors, 'fname') !!}
  								<span class="yErrMsg"></span>
  							</div>
  						</div>
  						<div class="form-group">
  							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid Last name')" for="last_name">Last Name</label>
  							<div class="col-md-6">
  								<input class="form-control" name="last_name" type="text" value="{{old('last_name')}}" required="true">
                  {!! sem($errors, 'lname') !!}
  								<span class="yErrMsg"></span>
  							</div>
  						</div>
  						<div class="form-group">
  							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid code')" for="captcha_code">Captcha</label>
  							<div class="col-md-6">
  								<img id="captcha" src="/app/captcha" alt="CAPTCHA Image" style="border:1px solid #CCCCCC;margin-bottom:10px;"/>
  								<a href="#" title="generate new code" onclick="document.getElementById('captcha').src = '/app/captcha?' + Math.random(); return false">
  									<img src="/assets/images/refresh.gif" />
  								</a>
  								<input class="form-control" id="captcha_code" name="captcha_code" type="text" required="true">
                  {!! sem($errors, 'captcha_code') !!}
  								<span class="yErrMsg"></span>
  							</div>
  						</div>
  						<div class="form-group">
  							<div class="col-md-6 col-md-offset-4">
  								<button type="submit" class="btn btn-primary">Register</button>
  							</div>
  						</div>
  					</form>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
@endsection
