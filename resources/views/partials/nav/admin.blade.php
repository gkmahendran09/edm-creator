<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle Navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="{{route('admin_dashboard')}}">Rage EDM Creator ( <i class="text-danger">Admin</i> )</a>
    </div>

    @if(Session::has('ADMIN.id'))
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="@if(Request::segment(2) == 'users') active @endif">
          <a href="{{route('admin.users.index')}}">Manage Users</a>
        </li>
        <li class="@if(Request::segment(2) == 'templates') active @endif">
          <a href="{{route('admin.templates.index')}}">Manage Templates</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
          <li><a href="javascript:void(0);">Welcome, <i>{{Session("ADMIN.name")}}</i></a></li>
          <li><a href="{{route('admin_logout')}}"><span class="glyphicon glyphicon-user"></span> Logout</a></li>
      </ul>
    </div>
    @endif
  </div>
</nav>
