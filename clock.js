//時刻データを取得して変数jikanに格納する
var jikan= new Date();
                    
//時・分・秒を取得する
var hour = jikan.getHours();
var minute = jikan.getMinutes();
var second = jikan.getSeconds();

document.write(hour+"時",+minute+"分"+second+"秒");