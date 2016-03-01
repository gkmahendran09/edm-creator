@extends('layouts.user.default')

@section("title", "New")

@section('content')
<div class="container-fluid">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">New EDM</div>
				<div class="panel-body">
					<form method="post" action="{{route('user.edm.store')}}" accept-charset="UTF-8" novalidate="novalidate" class="form-horizontal ">

						{{ csrf_field() }}

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes', min:3, err:'Invalid Name')" for="edm_name">EDM Name</label>
							<div class="col-md-6">
								<input class="form-control" name="edm_name" type="text" value="{{old('edm_name')}}">
                {!! sem($errors, 'edm_name') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label" rel="(req:'Yes',err:'Invalid Template')" for="template">Choose Template</label>
							<div class="col-md-6">
								<select class="form-control" name="template" type="select">
									<option value="">Choost One..</option>
									@foreach($templates as $t)
										<option value="{{$t->id}}">{{$t->template_name}}</option>
									@endforeach
								</select>

                {!! sem($errors, 'template') !!}
								<span class="yErrMsg"></span>
							</div>
						</div>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-4">
								<button type="submit" class="btn btn-warning">Start Build</button>
								<a href="{{route('user.edm.index')}}" class="btn btn-primary">Back</a>
							</div>
						</div>

					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
