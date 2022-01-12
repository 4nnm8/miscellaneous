const generateElement = (p) => {
  let n = document.createElement(p.tag);
  p.classes && (n.className = p.classes);
  p.style && (n.style.cssText = p.style);
  p.content && (n.innerHTML = p.content);
  p.appendIn && p.appendIn.appendChild(n);
  p.attribs && Object.entries(p.attribs).forEach((a) => { n.setAttribute(y[0], y[1]) });
  p.events && Object.entries(p.events).forEach((a) => { n.addEventListener(y[0], y[1], !1) });
  return n
};

/* USAGE */

var newElem = generateElement({
  tag: 'div',
  classes: 'class1 class2',
  id: 'elem_id_1',
  content: 'Go !', // innerHTML
  style: 'background:#ccc',
  attribs: {
    'tabindex': '0',
    'role': 'button',
    'aria-label': 'Validate form'
  },
  events: {
    'click': form.submit(),
    'mouseover': myFunction2
  },
  appendIn: document.body;
});


