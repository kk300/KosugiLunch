function GetGETParam(key) {
    var url         = location.href;
    var parameters  = url.split("?");
    if (parameters.length == 1) {
        return 1;
    }
    var params      = parameters[1].split("&");
    var paramsArray = [];
    var i = 0;
    for ( i = 0; i < params.length; i++ ) {
        var neet = params[i].split("=");
        paramsArray.push(neet[0]);
        paramsArray[neet[0]] = neet[1];
    }
    var categoryKey = 1;
    if ( i > 0 ) {
        categoryKey = paramsArray[key];
    }
    return categoryKey;
}

function CreateRequestURL(url, page_count, offset) {
    var req_url     = url;
    var param       = ["small_area", "lunch", "count", "start"];
    var value       = ["X575", "1", page_count, offset];
    
    for(index in param) {
        req_url += "&" + param[index] + "=" + value[index];
    }
    req_url += "&format=jsonp&callback=?";
    return req_url;
}

function CreatePagenation(available, page, page_count, offset) {
    // pagenationナビ作成
    var start_number = offset;
    var end_number   = Math.min( (Number(offset) + Number(page_count) - 1), available );
    var navi         = Math.floor((available) / page_count);
    var pagination   = "";
    
    $("#navi").append(available + "件中 " + start_number + "-" + end_number + "表示<br />");
    
    if (available % page_count != 0) { navi++; }
    if ((Number(page) - 1) >= 1) {
        pagination += "<li><a href='?page=" + (page - 1) + "' aria-label='Previous'>";
        pagination += "<span aria-hidden='true'>&laquo;</span>";
        pagination += "</a></li>";
    }
    for (var i = 0; i < navi; i++) {
        pagination += "<li id='page'><a href='?page=" + (i + 1) + "'>" + (i + 1) + "</a></li>";
    }
    if ((Number(page) + 1) <= navi) {
        pagination += "<li><a href='?page=" + (page + 1) + "' aria-label='Next'>";
        pagination += "<span aria-hidden='true'>&raquo;</span>";
        pagination += "</a></li>";
    }
    $(".pagination").append(pagination);
}

function CreatePlace(shop_name, capacity, shop_url, img_url, index) {
    $.getJSON("KosugiLunch.json", function(kdata){
        var update = "";
        for (kindex in kdata.data) {
            if (kdata.data[kindex].name == shop_name) {
                status = kdata.data[kindex].status;
                update = kdata.data[kindex].update;
            }
        }
        if (status == "なし") {
            status = "空席情報なし";
        }
        var info_str = "";
        info_str += "<b><a href='" + shop_url + "'>";
        info_str += shop_name;
        info_str += "</a><br />";
        info_str += "<h3><font color='green'>残り" + index + "席</font></h3></b><br />";
        info_str += "<small>" + update + "更新<br />";
        info_str += "全" + capacity + "席</small><br />";
        $("#place").append("<tr><td>" + info_str + "</td><td><img src='" + img_url + "'></td></tr>");
    });
}

$(document).ready(function() {
    $.getJSON("recruitapi.json", function(api){
        var page       = GetGETParam("page");
        var page_count = 10;
        var offset     = (page - 1) * page_count + 1;
        var req_url    = CreateRequestURL(api.req, page_count, offset);
        
        $.getJSON(req_url, function(shop_data){
            CreatePagenation(shop_data.results.results_available, page, page_count, offset);

            // お店の表示
            var agent    = navigator.userAgent;
            for (index in shop_data.results.shop) {
                var shop_name = shop_data.results.shop[index].name;
                var capacity  = shop_data.results.shop[index].capacity;
                // 以下の変数はPC版で初期化
                var shop_url  = shop_data.results.shop[index].urls.pc;
                var img_url   = shop_data.results.shop[index].photo.pc.m;
                // 端末がモバイルならモバイル版に変更
                if(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search
(/Android/) != -1){
                    shop_url = shop_data.results.shop[index].urls.mobile;
                    img_url  = shop_data.results.shop[index].photo.mobile.s;
                }
                CreatePlace(shop_name, capacity, shop_url, img_url, index);
            }
        });
    });
    $('#sort').on('click', function () {
        var $btn = $(this).button('loading');
        if ($("#slide1:first").is(":hidden")) {
            $("#slide1").slideDown("fast");
            $("#slide2").slideUp();
        }
        else {
            $("#slide1").slideUp();
        }
        $btn.button('reset');
    });
    $('#grep').on('click', function () {
        var $btn = $(this).button('loading');
        if ($("#slide2:first").is(":hidden")) {
            $("#slide2").slideDown("fast");
            $("#slide1").slideUp();
        }
        else {
            $("#slide2").slideUp();
        }
        $btn.button('reset');
    });
});