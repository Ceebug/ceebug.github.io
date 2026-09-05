// setup constant for a project name to link lookup table
const projectDatabase = [
	{ projectName: 'ceedoku', link: 'https://github.com/ceebug/ceedoku' },
	{ projectName: 'jsf',   link: 'https://github.com/ceebug/jsf' },
	{ projectName: 'fsj', link: 'https://github.com/ceebug/fsj' }
];		

// setup constants for the cards
const ceedokuCard = document.getElementById("ceedokuCard");
const jsfCard = document.getElementById("jsfCard");
const fsjCard = document.getElementById("fsjCard");
const linksHeading = document.getElementById("links");
const linksCard = document.getElementById("linksCard")
const projectsCard = document.getElementById("projects");
const projectsButton = document.getElementById("projectsButton");
const linksbutton = document.getElementById("linksButton");

// add function to handle going to a project
function gotoProject(projectName) {
	// check lookup table for project and store result
	const match = projectDatabase.find(
		(p) => p.projectName.toLowerCase() === projectName.toLowerCase()
	);
	
	if (match) {
		// if the project exists, open it in a new tab
		window.open(match.link, '_blank', 'noopener,noreferrer');
	} else {
		// if the project does not exist error out
		console.warn(`Project was not in database, didn't update link`);
	}
}

// add function to handle event listener calls
function handleRelease(event, projectName) {
	// prevent default event for cancelable events
	if (event.cancelable) event.preventDefault();
	
	// make sure it was a left click if using a mouse
	if (event.type === 'mouseup' && event.button !== 0) return;
	
	// checks passed
	gotoProject(projectName)
}

// add event listeners for each project card to make them open the project in a new tab
// Ceedoku
ceedokuCard.addEventListener('mouseup', (e) => handleRelease(e, "ceedoku"));
ceedokuCard.addEventListener('touchend', (e) => handleRelease(e, "ceedoku"));	
// JSF
jsfCard.addEventListener('mouseup', (e) => handleRelease(e, "jsf"));
jsfCard.addEventListener('touchend', (e) => handleRelease(e, "jsf"));
// FSJ
fsjCard.addEventListener('mouseup', (e) => handleRelease(e, "fsj"));
fsjCard.addEventListener('touchend', (e) => handleRelease(e, "fsj"));

// add function to deal with hash at end of url
function checkHash() {
	// get the hash if it exists
	const hash = window.location.hash;
	
	// setup targetelementvar so js doesnt yell at me later
	let targetElement = null
	
	// check that there was a hash
	if (hash) {
		// check if the hash is equal to any of the two things that actually have focus styling
		if (hash == "#links") {
			// set target element to the links card
			targetElement = linksCard
		} else if (hash == "#projects") {
			// set target element to projects card
			targetElement = projectsCard
		}
		
		if (targetElement) {				
			// add listeners to check for user interaction
			addListeners();
			
			// add the focus class to the target element
			targetElement.classList.add("focus");
			
			// wait for the transition to finish
			setTimeout(() => {
				// add the animate class so the target element does its usual animation
				targetElement.classList.add("animate");
			}, 200);
		}
	}
}

linksbutton.addEventListener('mouseup', (event) => {
	// prevent default event for cancelable events
	if (event.cancelable) event.preventDefault();
	
	// make sure it was a left click if using a mouse
	if (event.button !== 0) return;
	
	// set the hash to links
	window.location.hash = "#links";
	
	// checks passed
	checkHash();
});

linksbutton.addEventListener('touchend', (event) => {
	// prevent default event for cancelable events
	if (event.cancelable) event.preventDefault();
	
	// set the hash to links
	window.location.hash = "#links";
	
	// checks passed
	checkHash();
});

projectsButton.addEventListener('mouseup', (event) => {
	// prevent default event for cancelable events
	if (event.cancelable) event.preventDefault();
	
	// make sure it was a left click if using a mouse
	if (event.button !== 0) return;
	
	// set the hash to projects
	window.location.hash = "#projects";
	
	// checks passed
	checkHash();
});

projectsButton.addEventListener('touchend', (event) => {
	// prevent default event for cancelable events
	if (event.cancelable) event.preventDefault();
	
	// set the hash to projects
	window.location.hash = "#projects";
	
	// checks passed
	checkHash();
});

// add function to add event listeners that call removeFocus on user interaction
function addListeners() {
	window.addEventListener("pointerdown", removeFocus);
	window.addEventListener("wheel", removeFocus);
	window.addEventListener("touchstart", removeFocus);
	window.addEventListener("keydown", removeFocus);
	window.addEventListener("contextmenu", removeFocus);
	window.addEventListener("selectstart", removeFocus);
	window.addEventListener("mousemove", removeFocus);
};

// add listener to call checkhash on load
document.addEventListener('DOMContentLoaded', () => {
	checkHash();
});

// add function to remove element focus
function removeFocus() {
	// remove element animation
	linksCard.classList.remove("animate");
	projectsCard.classList.remove("animate");
	
	// remove element focus
	linksCard.classList.remove("focus");
	projectsCard.classList.remove("focus");
	
	// remove the event listeners since we dont need them anymore
	window.removeEventListener("pointerdown", removeFocus);
	window.removeEventListener("wheel", removeFocus);
	window.removeEventListener("touchstart", removeFocus);
	window.removeEventListener("keydown", removeFocus);
	window.removeEventListener("contextmenu", removeFocus);
	window.removeEventListener("selectstart", removeFocus);
	window.removeEventListener("mousemove", removeFocus);
}
