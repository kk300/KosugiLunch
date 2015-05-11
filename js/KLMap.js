var gmarkers = [];
var geocoder;

function CreateMapInfo(shop){
    var msg = "<div>";
    msg += shop.name + "<br /><br />";
    msg += "ステータス更新<br />";
    msg += "<select name='status'>";
    msg += "<option value='空席あり！'>空席あり！</option>";
    msg += "<option value='満席！'>満席！</option>";
    msg += "</select>";
    msg += "<input type='hidden' name='shop' value='" + shop.name + "'>";
    msg += "<input type='submit' value='更新'><br />";
    msg += "</div>";
    return msg;
}

function PutMarker(mapObj, shop, iwindow) {
    var imgPath = "img/noinfo.png";
    
    $.getJSON("KosugiLunch.json", function(data){
        for (index in data.data) {
            if (data.data[index].name == shop.name) {
                if (data.data[index].status == "空席あり！") {
                    imgPath = "img/success.png";
                }
                else if (data.data[index].status == "満席！") {
                    imgPath = "img/danger.png";
                }
            }
        }
        geocoder.geocode( { 'address' : shop.address, 'language' : 'ja' }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    title: shop.name,
                    icon: imgPath
                });
                var info = CreateMapInfo(shop);
                google.maps.event.addListener(marker, "click", function() {
                    iwindow.setContent(info);
                    iwindow.open(mapObj, marker);
                });
                marker.setMap(mapObj);
                gmarkers.push(marker);
            }
        });
    });
}

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

$(document).ready(function() {
    var centerLatlng = new google.maps.LatLng(35.575741, 139.659664);
    var mapOptions = {
        zoom: 15,
        center: centerLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    var iwOpts = {
        maxWidth: 300,
        maxHeight: 300
    };
    var infowindow = new google.maps.InfoWindow(iwOpts);
    geocoder = new google.maps.Geocoder();
    google.maps.event.addListener(map, "click", function(){infowindow.close();});
    
    $.getJSON("recruitapi.json", function(api){
        var page       = GetGETParam("page");
        var page_count = 10;
        var offset     = (page - 1) * page_count + 1;
        var req_url    = CreateRequestURL(api.req, page_count, offset);
        
        $.getJSON(req_url, function(data){
            for (index in data.results.shop) {
                PutMarker(map, data.results.shop[index], infowindow);
            }
        });
    });
});