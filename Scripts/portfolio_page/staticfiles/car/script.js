var lines = document.getElementById("lines");
var menu = document.getElementById("menu");
 
lines.addEventListener('click', menus);

function menus(){
    lines.classList.toggle('active');
    menu.classList.toggle('active');
}