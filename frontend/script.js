const svgElement = document.querySelector('.shuffle');

svgElement.addEventListener('click', shuffleChildElements);

function shuffleChildElements() {
  const parentElement = document.querySelector('.flex');

  const childElements = Array.from(parentElement.children);

  shuffleArray(childElements);

  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }

  childElements.forEach(element => {
    parentElement.appendChild(element);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const searchSVG = document.querySelector('.search');
const tagText = document.querySelector('.tagtext');


searchSVG.addEventListener('click', function () {
  tagText.contentEditable = true;
  const range = document.createRange();
  range.selectNodeContents(tagText);
  range.collapse(false);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);


  tagText.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      tagText.contentEditable = false;
    }
  });
 });

 const saveSvg = document.getElementById('save');
 const cancelSvg = document.getElementsByClassName('cancel')[0];
 const savestuffDiv = document.getElementsByClassName('savestuff')[0];
 
 saveSvg.addEventListener('click', () => {
     if (savestuffDiv.style.visibility === 'hidden') {
         savestuffDiv.style.visibility = 'visible';
     } else {
         savestuffDiv.style.visibility = 'hidden';
     }
 });
 
 cancelSvg.addEventListener('click', () => {
     savestuffDiv.style.visibility = 'hidden';
 });

 document.addEventListener('keydown', (event) => {
     if (event.key === 'Escape') {
         savestuffDiv.style.visibility = 'hidden';
     }
 });
