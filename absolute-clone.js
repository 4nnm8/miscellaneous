	// Create a clone of an element
	// with exacts same appearance
	// and position but appended in
	// BODY and "position:absolute"
  
	function getCssText(a) {
	  var b = window.getComputedStyle(a), c;
	  if ("" != b.cssText) { return b.cssText; }
	  c = "";
	  for (var i = 0; i < b.length; i++) {
	    c += b[i] + ":" + b.getPropertyValue(b[i]) + ";";
	  }
	  return c;
	}

	function absClone(a) {
	  var b = a.cloneNode(true),
	      c = a.getBoundingClientRect(),
	      d = c.left + (window.pageXOffset || document.documentElement.scrollLeft) + "px",
	      e = c.top + (window.pageYOffset || document.documentElement.scrollTop) + "px";
	  b.style.cssText = getCssText(a);
	  b.style.position = "absolute";
	  b.style.left = d;
	  b.style.top = e;
	  b.zIndex = "" != a.zIndex ? +a.zIndex + 1 : 16777271;
	  b.id = (a.id) ? a.id + "_cloned" : "";
	  return b
	}

	var element = document.getElementById("ahah"); // element to be cloned
	var myClone = absClone(element);               // creating clone and assign it a variable 

	// do whatever you want to do with "myClone", for example :

	myClone.style.border = "1px solid #F00"

	// Then, append the clone :

	document.body.appendChild(myClone);
