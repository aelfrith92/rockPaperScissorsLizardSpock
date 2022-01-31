/**
* It adds the hovering effect to the svg file, which cannot be styled via CSS
*/
function hoverButtons (){
	let buttons = document.getElementsByTagName('button');
	for(let button of buttons){
		button.addEventListener('mouseover', function(){
			this.childNodes[1].childNodes[1].setAttribute('stroke', '#000');
		});
		button.addEventListener('mouseleave', function(){
			this.childNodes[1].childNodes[1].setAttribute('stroke', '#fff');
		});
	}
}
hoverButtons();