@if(Session::has('flash_success'))
<div class="alert alert-success alert-dismissible">
	<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>		
	{{ Session::get('flash_success') }}
</div>
@endif

@if(Session::has('flash_error'))
<div class="alert alert-danger alert-dismissible">
	<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>		
	{{ Session::get('flash_error') }}
</div>
@endif