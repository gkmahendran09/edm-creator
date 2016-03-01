@extends("layouts.user.default")

@section("title", "Register")

@section("content")
  @if($status == "success")
    <div class="container-fluid">
  	<div class="row">
  		<div class="col-md-8 col-md-offset-2">
  			<div class="panel panel-default">
  				<div class="panel-heading">Register</div>
  				<div class="panel-body">
            <div class="alert alert-success">
              Success! You'll be notified once admin approved your request.
            </div>
  				</div>
  			</div>
  		</div>
  	</div>
  </div>
  @endif
@endsection
