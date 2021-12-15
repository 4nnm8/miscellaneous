const 
days = [null, "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
months = [null, "janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"],
moonName = ["Nouvelle Lune", "Premier Croissant", "Premier quartier", "Gibeuse ascendante", "Pleine Lune", "Gibeuse descendante", "Dernier Quartier", "Dernier Croissant"],
zodiacBound = [null, 21, 20, 21, 21, 21, 22, 23, 23, 23, 23, 21, 20],
zodiacName = [null,"verseau","poissons","b\u00e9lier","taureau","g\u00e9meaux", "cancer","lion","vierge","balance","scorpion","sagittaire","capricorne"],
zodiacEmote = ["\u2652","\u2653","\u2648","\u2649","\u264A","\u264B","\u264C","\u264D","\u264E","\u264F","\u2650","\u2651"],
moonEmote = ["\u{1F311}","\u{1F312}","\u{1F313}","\u{1F314}","\u{1F315}","\u{1F316}","\u{1F317}","\u{1F318}"],

RightTime = function(a,m,j,h,min) {
  var getLunarAge = function(a,b,c) {
    var a = new Date(a,b,c);
    var b = a.getTime();
    a = a.getTimezoneOffset();
    b = (b / 86400000 - a / 1440 - 10962.6) / 29.530588853;
    b -= Math.floor(b);
    0 > b && (b += 1);
    return 29.530588853 * b;
  };
  a || m || j || h || min ?(!m && (m = 1), !j && (j = 1), !h && (h = 0), !min && (min = 0), this.Now = new Date(a, m - 1, j, h, min)):this.Now = new Date()
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
  this.ZodiacDay = zodiacBound[this.Month];
  this.ZodiacEmote = zodiacEmote[this.Month];
  this.MoonAge = getLunarAge(this.Year, this.Month, this.Day);
  this.NextFullMoon = this.MoonAge > 14.765294427 ? Math.round(44.29588328 - this.MoonAge) : Math.round(14.765294427 - this.MoonAge);
  this.NextNewMoon = Math.round(29.530588853 - this.MoonAge);
  var mn = Math.round((this.MoonAge * 8) / 29.530588853)
  this.MoonNumber = mn >= 8 ? 0 : mn;
  this.MoonName = moonName[this.MoonNumber];
  this.MoonEmote = moonEmote[this.MoonNumber];
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
