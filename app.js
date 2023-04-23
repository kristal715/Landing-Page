/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
// list of all sections in the page
const sections = document.querySelectorAll('section');


/**
 * End Global Variables
 * Start Helper Functions
 *
*/
//to remove 'active' class from the current active link
let removeActiveClassFromLink = function () {
  const activeClass = document.getElementsByClassName("active");
  if (activeClass.length > 0) {
    activeClass[0].classList.remove("active");
  }
}

//to remove 'active_section' class from the current active link
let removeActiveClassFromSection = function () {
  const yourActiveClass = document.getElementsByClassName("active_section");
  if (yourActiveClass.length > 0) {
    yourActiveClass[0].classList.remove("active_section");
  }
}

//Seachring Menu Links by textContent
let searchMenuByText = function (SearchingText) {
  const menuLinks = document.querySelectorAll('.menu__link');
  let found;

  for (var i = 0; i < menuLinks.length; i++) {
    if (menuLinks[i].textContent == SearchingText) {
      found = menuLinks[i];
      break;
    }
  }
  return found;
}

//test if an element is in the viewport with vanilla JavaScript
/*
“In the viewport” means in the visible part of the screen, as opposed to above or below the visible area.
 This is useful when doing things like creating lazy loading scripts.
*/
const isInViewport = (element) => {
  var rect = element.getBoundingClientRect();
  const scroll = window.scrollY || window.pageYOffset
  const boundsTop = rect.top + scrollbars

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight,
  }

  const bounds = {
    top: boundsTop,
    bottom: boundsTop + element.clientHeight - 200, //'-200' is added by me
  }

  return (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom)
    || (bounds.top <= viewport.bottom && bounds.top >= viewport.top);
}



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/*
build the dynamically updating navigational menu based on 
the amount of content that is added to the page
*/
function buildNav() {
  const navbarList = document.getElementById('navbar__list');
  sections.forEach((section) => {
    const newLi = document.createElement('li');
    const newA = document.createElement('a');
    const navItem = section.querySelector('h2').textContent;

    newA.classList.add('menu__link');
    newA.textContent = navItem;
    newLi.appendChild(newA);
    navbarList.appendChild(newLi);
  })
}


//  Scroll to section on link click, and update 'active' class for nav. link
// 'active_section' class for the corresponding section
function whenClick() {
  const menu_Links = document.querySelectorAll('.menu__link');
  menu_Links.forEach((menu_Link, i) => {
    //const sectionId = sections[i].getAttribute('id');
    //menu_Link.setAttribute('href', `#${sectionId}`);
    menu_Link.addEventListener('click', respondToClick);

    function respondToClick() {
      removeActiveClassFromLink(); //remove 'active' class from the previous active link
      menu_Link.classList.add('active'); //add 'active' class to the current active link

      // Scroll to section on link click 
      sections[i].scrollIntoView({ behavior: "smooth" }); //this can be used instead of 'href=#${sectionId}` to scroll to the specified section
      removeActiveClassFromSection(); //remove 'active_section' class from the previous active section
      sections[i].classList.add('active_section'); //add 'active_section' class to the current active section
    }
  })
}

//respond to scroll event: update class for both section and the corresponding link
function whenScroll() {
  for (let section of sections) {
    if (isInViewport(section)) {
      removeActiveClassFromSection();     //remove 'active_section' class from the previous active section
      section.classList.add('active_section'); //add 'active_section' class to the current active section

      //update the corresponding navigation link
      removeActiveClassFromLink();    //remove 'active' class from the previous active section
      let correspondingLink = searchMenuByText(section.getAttribute('data-nav'));
      correspondingLink.classList.add('active');    //add 'active' class to the corresponding link
      break;
    }
  }
}


/**
 * End Main Functions
 * Begin Events
 *
*/
//using 'setTimeout' will allow the browser to handle user interactions.
// Build menu
setTimeout(buildNav, 0);



//set 'click' events to each link
setTimeout(whenClick, 30);


// when scroll 
window.addEventListener('scroll', whenScroll, true);


/*******************************************************/
//Additional Features (Pure JS)
/*******************************************************/
/*Scroll to top when arrow up clicked BEGIN*/ //(Pure JS)

const backToTop = document.querySelector("#back2Top");
//backToTop.setAttribute('href', '#');

window.addEventListener('scroll', function () {
  var height = window.pageYOffset;
  if (height > 150) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

const smoothValue = 10;
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / smoothValue);
    /*
        Tip: for slower motion of the scrolling, increase the 'smoothValue'. 
        The bigger the number - the smoother / slower the scrolling.
    */
  }
};

backToTop.addEventListener('click',
  scrollToTop
  //window.scrollTo({ top: 0, behavior: "smooth" });
);

/*Scroll to top when arrow up clicked END*/
/*******************************************************/
/*Scroll to top when reloading the page (Pure JS)*/
window.addEventListener('load', scrollToTop);
/*******************************************************/
