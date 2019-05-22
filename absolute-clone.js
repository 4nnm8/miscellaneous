// Create a clone of an element
// with exacts same appearance
// and position but appended in
// BODY and "position:absolute"

function absClone(a) {
  var b = a.cloneNode(true),
    c = a.getBoundingClientRect(),
    d = c.left + (window.pageXOffset || document.documentElement.scrollLeft) + "px",
    e = c.top + (window.pageYOffset || document.documentElement.scrollTop) + "px",
    f = window.getComputedStyle(a),
    g;
  if ("" != f.cssText) {
    b.style.cssText = f.cssText;
  } else {
    g = "";
    for (var i = 0; i < f.length; i++) {
      g += f[i] + ":" + f.getPropertyValue(f[i]) + ";";
    }
    b.style.cssText = g

  }
  b.style.position = "absolute";
  b.style.left = d;
  b.style.top = e;
  b.zIndex = "" != a.zIndex ? +a.zIndex + 1 : 16777271;
  b.id = (a.id) ? a.id + "_cloned" : "";
  return b
}

/************************** USAGE **************************/

// element to be cloned :
var element = document.getElementById("ahah");   

// creating clone and assign it a variable
var myClone = absClone(element);                 

// do whatever you want to do with "myClone", for example :
myClone.style.border = "1px solid #F00"

// Then, append the clone :
document.body.appendChild(myClone);
