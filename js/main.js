const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
// Get width of first slides
const slideWidth = slides[0].getBoundingClientRect().width;
const nextButton = document.querySelector('.jsNext');
const dotsContainer = document.querySelector('.carousel__nav');

// Give each slide proper positioning based on slide width
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});




nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.is-selected');
  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = nextSlide.style.left;
  const isFinalSlide = !nextSlide.nextElementSibling;
  const currentDot = dotsContainer.querySelector('.is-selected');
  const nextDot = currentDot.nextElementSibling;

  track.style.left = '-' + amountToMove;

  currentSlide.classList.remove('is-selected');
  nextSlide.classList.add('is-selected');

  if (isFinalSlide) {
    nextButton.classList.add('is-hidden');
  }



  currentDot.classList.remove('is-selected');
  nextDot.classList.add('is-selected');



});
