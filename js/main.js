const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + 'px'
}

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
};

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove('is-selected')
	targetDot.classList.add('is-selected')
}

const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const slideWidth = slides[0].getBoundingClientRect().width;
const prevButton = document.querySelector('.jsPrevious');
const nextButton = document.querySelector('.jsNext');
const dotsContainer = document.querySelector('.carousel__nav');
const dots = Array.from(dotsContainer.children);


// Give each slide proper positioning based on slide width
slides.forEach(setSlidePosition);


// Event listener for the Previous button
prevButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.is-selected');
	const prevSlide = currentSlide.previousElementSibling;
	moveToSlide(track, currentSlide, prevSlide);

	const currentDot = dotsContainer.querySelector('.is-selected');
	const prevDot = currentDot.previousElementSibling;
	updateDots(currentDot, prevDot)


	nextButton.classList.remove("is-hidden");
	const isFirstSlide = !prevSlide.previousElementSibling;
	if (isFirstSlide) {
		prevButton.classList.add('is-hidden');
	}



});


// Event listener for the Next button
nextButton.addEventListener('click', e => {
	const currentSlide = track.querySelector('.is-selected');
	const nextSlide = currentSlide.nextElementSibling;
	moveToSlide(track, currentSlide, nextSlide);

	const currentDot = dotsContainer.querySelector('.is-selected');
	const nextDot = currentDot.nextElementSibling;
	updateDots(currentDot, nextDot)


	
	prevButton.classList.remove('is-hidden');
	const isFinalSlide = !nextSlide.nextElementSibling;
	if (isFinalSlide) {
		nextButton.classList.add('is-hidden');
	}



});



// Event listener for dots
dotsContainer.addEventListener('click', e => {
	const targetDot = e.target.closest('button');
	if (targetDot) {
		const currentSlide = track.querySelector('.is-selected');
		const currentDot = dotsContainer.querySelector('.is-selected');
		let targetIndex;

		for (let index = 0; index < dots.length; index++) {
			if (dots[index] === targetDot) {
				targetIndex = index;
			}
		}

		const targetSlide = slides[targetIndex];

		// Move to target slide
		const amountToMove = targetSlide.style.left;
		track.style.transform = 'translateX(-' + amountToMove + ')';
		currentSlide.classList.remove('is-selected');
		targetSlide.classList.add('is-selected');

		// Update dots
		currentDot.classList.remove('is-selected');
		targetDot.classList.add('is-selected');

		if (targetIndex === 0) {
			prevButton.classList.add('is-hidden');
			nextButton.classList.remove('is-hidden');
		} else if (targetIndex === slides.length - 1) {
			prevButton.classList.remove('is-hidden');
			nextButton.classList.add('is-hidden');
		} else {
			prevButton.classList.remove('is-hidden');
			nextButton.classList.remove('is-hidden');
		}
	}
});
