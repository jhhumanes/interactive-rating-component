console.log('App running...');

const ratingState = document.querySelector('#rating-state');
const thanksState = document.querySelector('#thanks-state');
const ratingOptions = document.querySelectorAll('.rating-state__option');
let selectedOption = null;
const submitRatingButton = document.querySelector('#submit-button');
const result = document.querySelector('#result');

const setRating = (event) => {
  //console.log(event.target.getAttribute('data-value'));
  if (selectedOption) {
    selectedOption.classList.remove('rating-state__option--selected');
    selectedOption.classList.add('rating-state__option--unselected');
  }

  selectedOption = event.target;
  selectedOption.classList.remove('rating-state__option--unselected');
  selectedOption.classList.add('rating-state__option--selected');
}

const submitRating = () => {
  if (selectedOption) {
    ratingState.classList.remove('visible');
    ratingState.classList.add('invisible');
    thanksState.classList.remove('invisible');
    thanksState.classList.add('visible');

    result.innerHTML = selectedOption.getAttribute('data-value');
  }
}

submitRatingButton.addEventListener('click', submitRating);

ratingOptions.forEach((option) => {
  option.addEventListener('click', setRating);
});
