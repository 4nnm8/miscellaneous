
/*
<div class="fd-select">
  <input class="sr-only radio-toggle" id="birth-toggle" name="birthdate" type="radio" />
  <label class="select-toggle" for="birth-toggle"></label>

  <span class="select">
    <input class="sr-only" id="birth1900" name="birthdate" type="radio">
    <label for="birth1900">1900</label>
    <input class="sr-only" id="birth1901" name="birthdate" type="radio">
    <label for="birth1901">1901</label>
    <input class="sr-only" id="birth1902" name="birthdate" type="radio">
    <label for="birth1902">1902</label>
  </span>
</div>
label {
  background: #fff;
  color: #666;
  display: block;
  padding: 0 .5em;
}

.select {
  background: #fff;
  border: solid 1px #999;
  z-index: 1;
  display: inline-block;
}

.select-toggle, .select, .select label {
  left: 0;
  line-height: 1.8em;
  min-height: 2em;
  position: absolute;
  right: 0;
  top: 0;
}

.select-toggle, .select-toggle:hover {
  background: none;
  text-align: right;
  z-index: 2;
}

.radio-toggle:checked + .select-toggle {
  left: auto;
}


label:hover, label:focus {
  background: #ccc;
  cursor: pointer;
}

.select label:first-of-type, .select input:checked + label {
  z-index: 1;
}

.radio-toggle:checked ~ .select label {
  position: static;
}

.fd-select {
  min-height: 2em;
  position: relative;
}

input[type="radio"] { position: absolute;  width: 1px;  height: 1px;  margin: -1px;  padding: 0;  overflow: hidden;  clip: rect(0, 0, 0, 0);  border: 0;}
*/

const RegExpYear = '(000[1-9]|00[1-9]\\d|0[1-9]\\d\\d|100\\d|10[1-9]\\d|1[1-9]\\d{2}|[2-9]\\d{3}|[1-9]\\d{4}|1\\d{5}|2[0-6]\\d{4}|27[0-4]\\d{3}|275[0-6]\\d{2}|2757[0-5]\\d|275760)',
      RegExpMonth ='(0[1-9]|1[012])',
      RegExpDay = '(0[1-9]|[12]\\d|3[01])',
      RegExpHour = '(0\\d|1\\d|2[0-4])',
      RegExpMinSec = '(0\\d|[1-5]\\d)',
      RegExpMilli = '(00\\d|0[1-9]\\d|[1-9]\\d{2})',
      patternWeek = '^'+RegExpYear+'-W(([1-4][0-9])|(5[0-3])|0[1-9])$',
      patternMonth = '^'+RegExpYear + '-' + RegExpMonth + '$',
      patternDateTimeLocal = '^' + RegExpYear + '-' + RegExpMonth + '-' + RegExpDay + 'T' + RegExpHour + ':' + RegExpMinSec + '(?::' + RegExpMinSec + ')?(?:\.' + RegExpMilli + ')?$',
      patternDate = '^' + RegExpYear + '-' + RegExpMonth + '-' + RegExpDay + '$',
      patternTime = '^' + RegExpHour + ':' + RegExpMinSec + '(?::' + RegExpMinSec + ')?(?:\.' + RegExpMilli + ')?$',
      patternNumber = '^-?\d+\.?(\d+)?([eE][+-]?\d+)?$';

var ctrlKey = false;
document.addEventListener('keydown', function(e){
  'Control' == e.key && (ctrlKey = true);
});
document.addEventListener('keyup', function(e){
  'Control' == e.key && (ctrlKey = false);
});

/*
document.querySelectorAll('.submit').forEach(function(submit){
  submit.addEventListener('click', function(){
  }, false);
});*/
// https://dmouronval.developpez.com/tutoriels/javascript/api-contrainte-validation/

function validate(a,valid) {
  let form = a.closest('form')
  if (a.value == '') {
    console.log('empty')
    a.classList.remove('fd-valid');
    a.classList.remove('fd-invalid');
  } else if (valid) {
    console.log('valid')
    a.classList.add('fd-valid');
    a.classList.remove('fd-invalid');
    form && (form.querySelector('[type=submit]').disabled = true);
  } else {
    console.log('invalid')
    a.classList.add('fd-invalid');
    a.classList.remove('fd-valid');
    form && (form.querySelector('[type=submit]').disabled = false);
  }
}
/* Add validation for elements that doesn't support it nativly */



document.querySelectorAll('[type=datetime-local], [type=date], [type=time], [type=month], [type=week]').forEach(function(input){
  let type = input.type,
      attrtype = input.attributes.getNamedItem('type').value,
      pattern,
      allowedChars;

  if (type !== attrtype) {
    switch(attrtype) {
      case 'number' : {
        pattern = patternNumber;
        allowedChars = /[0-9.e+-]/;
      } break;
      case 'week' : {
        pattern = patternWeek
        input.placeholder = 'YYYY-Www';
        allowedChars = /[0-9W-]/;
        input.minLength = '8';
        input.maxLength = '10';
      };break;
      case 'month' : {
        pattern = patternMonth;
        input.placeholder = 'Ex: YYYY-MM';
        allowedChars = /[0-9-]/;
        input.minLength = '7';
        input.maxLength = '9';
      };break;
      case 'datetime-local' : {
        pattern = patternDateTimeLocal;
        input.placeholder = 'YYYY-MM-DDThh:mm:ss.sss';
        input.minLength = '16';
        input.maxLength = '25';
        allowedChars = /[0-9:T:.-]/;
      };break;
      case 'date' : {
        pattern = patternDate;
        input.placeholder = 'YYYY-MM-DD';
        input.minLength = '10';
        input.maxLength = '12';
        allowedChars = /[0-9-]/;
      };break;
      case 'time' : {
        pattern = patternTime;
        input.placeholder = 'hh:mm:ss.sss';
        allowedChars = /[0-9:.-]/;
        input.minLength = '5';
        input.maxLength = '12';
      };break;
    }
    input.setAttribute('pattern',pattern)
    /*input.addEventListener('input',function(e){
      let test = pattern.test(this.value);
      if (test) {
        validate(input,true)
      } else {
        validate(input,false)
      }
    });*/
    input.addEventListener('keydown', function(e){
      let k = e.key;
      if (!allowedChars.test(k) && k.length == 1 && e.ctrlKey == false) {
        e.preventDefault();
      }
    });
  }
});






/*
document.querySelectorAll('[type=number]').forEach(function(a){
  a.addEventListener('keydown',function(e){
    let k = e.key,
        v = a.value;
    console.log(v)
    console.log(v.indexOf('e'))
    if (allowedNbChar.indexOf(k) > -1 || k.length > 1 && v.indexOf('e') <= 1 && v.indexOf('+') <= 1 && v.indexOf('-') <= 1){
    } else {
      e.preventDefault()
    }
  });
});*/


const isPatternSupported = 'pattern' in document.createElement('input');

document.querySelectorAll('input').forEach(function(a){
   if (!a.hasAttribute('placeholder')) {
    a.setAttribute('placeholder','')
  }
//https://stackoverflow.com/questions/6456149/html5-how-to-force-input-pattern-validation-on-value-change
/*
  if (isPatternSupported) {
    let pattern = a.getAttribute('pattern');
    if (pattern) {
      a.addEventListener('input', function(){
        let valid = !a.validity.patternMismatch
        validate(this,valid);
      });
    }
  } else {
    let pattern = a.attributes.getNamedItem('pattern');
    if (pattern) {
      a.addEventListener('input', function(){
         pattern = new RegExp('^'+pattern.value+'$')
         let valid = pattern.test(a.value);
         validate(this,valid)
      });
    }
  }*/
});

/* Hides the cross in <input type="time"/> */
document.querySelectorAll('input[type=time], input[type=date], input[type=datetime-local]').forEach(function(a){
  if (/firefox/i.test(navigator.userAgent)) {
    let b = document.createElement('div');
    b.className = 'datetime-container';
    a.parentNode.insertBefore(b,a);
    b.appendChild(a);
  }
});

/* For highly customizable <input type="file" /> */
document.querySelectorAll('input[type=file].fd-file').forEach(function(a){
  let button = document.createElement('button'),
      label = a.labels ? a.labels[0] : false,
      id = a.id;

  if (!label) {
    label = document.createElement('label');
    id && label.setAttribute('for',id)
    a.parentNode.insertBefore(label,a.nextSibling);
  }
  label.classList.add('formidable-file-label')

  button.classList.add('formidable-file-button')
  a.parentNode.insertBefore(button,a.nextSibling);

  button.addEventListener('click', function(){
    a.click();
  },false);
  a.addEventListener('change',function(){
    let path = a.value;
    if (path) {
      label.innerHTML = path.split(/(\\|\/)/g).pop();
    } else {
      label.innerHTML = '';
    }
  });
});



document.querySelectorAll('select.fd-select').forEach(function(a){
  var isMultiple = a.hasAttribute('multiple'),
      type = isMultiple ? 'checkbox' : 'radio',
      multiple = isMultiple ? ' multiple' : '',
      select = document.createElement('div'),
      id = a.id;

  a.className = 'sr-only';

  if (multiple) {
    select.addEventListener('click', function(e){
      let t = e.target,
          c = window[t.htmlFor],
          l = this.querySelectorAll('[type=checkbox]');
      if (t.tagName == 'LABEL') {
        if (!ctrlKey) {
          l.forEach((el) => {
            e.preventDefault();
            el.checked = false;
            c.checked = true;
          });
        } else {
          if (c.checked) {
            c.checked = false;
          } else {
            c.checked = true;
          }
        }
      }
    },false);
  } else {
    select.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      select.classList.toggle('fd-select-open');
    }, false);
  }

  select.className = 'fd-select' + multiple;
  let in_div =  document.createElement('fieldset');
  select.appendChild(in_div);

  a.querySelectorAll('option, optgroup').forEach(function(b,n) {

    function generateRadio() {
      let cb = document.createElement('input'),
          lb = document.createElement('label');
      cb.type = type;
      cb.id = id + '_' + n;
      cb.name = id;
      cb.value = b.value;
      lb.setAttribute('for',id + '_' + n);
      lb.innerHTML = b.textContent;
      return [cb,lb];
    }

    if (b.tagName == 'OPTGROUP') {
      let label = b.label,
          optgroup = document.createElement('div');
      optgroup.className = 'fd-optgroup';
      optgroup.innerHTML = label;
      b.querySelectorAll('option').forEach(function(opt){
        let els = generateRadio();
        optgroup.appendChild(els[0]);
        optgroup.appendChild(els[1]);
      });
      in_div.appendChild(optgroup)
    }

    if (b.tagName == 'OPTION' && b.parentNode.tagName !== 'OPTGROUP') {
      var els = generateRadio();
      in_div.appendChild(els[0]);
      in_div.appendChild(els[1]);
    }

  });

  a.parentNode.insertBefore(select,a.nextSibling);
});


/*/ obtenir une variable à partir d'un style en ligne (dans un élément html)
element.style.getPropertyValue("--ma-variable");
// obtenir une variable par ailleurs
getComputedStyle(element).getPropertyValue("--ma-variable");
// définir une variable dans un style en ligne
element.style.setProperty("--ma-variable", varJS + 4);
*/

/*
<select name="timezone_offset" id="timezone-offset">
	<option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</option>
	<option value="-11:00">(GMT -11:00) Midway Island, Samoa</option>
	<option value="-10:00">(GMT -10:00) Hawaii</option>
	<option value="-09:50">(GMT -9:30) Taiohae</option>
	<option value="-09:00">(GMT -9:00) Alaska</option>
	<option value="-08:00">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
	<option value="-07:00">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
	<option value="-06:00">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
	<option value="-05:00">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
	<option value="-04:50">(GMT -4:30) Caracas</option>
	<option value="-04:00">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
	<option value="-03:50">(GMT -3:30) Newfoundland</option>
	<option value="-03:00">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
	<option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
	<option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</option>
	<option value="+00:00" selected="selected">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
	<option value="+01:00">(GMT +1:00) Brussels, Copenhagen, Madrid, Paris</option>
	<option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</option>
	<option value="+03:00">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
	<option value="+03:50">(GMT +3:30) Tehran</option>
	<option value="+04:00">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
	<option value="+04:50">(GMT +4:30) Kabul</option>
	<option value="+05:00">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
	<option value="+05:50">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
	<option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</option>
	<option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</option>
	<option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
	<option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
	<option value="+08:00">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
	<option value="+08:75">(GMT +8:45) Eucla</option>
	<option value="+09:00">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
	<option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
	<option value="+10:00">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
	<option value="+10:50">(GMT +10:30) Lord Howe Island</option>
	<option value="+11:00">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
	<option value="+11:50">(GMT +11:30) Norfolk Island</option>
	<option value="+12:00">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
	<option value="+12:75">(GMT +12:45) Chatham Islands</option>
	<option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
	<option value="+14:00">(GMT +14:00) Line Islands, Tokelau</option>
</select>
*/
