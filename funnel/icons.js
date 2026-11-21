// Inlines icons.svg into the page so <use href="#id"> renders reliably
// (external <use> drops the CSS-variable accent colour in Chrome).
(function () {
  const x = new XMLHttpRequest();
  x.open('GET', 'icons.svg?v=4', false); x.send();
  const d = document.createElement('div');
  d.hidden = true; d.innerHTML = x.responseText;
  document.body.prepend(d);
})();
