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
* Begin App
*/

/**
 * Define Global Variables
 * 
*/
const navSectionNames = [];
let navlist, sects;
let oldActiveSection;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
* @description a helper function that will fix the length of a specified string 
* to be with the specified length and the added optional suffix
* @param string the string to be changed
* @param length the new length specified for the string
* @param suffix the optional suffix to be added
* @return str the string after the specified change
*/
function fixLength(string, length, suffix){
	let str = string;
	if(string.length > length){
		str = string.substring(0,length);
		if(suffix) str += suffix;
	}
	return str;
}

/**
* @description a helper function that will be called to check
* if a section is in the customized viewport so it will decorate 
* the section, it takes an element and check if it is in any of 
* its four defined scopes then it will decorate it properly, otherwise
* it will remove its decoration
*/
function decorateIfInCustomViewport(elem) {
    let rect = elem.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    // setting scopes of visibility within a customised viewport (based on testing)
    // Partially visible elements return true based on this calculations:	
    let scopeOne = (elemTop >= -50) && (elemBottom <= window.innerHeight);
    let scopeTwo = (elemTop < -50) && (elemBottom > window.innerHeight);
    let scopeThree = (elemTop < -50) && (elemBottom > window.innerHeight * 1.95);
    let scopeFour = (elemTop > -50 && elemTop < window.innerHeight * 0.7);

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



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
* @description the initializer function of the app
* in which a 'DOMContentLoaded' event is added to the document
* so when the DOM is ready for manipulation it gets the navigation 
* list element and all main sections in the page and save them to 
* a dedicated variables, after that it starts running methods 
* dedicated for populating our section names in our data structures 
* declared for that and other methods that are responsible for 
* checking the user device and adding click and scroll actions.
*/
function initializer(){
	document.addEventListener('DOMContentLoaded', function(){
		navlist = document.querySelector('#navbar__list');
		sects = document.querySelectorAll('main section');
		populateNavSectionNames();
		populateNavList();
		checkDevice();
		actionOnClick();
		actionOnScroll();
		actionOnScrollStop();
	});
}

// call the initializer function to start the app.
initializer();


/**
 * End Main Functions
 * Begin Core Functions
 * 
*/

/**
* a function that will get the data from the sections that are set on the data atribute
* so it can use it to populate an array that holds these names to be used later for setting
* the text of the list items.
*/
function populateNavSectionNames(){

	for (let x=0; x < sects.length; x++){
		const sectName = sects[x].getAttribute('data-nav');
		navSectionNames.push(fixLength(sectName, 9, '...'));
	}
}

/**
* @description a function that will create list items and anchors 
* that will be added inside of them, and then it will use the items
* to populate the navigation list.
*/
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

/**
* @description a function that will act based on the user agent device 
* it first gets the icon specified to be displayed as 
* a hamberger menu icon from the DOM, then it gets the element specified 
* to hold that icon so that we can change the default size (increase it a little bit)
* then it checks to see if the user agent is a mobile device, if it evaluates to true 
* then it will set the display our navigation list to 'block', and  then loop
* over its child nodes to set their display to 'block'
* after that sets some styling for our hamberger icon and change its size.
* if it evaluates to false, it will not display the icon and will display 
* our navigation list.
*/
function checkDevice(){
	let icon = document.querySelector('.icon');
	let iconI = document.getElementsByClassName('fa-bars')[0];
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		//for mobile device
		navlist.style.display = 'block';
		navlist.style.backgroundColor = 'transparent';
		navlist.childNodes.forEach(function(elem){
			elem.style.display = 'block';			
		});
		
		icon.style.cssText = 'background-color: transparent;'+
							 'display: block;'+ 
							 'position: absolute;'+
							 'right: 0;top: 0;';
		icon.onclick = changeStyle;
		iconI.style.cssText = 'font-size: 50px;';
	}else{
		//for not mobile device
		icon.style.display = 'none';
		navlist.style.display = 'block';
	}
	
}

/**
* @description a function that will be added to our hamberger menu icon as
* a click listener, it will switch the display of our navigation list.
*/
function changeStyle() {
  if (navlist.style.display === 'block') {
    navlist.style.display = 'none';
  } else {
    navlist.style.display = 'block';
  }
}

/**
 * End Core Functions
 * Begin Event Functions
 * 
*/

/**
* @description a function that will add a click listener to our navigation list
* it will be called from the initializer function.
*/
function actionOnClick(){
	navlist.addEventListener('click', decorate);
}

/**
* @description a function that will be a click listener to our navigation list
* itself so we avoid too many handlers for each element.
* it will be added as a click listener from the actionOnClick function.
* it first check that a list item itself is clicked not the list itself
* then it gets section id from the event target, so we can use it to query 
* the section itself to render it active.
* then it renders the last active section into inactive
* after that it scrolls the element smoothly to the viewport
* it also takes care of who is the currently active anchor.
*/
function decorate(event){
	// check that a list item itself is clicked not the list itself
	if(event.target.getAttribute('id').substring(0,7) ==='section'){
		// get section id from the event target (id name is section<section number>_)
		// as in : section1_ or section10_ and so on.
		//so just subtract the underscore and get the referenced section
		// and its heading after that so we can change its color
		const sectionId = event.target.getAttribute('id').substring(0,8);
		const section = document.querySelector('#' +sectionId);
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
		// scroll to the section just chosen in a smooth way !
		section.scrollIntoView({behavior: 'smooth'});	
		/////////////////////////////////////////////////////////////
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
	
}

/**
* @description a function that will add a scroll listener on the document
* it will be called from the initializer function, it adds checkSection function
* as the listener.
*/
function actionOnScroll(){
	document.addEventListener('scroll',checkSection);
}

/**
* a listener function that will be added on the document to listen for scroll events
* when it is called it starts by displaying our navigation list, and then defines a timer
* and every time it is called it will clear the last timer and sets a new one to be called
* after 600 milliseconds, and that will enusure that the selected element is specified 
* in the viewport so when scrolling from the first section to the last section no flickering 
* will occur in the menu list items occur (that occurs because they will pass through the 
* viewport and get active class added to them and get highlighted !!) 
* the function it sets the time for will ask decorateIfInScope function to check and decorate
* if the element is in the viewport.
*/
function checkSection(){
	navlist.style.display = 'block';
	let timer;
	timer && clearTimeout(timer);
    timer = setTimeout(function(){
		for(let x=0; x < sects.length; x++){
			decorateIfInCustomViewport(sects[x]);
		}
	}, 700);
}

/**
* @description a function that adds a listener on the document
* object for listening to when scrolling of the page
* stops , it will be called from inside the initializer()
* function to add the listener. 
*/
function actionOnScrollStop(){
	document.addEventListener('scroll', checkEvery);
}

/**
* @description a function that will be the listener for detecting
* when scrolling stops, it defines a timer every time it is called
* and clear the last one. 
* the function it sets time for just change the display property of 
* our unordered list (in the navigation menu) to be 'none' so that 
* it disappears after scrolling.
* it sets the time to be 4 seconds to give the user the ability to 
* interact with the menu. 
*/
function checkEvery(){
	let timer;
	timer && clearTimeout(timer);
    timer = setTimeout(function() {
		navlist.style.display = 'none';
	}, 4000);
}
/**
 * End Event Functions
 * End App
 * 
*/
