const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
// Get width of first slides
const slideWidth = slides[0].getBoundingClientRect().width;

const prevButton = document.querySelector('.jsPrevious');
const nextButton = document.querySelector('.jsNext');

const dotsContainer = document.querySelector('.carousel__nav');
const dots = Array.from(dotsContainer.children)

// Give each slide proper positioning based on slide width
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

// Event listener for the Previous button
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.is-selected');
  const prevSlide = currentSlide.previousElementSibling;
  const amountToMove = prevSlide.style.left;
  const isFirstSlide = !prevSlide.previousElementSibling;
  const currentDot = dotsContainer.querySelector('.is-selected');
  const prevDot = currentDot.previousElementSibling;

  track.style.left = '-' + amountToMove;

  currentSlide.classList.remove('is-selected');
  prevSlide.classList.add('is-selected');

  if (isFirstSlide) {
    prevButton.classList.add('is-hidden');
  }

  currentDot.classList.remove('is-selected');
  prevDot.classList.add('is-selected');

  nextButton.classList.remove('is-hidden');

});

// Event listener for the Next button
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

  prevButton.classList.remove('is-hidden');

});


// Event listener for the dots
dots.forEach(dot => {
  dot.addEventListener('click', e => {

    const currentSlide = track.querySelector('.is-selected');
    const currentDot = dotsContainer.querySelector('.is-selected');
    const targetDot = dot;
    let targetIndex;

    for (let index = 0; index < dots.length; index++) {
      if (dots[index] === targetDot) {
        targetIndex = index;
      }
    }

    const targetSlide = slides[targetIndex];

    // Move to target slide
    const amountToMove = targetSlide.style.left;
    track.style.left = '-' + amountToMove;
    currentSlide.classList.remove('is-selected');
    targetSlide.classList.add('is-selected');

    // Update dots
    currentDot.classList.remove('is-selected');
    targetDot.classList.add('is-selected');

    if (targetIndex === 0) {
      prevButton.classList.add('is-hidden');
      nextButton.classList.remove('is-hidden');
    }
    else if (targetIndex === slides.length - 1) {
      prevButton.classList.remove('is-hidden')
      nextButton.classList.add('is-hidden')
    }
    else {
      prevButton.classList.remove('is-hidden')
      nextButton.classList.remove('is-hidden')
    }
  })
})
