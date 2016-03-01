<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle Navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      @if(Auth::check())
        <a class="navbar-brand" href="{{route('user.edm.index')}}">Rage EDM Creator</a>
      @else
        <a class="navbar-brand" href="{{route('static_home')}}">Rage EDM Creator</a>
      @endif
    </div>

    @if(Auth::check())
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      @if(Request::segment(4) == 'edit')
        <ul class="nav navbar-nav">
          <li><a href="javascript:void(0);">
            <form method="post" action="{{route('user.edm.update', ['id' => $edm->id])}}" accept-charset="UTF-8" class="yForm form-horizontal" onsubmit="return getCurrentScopeValues();">
              {{ method_field('PUT') }}

              {{ csrf_field() }}
              <input type="hidden" name="html" id="form_html" value="{{$edm->html}}">
              <input type="hidden" name="scope_values" id="form_scope_values" value="{{$edm->scope_values}}">

              <button type="submit"  class="edm-menu-button">
                <span class="glyphicon glyphicon-cloud-upload"></span> Save
              </button>
            </form></a>
          </li>
          <li><a href="javascript:void(0);">
            <form method="post" action="{{route('user.edm.download', ['id' => $edm->id])}}" accept-charset="UTF-8" class="yForm form-horizontal">

              {{ csrf_field() }}

              <button type="submit"  class="edm-menu-button">
                <span class="glyphicon glyphicon-download"></span> Download Package
              </button>
            </form></a>
          </li>
          <li><a href="{{route('user.edm.preview', ['id' => $edm->id])}}" target="_blank">
              <button class="edm-menu-button">
                <span class="glyphicon glyphicon-link"></span> Preview Link
              </button>
            </a>
          </li>
        </ul>
      @endif
      {{-- <ul class="nav navbar-nav">
        <li class="@if(Request::segment(3) == 'new') active @endif">
          <a href="{{route('user_edm_new')}}">New</a>
        </li>
      </ul> --}}
      <ul class="nav navbar-nav navbar-right">
          <li><a href="javascript:void(0);">Welcome, <i>{{Session("USER.name")}}</i></a></li>
          <li><a href="{{route('user_logout')}}"><span class="glyphicon glyphicon-user"></span> Logout</a></li>
      </ul>
    </div>
    @endif
  </div>
</nav>
