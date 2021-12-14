const 
days = [null, "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
months = [null, "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
moonName = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"],
moonEmote = ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"],
RightTime = function(a,m,j,h,min) {
  a || m || j || h || min ? (!m && (m = 1), !j && (j = 1), !h && (h = 0), !min && (min = 0), this.Now = new Date(a, m - 1, j, h, min)) : this.Now = new Date();
  this.Day = this.Now.getDate();
  this.DayInWeek = 0 == this.Now.getDay() ? 7 : this.Now.getDay();
  this.DayInWeekName = days[this.DayInWeek];
  this.Year = this.Now.getFullYear();
  this.Month = this.Now.getMonth() + 1;
  this.MonthName = months[this.Month];
  this.MonthLength = new Date(this.Year, this.Month, 0).getDate();
  this.PrevMonthLength = new Date(this.Year, this.Month - 1, 0).getDate();
  let test1 = new Date(this.Year, this.Month - 1, 1).getDay();
  this.FirstDayOfMonth = (0 == test1) ? 7 : test1;
  let test2 = new Date(this.Year, this.Month, 0).getDay();
  this.LastDayOfMonth = (0 == test2) ? 7 : test2;
  this.DaysInWeekPrev = this.FirstDayOfMonth - 1;
  this.DaysInWeekNext = 7 - this.LastDayOfMonth;
  this.IsBissextile = ((this.Year % 4 === 0 && this.Year % 100 > 0) || (this.Year % 400 === 0));  
  var jd = b = 0, m = this.Month, a = this.Year, j = this.Day;
  m < 3 && (a--, m += 12)
  ++m;
  jd = ((365.25 * a) + (30.6 * m) + j - 694039.09) / 29.5305882;
  b = parseInt(jd); 
  jd -= b; 
  b = Math.round(jd * 8);
  b >= 8 && (b = 0);
  this.MoonNumber = b;
  this.MoonName = moonName[b];
  this.MoonEmote = moonEmote[b];
}

// To use it :
// var date = new RightTime();
// date.Day -> returns today's day number in month (1 to 31)
// date.DayInWeek -> returns today's day number in week (1 to 7, 1 is Monday)
// date.DayInWeekName -> returns today's day name in week (Monday to Sunday)
// date.Year -> returns today's year (yyyy)
// date.Month -> returns today's month number (1 to 12)
// date.MonthName -> returns today's month name (from january to december)
// date.MonthLength -> returns the current month length (28, 29, 30 or 31)
// date.PrevMonthLength -> returns the previous month length (28, 29, 30 or 31)
// date.FirstDayOfMonth -> returns day in week number of current month's first day (1 to 7, 1 is Monday)
// date.LastDayOfMonth -> returns day in week number of current month's last day (1 to 7, 1 is Monday)
// date.DaysInWeekPrev -> returns the amount of days from the previous month necessary to complete the first week of the current month
// date.DaysInWeekNext -> returns the amount of days from the next month necessary to complete the last week of the current month
// date.IsBissextile -> returns true if the year is bissextile, false if it's not
// date.MoonNumber -> returns the indexof today's moon phase (0 for New Moon ... 4 for Full Moon ...)
// date.MoonName -> returns the name of today's moon phase ("Waxing Gibbous", "Last Quarter"...)
// date.MoonEmote -> returns the emote of today's moon phase (🌕, 🌖, 🌗...)

// You can define date like this :
// var date = new RightTime(2022,5,12) -> all of the above properties will apply to the given date
// The format is (year,month,day). Month format is M or MM. For january : 01 or 1 are okay.
// If you don't set month or day, the default values are respectivly 1 and 1 (1st of January)
// You can't set month without year, and you can't set day without month and year.

// MORE TO COME
