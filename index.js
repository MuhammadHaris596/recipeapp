
var toggle_bar = document.getElementById("toggle");
var canceleToggle_bar = document.getElementById("cancelToggle");


var menuBars_btn = document.getElementById("menuBars");

var save_btn = document.getElementById("save_btn");
var save_section = document.getElementById("save_sec");
var cancelsave_section = document.getElementById("cancel_saveSec");

var saveIcon_fillup = document.getElementById("save-fill");
var saveIcon_empty = document.getElementById("save-empty");
let viewRecipe_btn =  document.getElementById("view_btn");


function toogleBar() {
    // save_section.style.width = "380px";
    // save_section.style.transition = "all .2s ease-in-out ";
    // saveIcon_fillup.style.display = "flex";
    // saveIcon_empty.style.display = "none";
    toggle_bar.style.display = "flex";
    console.log("run togle");
}



function cancelToogleBar() {
    toggle_bar.style.display = "none";
    console.log("run togle");
}

function saveBtn() {
    save_section.style.width = "380px";
    save_section.style.transition = "all .2s ease-in-out ";
    // saveIcon_fillup.style.display = "flex";
    if(saveIcon_empty){
    saveIcon_empty.style.display = "none";
    }

    // console.log("run");
}

function cancelBtn() {
    save_section.style.width = "0px";
    save_section.style.transition = "all .2s ease-in-out "; 
    // console.log("run");
}
function ViewRecipe() {
    window.location.href="./recipeView.html"
}


if (save_btn){
save_btn.addEventListener("click", saveBtn);
}

if (cancelsave_section){
cancelsave_section.addEventListener("click", cancelBtn);
}

if(menuBars_btn){
menuBars_btn.addEventListener("click", toogleBar);
}

if(canceleToggle_bar){
canceleToggle_bar.addEventListener("click", cancelToogleBar);
}


// window.saveBtn = saveBtn






