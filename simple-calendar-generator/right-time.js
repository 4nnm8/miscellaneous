const 
days = [null, "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
ml = [null, 31, [28,29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
months = [null, "janvier", "f\u00e9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\u00fbt", "septembre", "octobre", "novembre", "d\u00e9cembre"];

class RightTime {
  constructor(a,m,j,h,min) {
    a || m || j || h || min ? (!m && (m = 1), !j && (j = 1), !h && (h = 0), !min && (min = 0), 
                               this.Now = new Date(a, m - 1, j, h, min)) : this.Now = new Date();
    this.Year = this.Now.getFullYear();
    this.Month = this.Now.getMonth() + 1;
    this.Day = this.Now.getDate();
  }
  get DayInWeek() { return 0 == this.Now.getDay() ? 7 : this.Now.getDay() }
  get DayInWeekName() { return days[this.DayInWeek] }
  get DayOfYear() { return Math.floor((this.Now - new Date(this.Year, 0, 0)) / 86400000) }
  get IsBissextile() { return ((this.Year % 4 === 0 && this.Year % 100 > 0) || (this.Year % 400 === 0)) ? 1 : 0 }
  get MonthName() { return months[this.Month] }
  get MonthLength() { return this.Month == 2 ? ml[this.Month][this.IsBissextile] : ml[this.Month] }
  get PrevMonthLength() {return this.Month -1 == 2 ? ml[this.Month - 1][this.IsBissextile] : ml[this.Month -1]}
  get FirstDayOfMonth() {
    let test1 = new Date(this.Year, this.Month - 1, 1).getDay();
    return (0 == test1) ? 7 : test1
  }
  get LastDayOfMonth() {
   let test2 = new Date(this.Year, this.Month, 0).getDay();
   return (0 == test2) ? 7 : test2
  }
  get DaysInWeekPrev() { return this.FirstDayOfMonth - 1 }
  get DaysInWeekNext() { return 7 - this.LastDayOfMonth }
  get Zodiac() {
    var m = this.Month;  
    return {
      get Emote() {
        return [null,"\u2652","\u2653","\u2648","\u2649","\u264A","\u264B","\u264C","\u264D","\u264E","\u264F","\u2650","\u2651"][m];
      },
      get Bound() {
        /* shifting from year to year, provide  an other method */
        return [null, 21, 20, 21, 21, 21, 22, 23, 23, 23, 23, 21, 20][m];
      },
      get Name() {
        return [null,"verseau","poissons","b\u00e9lier","taureau","g\u00e9meaux", "cancer","lion","vierge","balance","scorpion","sagittaire","capricorne"][m];
      }
    }
  }
  get Moon() {
    return {
      get Age() {
        var d = this.Year, b = this.Month, c = this.Day;
        d = void 0 === d ? new Date() : new Date(d,b,c);
        var b = d.getTime();
        d = d.getTimezoneOffset();
        b = (b / 86400000 - d / 1440 - 10962.6) / 29.530588853;
        b -= Math.floor(b);
        0 > b && (b += 1);
        return 29.530588853 * b;
      },
      get NextFull() {
        return this.Age > 14.765294427 ? 44.29588328 - this.Age : 14.765294427 - this.Age
      },
      get NextNew() {
        return 29.530588853 - this.Age
      },
      get Number() {
       let mn = Math.round((this.Age * 8) / 29.530588853)
       return mn >= 8 ? 0 : mn
      },
      get Name() { 
        return ["Nouvelle Lune", "Premier Croissant", "Premier quartier", "Gibeuse ascendante", "Pleine Lune", "Gibeuse descendante", "Dernier Quartier", "Dernier Croissant"][this.Number]
      },
      get Emote() { 
        return ["\u{1F311}","\u{1F312}","\u{1F313}","\u{1F314}","\u{1F315}","\u{1F316}","\u{1F317}","\u{1F318}"][this.Number] 
      }
    }
  }
  get WeekOfYear() {
    var date = new Date(this.Year,this.Month-1,this.Day);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  ShiftDays = (n) => {
    let d = new Date(this.Year,this.Month-1,this.Day);
    d.setDate(d.getDate() + n);
    return new RightTime(d.getFullYear(), d.getMonth()+1, d.getDate())
  }
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
// date.Moon.Age -> returns the moon age in days (from 0 to 29.530588853)
// date.Moon.NextFull -> returns the amount of days to the next Full Moon
// date.Moon.NextNew -> -> returns the amount of days to the next New Moon
// date.Moon.Number -> returns the indexof today's moon phase (0 for New Moon ... 4 for Full Moon ...)
// date.Moon.Name -> returns the name of today's moon phase ("Waxing Gibbous", "Last Quarter"...)
// date.Moon.Emote -> returns the emote of today's moon phase (🌕, 🌖, 🌗...)
// date.DayOfYear -> returns the given day number within the year (ex : 20/12/2021 returns "354")
// date.Zodiac.Name -> returns the name of the Zodiac sign that changes during this month
// date.Zodiac.Emote -> returns the emote of the Zodiac sign that changes during this month
// date.Zodiac.Bound -> returns the day number in which the Zodiac sign changes during the month
// date.ShiftDays(±n) -> adds or removes 'n' days from the given day and returns a new RightTime() object
  // you can then use it this way : var new_day = new RightTime().ShiftDays(-5).DayInWeekName

// You can define date like this :
// var date = new RightTime(2022,5,12) -> all of the above properties will apply to the given date
// The format is (year,month,day). Month format is M or MM. For january : 01 or 1 are okay.
// If you don't set month or day, the default values are respectivly 1 and 1 (1st of January)
// You can't set month without year, and you can't set day without month and year.

// MORE TO COME
