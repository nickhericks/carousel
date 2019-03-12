const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + 'px'
}

const moveToSlide = (track, slides, currentIndex, targetIndex) => {
  const currentSlide = slides[currentIndex];
  const targetSlide = slides[targetIndex];
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("is-selected");
  targetSlide.classList.add("is-selected");
};

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove('is-selected')
	targetDot.classList.add('is-selected')
}

const showHideArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};


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
	const currentIndex =
		slides.findIndex(slide => slide.classList.contains('is-selected'))
	const currentDot = dotsContainer.querySelector('.is-selected')
	const prevDot = currentDot.previousElementSibling

	moveToSlide(track, slides, currentIndex, currentIndex - 1)
	showHideArrows(slides, prevButton, nextButton, currentIndex - 1)
	updateDots(currentDot, nextDot)
})


// Event listener for the Next button
nextButton.addEventListener('click', e => {
	const currentIndex = 
			slides.findIndex(slide => slide.classList.contains('is-selected'));
	const currentDot = dotsContainer.querySelector('.is-selected');
	const nextDot = currentDot.nextElementSibling;
	
  moveToSlide(track, slides, currentIndex, currentIndex + 1)
	showHideArrows(slides, prevButton, nextButton, currentIndex + 1);
	updateDots(currentDot, nextDot)
});


// Event listener for dots
dotsContainer.addEventListener('click', e => {
	const targetDot = e.target.closest('button')
	if (!targetDot) return

	const currentIndex = slides.findIndex(
		slide => slide.classList.contains('is-selected')
	)
	const currentDot = dotsContainer.querySelector('.is-selected')
	const targetIndex = dots.findIndex(dot => dot === targetDot)

	moveToSlide(track, slides, currentIndex, targetIndex)
	showHideArrows(slides, prevButton, nextButton, targetIndex)
	updateDots(currentDot, targetDot)
})
