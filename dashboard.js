




let rc_sharLink = document.getElementById("share_link");
// let save_sec = document.getElementById("save_sect");

function functionrecipe_shareLink() {
    save_sec.style.display = "none";
    recipe_shareSec.style.display = "flex";
    user_Sec.style.display = "none";


    console.log("run")
}
rc_sharLink.addEventListener("click", functionrecipe_shareLink);





let recipe_shareSec = document.getElementById("rcp-shareSec");
let save_Link = document.getElementById("save_link");
let save_sec = document.getElementById("save_sect");

function saveLink() {
    save_sec.style.display = "flex";
    recipe_shareSec.style.display = "none";
    user_Sec.style.display = "none";

    console.log("run save")
}
save_Link.addEventListener("click",saveLink);



let user_Sec = document.getElementById("user_Sec");
// let save_Link = document.getElementById("save_link");
// let save_sec = document.getElementById("save_sect");
let user_link = document.getElementById("userlink");


function userLink() {
    user_Sec.style.display = "flex";
    recipe_shareSec.style.display = "none";
    save_sec.style.display = "none";
   


    console.log("run save")
}
user_link.addEventListener("click", userLink);