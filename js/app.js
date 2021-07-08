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
 * Define Global Variables
 * 
*/
const navSectionNames = [];
let navlist, sects, sectNames;
let oldActiveSection;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function fixLength(string){
	let str = string;
	if(string.length > 9){
		str = string.substring(0,9);
		str += '...';
	}
	return str;
}


function isInsideBoundaries(elem) {
    const boundary = elem.getBoundingClientRect();
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	
	const topLimit = viewportHeight * 0.2;
	const bottomLimit = viewportWidth *0.8;
	const isBounded = boundary.top >= 0 &&
					  boundary.left >= 0 &&
					  boundary.bottom <= viewportHeight;
					  boundary.right <= viewportWidth;
    return isBounded;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('DOMContentLoaded', function(){
	navlist = document.querySelector('#navbar__list');
	sects = document.querySelectorAll('main section');
	sectNames = document.querySelectorAll('.landing__container h2');
	populateNavSectionNames();
	populateNavList();
	actionOnClick();
	//actionOnScroll();
});

// Populate navSectionNames 
function populateNavSectionNames(){

	for (let x=0; x < sects.length; x++){
		const sectName = sectNames[x].textContent;
		const sectId = 'section' + (x + 1);
		sects[x].setAttribute('data-nav',sectName);
		sects[x].setAttribute('id', sectId);
		navSectionNames.push(fixLength(sectName));
	}
}


function populateNavList(){
	for(let x=0; x < navSectionNames.length; x++){
		const liElem = document.createElement('li');
		const anchor = document.createElement('a');
		const id = 'section' + (x +1) +'_';
		anchor.setAttribute('class', 'menu__link');
		anchor.setAttribute('id', id);
		anchor.textContent = navSectionNames[x];
		liElem.appendChild(anchor);
		navlist.appendChild(liElem);
	}
}

// Scroll to section on link click
function actionOnClick(){
	navlist.addEventListener('click', function(event){
		// get section id from the event target (id name is section<section number>_)
		//so just subtract the underscore and get the referenced section
		// and its heading after that so we can change its color
		const sectionId = event.target.getAttribute('id').substring(0,8);
		const section = document.querySelector('#' +sectionId);
		const heading = section.firstElementChild.firstElementChild;
		const currentActiveSection = section;
		// add active__section class to the section already chosen from the nav bar
		section.classList.add('active__section');
		// check for oldActiveSection if it exists and not equal to the currently selected section
		// to prevent unchecking the currently checked on second successive click ! 
		if(oldActiveSection && (oldActiveSection !== currentActiveSection.getAttribute('id').substring(7,))){
			sects[oldActiveSection -1].classList.remove('active__section');
			sects[oldActiveSection -1].firstElementChild.firstElementChild.style.color = '#fff';
		}
		// reassign(or assign if it's the first click) oldActiveSection variable
		oldActiveSection = sectionId.substring(7,);
		// scroll to the section just chosen
		section.scrollIntoView({behavior: 'smooth'});
		// change the color of its h2 heading
		heading.style.color = '#c06c6c';
		
	});
}

function actionOnScroll(){
	
	const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	
	const topLimit = viewportHeight * 0.2;
	const bottomLimit = viewportWidth *0.8;
	document.addEventListener('scroll', function(event){
		for(let x=0; x < sects.length; x++){
			const isOut = isOutOfViewport(sects[x]);
			
			if(!out.top){
				sects[x].classList.add('active__section');
				sects[x].firstElementChild.firstElementChild.style.color = '#c06c6c';
			}else{
				sects[x].remove('active__section');
				sects[x].firstElementChild.firstElementChild.style.color = '#fff';
			}
		}
	});
}
/*
[{},{},{},{}]

function toggleActive(){
	for(let x=0; x < sects.length; x++){
		if(isInsideBoundaries(sects[x])){
			sects[x].classList.add('active__section');
			return sects[x];
		}else{
			sects[x].classList.remove('active__section');
			return null;
		}
	}
}
*/


/* 
to detect a mobile device
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  console.log("mobile device");
}else{
  // false for not mobile device
  console.log("not mobile device");
}


*/

var isOutOfViewport = function (elem) {

	// Get element's bounding
	var bounding = elem.getBoundingClientRect();

	// Check if it's out of the viewport on each side
	var out = {};
	out.top = bounding.top < 0;
	out.left = bounding.left < 0;
	out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
	out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
	out.any = out.top || out.left || out.bottom || out.right;
	out.all = out.top && out.left && out.bottom && out.right;

	return out;

};


// Set sections as active


