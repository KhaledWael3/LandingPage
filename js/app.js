//Building navigation menu
const ul = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const fragment = document.createDocumentFragment(); //to minimize reflow and rebuild
//looping on sections
/*sections.forEach(section =>{
    //anchor tag , list tag
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.classList.add("menu__link");
    const sectionTitle = section.getAttribute("data-nav");
    const sectionId = section.getAttribute("id");
    link.href = `#${sectionId}`;
    link.textContent = sectionTitle;
    // to add smooth scroll
    link.addEventListener("click" , e=>{
        e.preventDefault();
        section.scrollIntoView({
            behavior: "smooth"
        });
    });
    li.appendChild(link);
    fragment.appendChild(li);
});
ul.appendChild(fragment);*/

//to set the active Section using getBoundingClientRect
let timeOut;
window.onscroll = () => {
    document.querySelectorAll("section").forEach(function (active) {
	if(active.getBoundingClientRect().top >= 0 && active.getBoundingClientRect().top <= 200){
        active.classList.add("your-active-class");
    }
    else{
        active.classList.remove("your-active-class");
    }
	});
    // to remove the navigation bar after 4 seconds of inactivity
    document.querySelector(".page__header").style.display = "block"
    clearTimeout(timeOut);
    timeOut = setTimeout(()=>{
        document.querySelector(".page__header").style.display = "none";
    }, 4000);
}


// to display the to top button after scrolling down
document.onscroll = ()=> {
    if(window.scrollY > 700){
        toTop.style.display = "block";
    }else{
        toTop.style.display = "none";
    }
} 

// go to top function
function topFunction(){
    window.scrollTo({
        top: 0,
        behavior: "smooth" //to add smooth scrolling when going to top
    })
}

    // looping over all sections
const navBar = () => {
    sections.forEach((section) => {
        const list = `<li><a class="menu__link" href="#${section.id}" data-nav="${section.id}">${section.dataset.nav}</a></li>`;
        ul.insertAdjacentHTML("beforeend", list);
        section.addEventListener("click" , e=>{
            e.preventDefault();
            section.scrollIntoView({behavior: "smooth"})
        });
    });
};
navBar();

/*sections.forEach((section) =>{
    const li =document.createElement("li");
    li.innerHTML = `<a class="menu__link" href="#${section.id}" data-nav="${section.id}">${section.dataset.nav}</a>`;
    li.addEventListener("click" , e=>{
        e.preventDefault();
        section.scrollIntoView({behavior: "smooth"});
    })
});*/

 /*const observingSections = () => {
   const observer = new IntersectionObserver(
     function (entries) {
       entries.forEach((entry) => {
         console.log(entry)
         let activeLink = navBar.querySelector(`[data-nav=${entry.target.id}]`);
         if (entry.isIntersecting) {
           entry.target.classList.add("your-active-class");
           activeLink.classList.add("active-link");
           location.hash = `${entry.target.id}`;
         } else {
           entry.target.classList.remove("your-active-class");
           activeLink.classList.remove("active-link");
         }
       });
     },
     // options //
     {
       threshold: 0.7
     }
   );
   return document.querySelectorAll("section").forEach((section)=>{
       observer.observe(section);
   })
    }*/


    const observingSections = () => {
        const observer = new IntersectionObserver(
          function (entries) {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("your-active-class");
                location.hash = `${entry.target.id}`;
              } else {
                entry.target.classList.remove("your-active-class");
              }
            });
          },
          {
            threshold: 0.75
          }
        );
        return document.querySelectorAll("section").forEach((section)=>{
            observer.observe(section);
        })
         }
    observingSections();