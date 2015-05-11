<!DOCTYPE HTML>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>小杉ランチ</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js"></script>
<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<?php
    $page = '';
    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    }
    if ($page == 'map') {
        echo '<script src="js/KLMap.js"></script>';
    }
    else {
        echo '<script src="js/KLList.js"></script>';
    }
?>
<style type="text/css">
#pagetop {
	position: fixed;
	bottom: 10px;
	right: 10px;
}
</style>
</head>
<body>
<div class="container">
  <h1 id="top">KOSUGI LUNCH</h1>
  <nav class="navbar navbar-default" role="navigation" style="background-color: 0x000000;">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#"></a>
      </div> <!-- navbar-header -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
        <li><a href="./KosugiLunch.php">HOME</a></li>
        <li><a href="./KosugiLunch.php?page=map">地図から探す</a></li>
        <li><a href="./KosugiLunch.php?page=ranking">ポイントランキング</a></li>
        <li><a href="./KosugiLunch.php?page=aboutus">小杉ランチについて</a></li>
        </ul>
      </div> <!-- collapse -->
    </div> <!-- container -->
  </nav>
<?php
    $page = '';
    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    }
    if ($page == 'map') {
        ob_start();
        ob_implicit_flush(0);
        require './KosugiLunch/Map.php';
        $content = ob_get_clean();
        echo $content;
    }
    else if ($page == 'ranking') {
        echo '準備中です。。。<br />';
    }
    else if ($page == 'aboutus') {
        echo '準備中です。。。<br />';
    }
    else {
        ob_start();
        ob_implicit_flush(0);
        require './KosugiLunch/List.php';
        $content = ob_get_clean();
        echo $content;
    }
?>
  <div><p id="pagetop"><a href="#top"><button type="button" class="btn btn-info">ページトップへ戻る</button></a></p></div>
  <a href="http://webservice.recruit.co.jp/"><img src="http://webservice.recruit.co.jp/banner/hotpepper-m.gif" alt="ホットペッパー Webサービス" width="88" height="35" border="0" title="ホットペッパー Webサービス"></a>
</div> <!-- container -->
</body>
</html>