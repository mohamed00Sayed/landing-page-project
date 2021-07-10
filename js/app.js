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
let oldActiveSection, oldActiveItem;
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

// checking for customized viewport
 function decorateIfInScope(elem) {
    let rect = elem.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    // setting degrees of visibility within a customised viewport (based on testing)
    // Partially visible elements return true based on this calculations:	
    let scopeOne = (elemTop >= -50) && (elemBottom <= window.innerHeight);
    let scopeTwo = (elemTop < -50) && (elemBottom > window.innerHeight);
    let scopeThree = (elemTop < -50) && (elemBottom > window.innerHeight * 1.95);
    let scopeFour = (elemTop > -50 && elemTop < window.innerHeight * 0.7);
	/////////////////////////
	let id = elem.getAttribute('id');
	
	if(scopeOne || scopeTwo || scopeThree || scopeFour ){
        elem.classList.add('active__section');
		elem.firstElementChild.firstElementChild.style.color = '#c06c6c';
		document.querySelector('#'+id+'_').classList.add('active');
    }else{
		elem.classList.remove('active__section');
		elem.firstElementChild.firstElementChild.style.color = '#fff';
		document.querySelector('#'+id+'_').classList.remove('active');
	}
}


function changeStyle() {
  if (navlist.style.display === 'block') {
    navlist.style.display = 'none';
  } else {
    navlist.style.display = 'block';
  }
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
NodeList.prototype.forEach = Array.prototype.forEach

document.addEventListener('DOMContentLoaded', function(){
	navlist = document.querySelector('#navbar__list');
	sects = document.querySelectorAll('main section');
	sectNames = document.querySelectorAll('.landing__container h2');
	
	populateNavSectionNames();
	populateNavList();
	checkDevice();
	actionOnClick();
	actionOnScroll();
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
		// check that a list item itself is clicked not the list itself
		if(event.target.getAttribute('id').substring(0,7) ==='section'){
			// get section id from the event target (id name is section<section number>_)
			//so just subtract the underscore and get the referenced section
			// and its heading after that so we can change its color
			const sectionId = event.target.getAttribute('id').substring(0,8);
			const section = document.querySelector('#' +sectionId);
			const heading = section.firstElementChild.firstElementChild;
			const currentActiveSection = section;
			// add active__section class to the section already chosen from the nav bar	
			// check for oldActiveSection if it exists and not equal to the currently selected section
			// to prevent unchecking the currently checked on second successive click ! 
			if(oldActiveSection && (oldActiveSection !== currentActiveSection.getAttribute('id').substring(7,))){
				sects[oldActiveSection -1].classList.remove('active__section');
				sects[oldActiveSection -1].firstElementChild.firstElementChild.style.color = '#fff';
			}
			// reassign(or assign if it's the first click) oldActiveSection variable
			oldActiveSection = sectionId.substring(7,);
			// scroll to the section just chosen
			section.scrollIntoView();	
			/////////////////////////////////////
			let activeId = event.target.getAttribute('id');
			event.target.classList.add('active');
			let listElements = navlist.childNodes;
			listElements.forEach(function(elem){
				let anchor = elem.firstElementChild;
				if(anchor.getAttribute('id') !== activeId){
					anchor.classList.remove('active');
				}
			});
		}
	});
}


function onIconClick(){
	let icon = document.querySelector('.icon');
	icon.onclick = changeStyle;
}

function actionOnScroll(){
	document.addEventListener('scroll', function(event){
		navlist.style.display = 'block'
		for(let x=0; x < sects.length; x++){
			decorateIfInScope(sects[x]);
		}
	});
}

// to detect a mobile device

function checkDevice(){
	let icon = document.querySelector('.icon');
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		// true for mobile device
		console.log("mobile device");
		navlist.style.display = 'none';
		navlist.style.backgroundColor = 'transparent';
		navlist.childNodes.forEach(function(elem){
			elem.style.display = 'block';
		});
		icon.style.cssText = 'background: black; display: block; position: absolute;right: 0;top: 0;';
		icon.onclick = changeStyle;
		
	}else{
		// false for not mobile device
		icon.style.display = 'none';
		navlist.style.display = 'block';
		console.log("not mobile device");
	}
	
}

document.addEventListener('scroll', checkEvery);

function checkEvery(){
	let timer;
	timer && clearTimeout(timer);
    timer = setTimeout(function() {
		navlist.style.display = 'none'
		console.log('stopped it');
	}, 500);
}
