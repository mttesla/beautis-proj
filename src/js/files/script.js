import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener("click", documentActions);

const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block');
if (menuBlocks.length) {
	menuBlocks.forEach(menuBlock => {
		const menuBlockItems = menuBlock.querySelectorAll('.sub-menu-catalog__category').length;
		menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
	});
}

function documentActions(e) {
	const targetElement = e.target;
	if (targetElement.closest('[data-parent]')) {
		const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
		const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
		if (subMenu) {
			const activeLink = document.querySelector('._sub-menu-active');
			const activeBlock = document.querySelector('._sub-menu-open');


			if (activeLink && activeLink !== targetElement) {
				activeLink.classList.remove('_sub-menu-active');
				activeBlock.classList.remove('_sub-menu-open');
				document.documentElement.classList.remove('sub-menu-open');
			}
			document.documentElement.classList.toggle('sub-menu-open');
			targetElement.classList.toggle('_sub-menu-active');
			subMenu.classList.toggle('_sub-menu-open');

		} else {
			console.log('Ой ой, нет такого подменю :(')
		}
		e.preventDefault();
	}
	if (targetElement.closest('.menu-top-header__link_catalog')) {
		document.documentElement.classList.add('catalog-open');
		e.preventDefault();
	}
	if (targetElement.closest('.menu-catalog__back')) {
		document.documentElement.classList.remove('catalog-open');
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
		e.preventDefault();
	}
	if (targetElement.closest('.sub-menu-catalog__back')) {
		document.documentElement.classList.remove('sub-menu-open');
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
		e.preventDefault();
	}
}

if (document.querySelector('.filter-catalog__title')) {
	document.querySelector('.filter-catalog__title').addEventListener("click", function (e) {
		if (window.innerWidth < 992) {
			document.querySelector('.filter-catalog__items').classList.toggle('_active');
		}
	});
}


//========================================================================================================================================================

// apply user rating to all displays
// add star ratings to an array
var starRating = document.querySelectorAll(".fa-star"),
ratingTotal = document.querySelectorAll(".rating-total");

// convert ratingTotal HTMLCollection to array and reverse its order (5 star <-> 1 star)
var reverseRatingTotal = Array.from(ratingTotal).reverse();

// display initial rating totals
displayTotals();

// use event listener to record changes to user rating
starRating.forEach(function(star) {
	star.addEventListener("click", recordRating);
})

function recordRating(event) {
// use indexOf to identify selected user rating
var userRating = Array.from(starRating).indexOf(event.target);

// define selected rating to adjust display totals
var selectedIndex;

	starRating.forEach(function(item, index) {
		// add or remove .active class based upon selected user rating
		if (index < userRating + 1) {
		starRating[index].classList.add("active-rating");
		selectedIndex = index;
		} else {
		starRating[index].classList.remove("active-rating");
		}

		displayTotals(selectedIndex);
	});
}

// display star rating totals from html custom data-
function displayTotals(selectedIndex) {
var barChart = document.querySelectorAll(".bar"),
	displaySummary = document.querySelectorAll(".summary"),
	numRatings = 0,
	numRatingsValue = 0;

// convert barChart HTMLCollection to array and reverse its order (5 star <-> 1 star)
var reverseBarChart = Array.from(barChart).reverse();

reverseRatingTotal.forEach(function(total, index) {
	if (index == selectedIndex) {
	// add selected rating to display total
	total.innerHTML = (parseInt(total.getAttribute("data-rating-count")) + 1);
	// adjust selected bar width
	reverseBarChart[index].style.width = (((parseInt(total.getAttribute("data-rating-count")) + 1) / 20) * 100) + "%";
	} else {
	// display unselected totals
	total.innerHTML = total.getAttribute("data-rating-count");
	// adjust unselected bar widths
	reverseBarChart[index].style.width = ((total.getAttribute("data-rating-count") / 20) * 100) + "%";
	}
	// count total number and value of ratings
	numRatings += parseInt(total.innerHTML);
	numRatingsValue += (parseInt(total.innerHTML) * (index + 1));
});

// display rating average and total
// ratingsAverage = (numRatingsValue / numRatings).toFixed(2);
// displaySummary[0].innerHTML = ratingsAverage + " average based on " + numRatings + " reviews.";
}
	