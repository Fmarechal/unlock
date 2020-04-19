var p = document.getElementsByClassName('cardCont'); // element to make resizable

for(let i = 0; i<p.length; i++){
	p[i].addEventListener('click', function init() {
	console.log("into resizer");

    p[i].removeEventListener('click', init, false);
    p[i].className = p.className + ' resizable';
    var resizer = document.createElement('div');
    resizer.className = 'resizer';
    p[i].appendChild(resizer);
    resizer.addEventListener('mousedown', initDrag, false);
}, false);
}


var startX, startY, startWidth, startHeight;

function initDrag(e) {
   startX = e.clientX;
   startY = e.clientY;
   startWidth = parseInt(document.defaultView.getComputedStyle(p).width, 10);
   startHeight = parseInt(document.defaultView.getComputedStyle(p).height, 10);
   document.documentElement.addEventListener('mousemove', doDrag, false);
   document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
   p.style.width = (startWidth + e.clientX - startX) + 'px';
   p.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}
