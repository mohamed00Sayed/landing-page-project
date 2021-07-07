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
		anchor.setAttribute('class', 'menu__link');
		anchor.textContent = navSectionNames[x];
		liElem.appendChild(anchor);
		navlist.appendChild(liElem);
	}
}

// Scroll to section on link click
function addScrollToClick(){
	navlist.addEventListener('click', function(event){
		
	});
}

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




// Set sections as active


