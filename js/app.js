let backInterval;
let backoption = true;

let colors = Array.from(document.querySelectorAll(".colors li"));
let backgspans =Array.from(document.querySelectorAll(".background-adjust span"));


if (localStorage.getItem("backgroundop")!==null) {
  
  if (localStorage.getItem("backgroundop")=="yes") {
    backoption = true;
    changeBack();
                
  }else{
    backoption = false;

clearInterval(backInterval);

  }
  backgspans.forEach(span=>{
    span.classList.remove("active");
  if (span.classList.contains(`${localStorage.getItem("backgroundop")}`)) {
    span.classList.add("active");
  }
});

}
  
backgspans.forEach(span=>{
  span.addEventListener("click",function(e) {
  backgspans.forEach(span=>{
    span.classList.remove("active");
  });
    e.target.classList.add("active");
    if (e.target.classList.contains("yes")) {
backoption = true;
changeBack();
      localStorage.setItem("backgroundop","yes");
    } else {
backoption = false;
      clearInterval(backInterval);
      localStorage.setItem("backgroundop","no");

    }

  })
})



if (localStorage.getItem("color")!==null) {
  document.documentElement.style.setProperty("--main-color", localStorage.getItem("color"));
 
      colors.forEach((color)=>{
        color.classList.remove("active-color")
        if (color.dataset.color == localStorage.getItem("color")) {
          color.classList.add("active-color");
        }
      })
     
}


let landing = document.querySelector(".landing-page");
let imgs = ["img-1","img-2","img-3","img-4","img-5","img-6"];


 function changeBack(){
   if (backoption==true){
  backInterval = setInterval(() => {
    let random =Math.floor(Math.random()*imgs.length);

    landing.style.backgroundImage=`url(../imgs/${imgs[random]}.jpg)`

  },1000);
}}
changeBack();
// setting box
let settingBox = document.querySelector(".settings-box");
let settingIcon=document.querySelector(".settings-box i");
settingIcon.onclick = function () {
  settingBox.classList.toggle("set-appear");
      settingIcon.classList.toggle("fa-spin");
   }

colors.forEach((color)=>{
  color.addEventListener("click",function(e) {
    colors.forEach((color)=>{
      color.classList.remove("active-color")
    });
    this.classList.add("active-color");
    localStorage.setItem("color", this.dataset.color);
    document.documentElement.style.setProperty("--main-color", this.dataset.color)
  })
})

// start skills
let skillsSection = document.querySelector(".skills");
let skillspans = document.querySelectorAll(".skill-box .skill-progress span");


// start gallery pop-up boxes
let galleryImgs = document.querySelectorAll(".gallery  img");
galleryImgs.forEach(galleryImage=>{
  galleryImage.addEventListener("click",(e)=> {
    let overlay = document.createElement("div");
    overlay.className ="popup-overlay";
    document.body.appendChild(overlay);
    let popupBox= document.createElement("div");
    popupBox.className ="popup-box";
    let popupHeading= document.createElement("h3");
    if (galleryImage.alt!== null) {
    popupHeading.appendChild(document.createTextNode(galleryImage.alt))
      popupBox.appendChild(popupHeading);
    }

    let popupImage = document.createElement("img");
    popupImage.src=galleryImage.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    
    
let closeSpan = document.createElement("span");
closeSpan.className = "close-span";
closeSpan.appendChild(document.createTextNode("x"));
popupBox.appendChild(closeSpan);


  })
});

document.addEventListener("click",(e)=>{
  if (e.target.className == "close-span") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
})


// start nav links and bullets
let navLinks = document.querySelectorAll(".header-area ul li a");
let navBullets= document.querySelectorAll(".nav-bullets .bullet");

function goToElement(elements){

  window.onscroll=function() {
    elements.forEach(ele=>{
      let section= document.getElementById(ele.dataset.id);
       if (window.scrollY >= section.offsetTop - 200) {
         elements.forEach(ele=>{
          ele.classList.remove("active")
         });
      ele.classList.add("active");
    }
    })
   
    if (window.pageYOffset> (skillsSection.offsetTop+skillsSection.offsetHeight - window.innerHeight)) {

      skillspans.forEach(span=>{
        span.style.width = span.dataset.width;
      })
    }else{
      skillspans.forEach(span=>{
        span.style.width = 0;
      })
    }
  }

  elements.forEach(ele=>{
  ele.addEventListener("click",function (e) {
    e.preventDefault();
    elements.forEach(ele=>{
      ele.classList.remove("active")
    })
    e.target.classList.add("active");
    
    document.getElementById(e.target.dataset.id).scrollIntoView({behavior:'smooth', block:'start'});
    
  })
})


};

goToElement(navLinks);
goToElement(navBullets);


// end nav links and bullets
//start reset button
document.querySelector(".reset").onclick = function () {
  localStorage.clear();
  window.location.reload();
}
//end reset button
// toggle menu
let toggleMenu = document.querySelector(".toggle-menu");
let navList = document.querySelector(".header-area ul");

toggleMenu.addEventListener("click",function (e) {
  e.stopPropagation();
  navList.classList.toggle("open");
})

window.addEventListener("click",function (e) {
  if (e.target != toggleMenu && e.target != navList) {
    if (navList.classList.contains("open")) {
      navList.classList.remove("open");
    }
  }
})

navList.onclick = function (e) {
  e.stopPropagation();
}


