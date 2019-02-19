// 時計のメインとなる関数
function clock() {
    // 曜日を表す各文字列の配列
    var weeks = new Array("Sun", "Mon", "Thu", "Wed", "Thr", "Fri", "Sat");
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


    if (mi % 10 == 0 && s == 0) {
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
    document.getElementById("clock_time").innerHTML = h + ":" + mi + ":" + s;
    //　HTML: <div id="clock_frame"> の内部要素のフォントサイズをウインドウサイズの10分の1ピクセルに設定
    document.getElementById("clock_frame").style.fontSize = window.innerWidth / 10 + "px";
}

function setColorNegative() {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';

    setTimeout(setColorPositive, 1000);
}

function setColorPositive() {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
}

setInterval(clock, 1000);