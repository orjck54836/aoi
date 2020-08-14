function update(){
    
    function switchday(xx) {
        // switch(xx){
        // case 0:return "日曜日";
        // case 1:return "月曜日";
        // case 2:return "火曜日";
        // case 3:return "水曜日";
        // case 4:return "木曜日";
        // case 5:return "金曜日";
        // case 6:return "土曜日";
        // }
        let day = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
        return day[xx];
    }

    function tsuki(we) {

        if (we == 0) return "1月";
        if (we == 1) return "2月";
        if (we == 2) return "3月";
        if (we == 3) return "4月";
        if (we == 4) return "5月";
        if (we == 5) return "6月";
        if (we == 6) return "7月";
        if (we == 7) return "8月";
        if (we == 8) return "9月";
        if (we == 9) return "10月";
        if (we == 10) return "11月";
        if (we == 11) return "12月";
    }

    function switchmonth(yy) {
        switch (yy) {
            case 0: return "一月";
            case 1: return "二月";
            case 2: return "三月";
            case 3: return "四月";
            case 4: return "五月";
            case 5: return "六月";
            case 6: return "七月";
            case 7: return "八月";
            case 8: return "九月";
            case 9: return "十月";
            case 10: return "十一月";
            case 11: return "十二月";
        }
    }

    function addOrdinalIndicator(date) {
        switch (date) {
            case 1:
            case 21:
            case 31: return date + "<sup>st</sup>";
            case 2:
            case 22: return date + "<sup>nd</sup>";
            case 3:
            case 23: return date + "<sup>rd</sup>";
            default: return date + "<sup>th</sup>";
        }

    }   
    


    var today = new Date();

    document.getElementById("cur-date").innerHTML = addOrdinalIndicator( today.getDate() );
    document.getElementById("cur-day").innerHTML = switchday( today.getDay() );
    document.getElementById("cur-month").innerHTML = switchmonth( today.getMonth() );
    document.getElementById("cur-year").innerHTML = today.getFullYear();  
    document.getElementById("cal-month").innerHTML = tsuki( today.getMonth() );
    document.getElementById("back").innerHTML = today.getFullYear();
    document.getElementById("cal-year").innerHTML = today.getFullYear();
} 
    
update();
 
var today = new Date();
var days = document.getElementsByTagName('td');
var thisYear = today.getFullYear();
var thisMonth = today.getMonth();

var firstDateOfThisMonth = new Date(thisYear, thisMonth, 1);
var firstDateDayOfThisMonth = firstDateOfThisMonth.getDay();
var calendarData = {
    currentDate : {
      day : "",
      date : "",
      month : "",
      year : "",
    },
    calendar:{
      month : "",
      year : ""
    }
  };
    

for (var i = 1; i <31; i++){
    days[ firstDateDayOfThisMonth + i].innerHTML = i+1;
}
function fillInMonth(){
    //將月曆表格從0填到41
    let days = document.getElementsByTagName("td"); //將td標籤放入days物件集合中
    var today = new Date();
    var thisMonth = today.getMonth(); console.log(thisMonth);
    var thisYear = today.getFullYear();
    var firstDateOfThisMonth = new Date(thisYear, thisMonth, 1);//建立今年今月1日的 Date日期物件
    var firstDateDayOfThisMonth = firstDateOfThisMonth.getDay(); //取得今年今月1日是禮拜幾
    // console.log(firstDateDayOfThisMonth);
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //儲存每月的天數，其中2月為28或29
    if ((thisYear % 4 == 0 && thisYear % 100 !=0) || (thisYear % 400 ==0)) monthDays[1]= 29; //若是閏年，2月設為29日
    for (var i = 1; i <= monthDays[thisMonth]; i++){ //填今月日期在TD格子上，從今年今月1日是禮拜幾開始填1~今月天數
      days[ firstDateDayOfThisMonth + i - 1].innerHTML = i;
    }
    //填上個月日期
    for(var i = firstDateDayOfThisMonth - 1, d = monthDays[thisMonth - 1]; i >= 0; i--, d--) {
      // console.log(i + "    ,,,   " + d);
      days[i].innerHTML = d;
    }
    //填下個月日期
    for(var i = firstDateDayOfThisMonth + monthDays[thisMonth], d = 1; i <= 41; i++, d++)  {
      console.log(i + "    ,,,   " + d);
      days[i].innerHTML = d;
    }
  } 
  

  