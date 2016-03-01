<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle Navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">Rage EDM Creator</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        {{-- <li><a href="route()">Home</a></li> --}}
      </ul>

      <ul class="nav navbar-nav navbar-right">
          <li class="@if(Request::segment(2) == 'login') active @endif"><a href="/user/login">Login</a></li>
          <li class="@if(Request::segment(2) == 'register') active @endif"><a href="/user/register">Register</a></li>
      </ul>
    </div>
  </div>
</nav>
