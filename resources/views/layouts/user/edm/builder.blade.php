<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">
  <meta name="keywords" content="@yield('meta_keywords')">
  <meta name="description" content="@yield('meta_descrition')">

  <title>@yield('title') - {{Config("app_data.app_name")}}</title>

  <link rel="shortcut icon" href="/favicon.ico">

  <link rel="stylesheet" href="{{ elixir('assets/css/builder/plugins.css') }}">

  <link rel="stylesheet" href="{{ elixir('assets/css/builder.css') }}">


  @yield('styles')

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
  <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- App Files -->
{{--
  <!-- Directives -->
  <script src="{{url('app/directives/mainDirective.js')}}"></script>

  <!-- Core Directives -->
  <script src="{{url('app/directives/core/rowDirective.js')}}"></script>
  <script src="{{url('app/directives/core/columnDirective.js')}}"></script>

  <!-- Properties Directives -->
  <script src="{{url('app/directives/properties/rowProperties.js')}}"></script>

  <script src="{{url('app/appController.js')}}"></script>
  <script src="{{url('app/app.js')}}"></script> --}}

  <!-- App Files -->

  <!-- App Plugins -->
  <script src="{{ elixir('assets/js/builder/plugins.js') }}"></script>

  <!-- App Plugins:: External Modules -->
  <script src="{{ elixir('assets/js/builder/external-modules.js') }}"></script>


  <!-- App Directives -->
  <script src="{{ elixir('assets/js/builder/components.js') }}"></script>

  <!-- App Builder -->
  <script src="{{ elixir('assets/js/builder/builder.js') }}"></script>

  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/bootbox.js/4.4.0/bootbox.min.js"></script>


</head>
<body>

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


@yield('scripts')

</body>
</html>
