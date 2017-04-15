---
layout: redirected
sitemap: false
redirect_to:
  - http://docs.parseplatform.org/
---
<html>
<head>
  <script>
    var path = location.pathname.replace('/docs/', '') || '';
    var hash = location.hash || '';
    redirect_to = '{{ page.redirect_to }}' + path + hash;
  </script>
  <link rel="canonical" href="{{ page.redirect_to }}"/>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta http-equiv="refresh" content="0;url={{ page.redirect_to }}" />
</head>
<body>
    <h1>Redirecting...</h1>
      <a href="{{ page.redirect_to }}">Click here if you are not redirected<a>
      <script>
        location = redirect_to;
      </script>
</body>
</html>
