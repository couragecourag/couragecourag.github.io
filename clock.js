// 時計のメインとなる関数
function clock() {
    // 曜日を表す各文字列の配列
    var weeks = new Array("Sun", "Mon", "Thu", "Wed", "Thu", "Fri", "Sat");
    // 現在日時を表すインスタンスを取得
    var now = new Date();
    now.setHours(now.getHours() + 9);

    // 年
    var y = now.getFullYear();
    // 月 0~11で取得されるので実際の月は+1したものとなる
    var mo = now.getMonth() + 1;
    // 日
    var d = now.getDate();
    // 曜日 0~6で日曜始まりで取得されるのでweeks配列のインデックスとして指定する
    var w = weeks[now.getDay()];
    // 時
    var h = now.getHours();
    // 分
    var mi = now.getMinutes();
    // 秒
    var s = now.getSeconds();

    /*
    if (mi % 10 == 0 && s == 0) {
        setColorNegative();
    }
    */

    // 日付時刻文字列のなかで常に2ケタにしておきたい部分はここで処理
    if (mo < 10) mo = "0" + mo;
    if (d < 10) d = "0" + d;
    if (h < 10) h = "0" + h;
    if (mi < 10) mi = "0" + mi;
    if (s < 10) s = "0" + s;

    //　HTML: <span id="clock_date">(ココの日付文字列を書き換え)</span>
    document.getElementById("clock_date").innerHTML = y + "/" + mo + "/" + d + " " + w;
    //　HTML: <span id="clock_time">(ココの時刻文字列を書き換え)</span>
    document.getElementById("clock_time").innerHTML = h + ":" + mi; /* + ":" + s;*/
    //　HTML: <div id="clock_frame"> の内部要素のフォントサイズをウインドウサイズの10分の1ピクセルに設定
    //document.getElementById("clock_frame").style.fontSize = window.innerWidth / 10 + "px";
}

function setColorNegative() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';

    setTimeout(setColorPositive, 1000);
}

function setColorPositive() {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
}

function weather() {
    $.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    $.ajax({
        url: 'http://weather.livedoor.com/forecast/webservice/json/v1?city=270000',
        type: 'GET',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
        // Ajaxリクエストが成功した時発動
        .done((json) => {
            for (var i = 0; i < 3; i++) {
                $("#day" + i + " .date").text(json["forecasts"][i]["date"].replace(/-/g, "/"));
                $("#day" + i + " .dateLabel").text(json["forecasts"][i]["dateLabel"]);
                $("#day" + i + " .telop").text(json["forecasts"][i]["telop"]);
                $("#day" + i + " .image img").attr("src", json["forecasts"][i]["image"]["url"]);

                if (json["forecasts"][i]["temperature"]["max"] != null && json["forecasts"][i]["temperature"]["min"]) {
                    $("#day" + i + " .temperature").text(json["forecasts"][i]["temperature"]["max"]["celsius"] +
                        "℃/" + json["forecasts"][i]["temperature"]["min"]["celsius"] + "℃");
                }
                else {
                    $("#day" + i + " .temperature").text("-/-");
                }
            }
            $("#description").text(json["description"]["text"].replace(/\s+/g, ""));
        });
}

setInterval(clock, 1000);
weather();