<!DOCTYPE HTML>
<html lang="ja">

<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>小杉ランチupdate</title>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</head>

<body>
<div class="container">
<?php
    if ($_POST['status'] == '空席あり！' || $_POST['status'] == '満席！') {
        $file = fopen('./KosugiLunch.json', 'r');
        $json_str = '';
        while (($buffer = fgets($file)) !== false ) {
            $json_str .= $buffer;
        }
        fclose($file);
        $data = json_decode($json_str);
        foreach ($data->data as $jdata) {
            if ($_POST['shop'] == $jdata->name) {
                $jdata->status = $_POST['status'];
                $jdata->update = date('Y/m/d H:i');
                echo "ステータスを更新しました！ ";
                echo $jdata->name . "->" . $jdata->status . " at" . $jdata->update;
            }
            $src_time = date('Y/m/d H:i', strtotime("- 20 minute"));
            if ($src_time > $jdata->update) {
                $jdata->status = '情報なし';
            }
        }
        $json_str = json_encode($data);
        $file = fopen('./KosugiLunch.json', 'w');
        fwrite($file, $json_str);
        fclose($file);
        $_POST = array();
        echo '<br /><a href="KosugiLunch.html">KOSUGI LUNCH</a>へ戻る';
    }
?>
</div>
</body>
</html>