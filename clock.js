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


    if (mi == 0 && s == 0) {
        weather();
        setColorNegative();
    }

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
    setTimeout(setColorPositive, 1000);
}

function setColorPositive() {
    document.body.style.backgroundColor = 'white';
}

function getUvIndex(uv) {
    if (11 <= uv) {
        return "極端に強い";
    }
    if (8 <= uv) {
        return "非常に強い";
    }
    if (6 <= uv) {
        return "強い";
    }
    if (3 <= uv) {
        return "中程度";
    }

    return "弱い";
}

function getShortTimeString(time) {
    var now = new Date(time * 1000);
    now.setHours(now.getHours() + 9);

    // 月 0~11で取得されるので実際の月は+1したものとなる
    var mo = now.getMonth() + 1;
    // 日
    var d = now.getDate();
    // 時
    var h = now.getHours();

    // 日付時刻文字列のなかで常に2ケタにしておきたい部分はここで処理
    if (mo < 10) mo = "0" + mo;
    if (d < 10) d = "0" + d;
    if (h < 10) h = "0" + h;

    return mo + "/" + d + " " + h + "時";
}

function getTimeString(time) {
    var now = new Date(time * 1000);
    now.setHours(now.getHours() + 9);

    // 月 0~11で取得されるので実際の月は+1したものとなる
    var mo = now.getMonth() + 1;
    // 日
    var d = now.getDate();
    // 時
    var h = now.getHours();
    // 分
    var mi = now.getMinutes();

    // 日付時刻文字列のなかで常に2ケタにしておきたい部分はここで処理
    if (mo < 10) mo = "0" + mo;
    if (d < 10) d = "0" + d;
    if (h < 10) h = "0" + h;
    if (mi < 10) mi = "0" + mi;

    return mo + "/" + d + " " + h + "時" + mi + "分";
}

function getMoonEmoji(moonPhase) {
    if (moonPhase >= 1) {
        return "🌑"
    }
    if (moonPhase >= 0.875) {
        return "🌘"
    }
    if (moonPhase >= 0.75) {
        return "🌗"
    }
    if (moonPhase >= 0.625) {
        return "🌖"
    }
    if (moonPhase >= 0.5) {
        return "🌕"
    }
    if (moonPhase >= 0.375) {
        return "🌔"
    }
    if (moonPhase >= 0.25) {
        return "🌓"
    }
    if (moonPhase >= 0.125) {
        return "🌒"
    }

    return "🌒"
}

function weather() {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8268e0caa7f76b405e49fdcd45e7eec2/34.805,135.585?units=si&lang=ja',
        method: 'GET',
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).done(function (json) {
        for (var i = 0; i < 3; i++) {
            $("#sunmoon" + i + " .sunrise .data").text(getTimeString(json["daily"]["data"][i]["sunriseTime"]));
            $("#sunmoon" + i + " .sunset .data").text(getTimeString(json["daily"]["data"][i]["sunsetTime"]));
            $("#sunmoon" + i + " .moonphase .data").text(getMoonEmoji(json["daily"]["data"][i]["moonPhase"]));
        }

        for (var i = 0; i < 49; i += 3) {
            var hourly = json["hourly"]["data"][i];

            //$("#hour_template").clone().attr('id', "hour" + i).appendTo("#weather_frame");
            $("#hour" + i + " .time .data").text(getShortTimeString(hourly["time"]));
            $("#hour" + i + " .summry .data").text(hourly["summary"]);
            $("#hour" + i + " .icon .data img").attr("src", "https://darksky.net/images/weather-icons/" + hourly["icon"] + ".png");
            $("#hour" + i + " .precipIntensity .data").text(hourly["precipIntensity"] + "mm");
            $("#hour" + i + " .precipProbability .data").text(Math.floor(hourly["precipProbability"] * 10000) / 100 + "%");
            $("#hour" + i + " .temperature .data").text(hourly["temperature"] + "℃");
            $("#hour" + i + " .apparentTemperature .data").text(hourly["apparentTemperature"] + "℃");
            $("#hour" + i + " .humidity .data").text(Math.floor(hourly["humidity"] * 10000) / 100 + "%");
            $("#hour" + i + " .pressure .data").text(hourly["pressure"] + "㍱");
            $("#hour" + i + " .windSpeed .data").text(hourly["windSpeed"] + "m/s");
            $("#hour" + i + " .windBearing .data").text(hourly["windBearing"]);
            $("#hour" + i + " .cloudCover .data").text(Math.floor(hourly["cloudCover"] * 10000) / 100 + "%");
            $("#hour" + i + " .uvIndex .data").text(getUvIndex(hourly["uvIndex"]));
            $("#hour" + i + " .visibility .data").text(hourly["visibility"] + "㎞");
        };
    });
}

function initialize() {
    var hoge = $("#hour_template").clone();
    hoge = hoge.attr('id', "hour0");
    hoge.appendTo("#weather_frame_current");

    for (var i = 0; i < 49; i += 3) {
        var hoge = $("#hour_template").clone();
        hoge = hoge.attr('id', "hour" + i);
        hoge.appendTo("#weather_frame");
    }

    $('#weather_frame').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 0,
        infinite: true,
        swipe: false,
        draggable: false,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2
    });

    weather();
}



$(document).ready(function () {
    initialize()
    setInterval(clock, 1000);

    setTimeout(setColorNegative, 1000);
});
