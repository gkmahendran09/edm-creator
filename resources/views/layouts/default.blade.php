<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">
  <meta name="keywords" content="@yield('meta_keywords')">
  <meta name="description" content="@yield('meta_descrition')">

  <title>@yield('title') - {{config("app_data.app_name")}}</title>

  <link rel="shortcut icon" href="/favicon.ico?v=2">

  <link rel="stylesheet" href="{{ elixir('assets/css/app.css') }}">

  @yield('styles')

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->



</head>
<body>

  @include("partials.nav.default")

  @yield('content')


@if(App::environment('production'))

{{-- Google Analytics Code --}}
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXXXX-X', 'auto');
  ga('send', 'pageview');

</script>

@endif

<script src="{{ elixir('assets/js/app.js') }}"></script>

@yield('scripts')

</body>
</html>
