// ATTENTION : Function under construction
// By now, not restoring the caret position


var fnClipboard = function() {
    var STEPS = 11, UNDO = [], REDO = [], ELEM;
    this.update = function() {
      var e = ELEM.innerHTML;
      UNDO.length < STEPS || UNDO.pop();
      UNDO.unshift(e);
    };
    this.undo = function() {
      if (1 == UNDO.length) return !1;
      REDO.length < STEPS || UNDO.pop();
      REDO.unshift(UNDO[0]);
      UNDO.shift();
      ELEM.innerHTML = UNDO[0]
    };
    this.redo = function() {
      if (0 == REDO.length) return !1;
      ELEM.innerHTML = REDO[0];
      UNDO.length < STEPS || UNDO.pop();
      UNDO.unshift(REDO[0]);
      REDO.shift()
    };
    this.init = function(REDO, f) {
      STEPS = f + 1;
      ELEM = REDO;
	  
	  if (ELEM.addEventListener) {
        ELEM.addEventListener("input", clipboard.update, !1);
        return true;
      } else if (ELEM.attachEvent) {
        return ELEM.attachEvent("oninput", clipboard.update);
      }
	  
      UNDO.unshift(ELEM.innerHTML)
    }
}, clipboard = new fnClipboard;

// Initiate the function
clipboard.init(element, number_of_undo_redo_steps);

// Maybe you would like to prevent default behavior of CTRL + Z/Y but
// extract and store element content when doing these key combinaisons

document.addEventListener("keydown", function(e){
  var key = e.keyCode || e.which;
  if (e.ctrlKey) {
    switch(key) {
      case 90: e.preventDefault(); clipboard.undo(); break;
      case 89: e.preventDefault(); clipboard.redo(); break;
    }
  }
},false);
  
// If content is added dynamically without triggering 'input' event,
// add 'clipboard.toclipboard()' after ELEMENT_NODE or TEXT_NODE is
// appended. This adds a new step in the UNDO/REDO chain.
// Not necessary when content is appended with 'document.execCommand' 
// beacause it's already considered as an input event.

function addText() {
  var myText = document.createTextNode("Hello world.")
  element.appendChild(myText);
  clipboard.update();
}


