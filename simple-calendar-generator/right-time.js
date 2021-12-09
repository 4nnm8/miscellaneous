const days = [null, "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
      months = [null, "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
      events = {},
      calGrid = document.getElementById("cal-grid");
var thisMonth,
    nowMonth;

function RealDate(a,m,j,h,min) {
  if (!a && !m && !j && !h && !min) {
    this.Now = new Date();
  } else {
    !m && (m = 1);
    !j && (j = 1);
    !h && (h = 0);
    !min && (min = 0);
    this.Now = new Date(a, m-1, j, h, min);
  }
  this.Day = this.Now.getDate();
  this.DayInWeek = this.Now.getDay();
  this.DayInWeekName = days[this.DayInWeek];
  this.Year = this.Now.getFullYear();
  this.Month = this.Now.getMonth() + 1;
  this.MonthName = months[this.Month];
  this.MonthLength = new Date(this.Year, this.Month, 0).getDate();
  this.PrevMonthLength = new Date(this.Year, this.Month - 1, 0).getDate();
  let test1 = new Date(this.Year, this.Month - 1, 1).getDay();
  this.FirstDayOfMonth = (test1 == 0) ? 7 : test1;
  this.FirstDayOfMonthName = days[this.FirstDayOfMonth];
  let test2 = new Date(this.Year, this.Month, 0).getDay();
  this.LastDayOfMonth = (test2 == 0) ? 7 : test2;
  this.LastDayOfMonthName = days[this.LastDayOfMonth];
  this.DaysInWeekPrev = this.FirstDayOfMonth - 1;
  this.DaysInWeekNext = 7 - this.LastDayOfMonth;
}


function generateMonth(y,m) {
  var date = new RealDate(y,m),
      b = date.DaysInWeekPrev,
      f = nowMonth.Day;
    
  calGrid.innerHTML = "";
  calGrid.style.counterReset = "curr-days next-days prev-days " + (date.PrevMonthLength - b);
  document.getElementById("month-year").innerHTML = date.MonthName + ", " + date.Year;

  for (let i = 0; i < b ; i++) {
    let el = document.createElement("div");
    el.className += " cal-prev";
    calGrid.appendChild(el)
  }
  
  /** j'en suis là, marche pour le mois en cours mais à généraliser **/
  var c = date.MonthLength,
      g = (nowMonth.Year == date.Year),
      h = (nowMonth.Month == date.Month);
    
  for (let i = 0; i < c ; i++) {
    let el = document.createElement("div");
    el.className += " cal-curr"; 
	if (g && h && (i == f - 1)) {
	  el.className += " cal-today"; 
	}
    calGrid.appendChild(el)
  }
    
  var d = date.DaysInWeekNext;
  for (let i = 0; i < d ; i++) {
    let el = document.createElement("div");
    el.className += " cal-next";
    calGrid.appendChild(el)
  }
}

function changeMonth(a) {
  var m = thisMonth.Month + a,
      y = thisMonth.Year;
  m == 13 && (m = 1, y++);
  m == 0 && (m = 12, y--);
  generateMonth(y,m);
  thisMonth = new RealDate(y,m);
}

document.getElementById("go-prev").addEventListener("click", function() {changeMonth(-1)});
document.getElementById("go-next").addEventListener("click", function() {changeMonth(+1)});

window.addEventListener("DOMContentLoaded", function() {
  nowMonth = thisMonth = new RealDate();
  generateMonth();
},false);
