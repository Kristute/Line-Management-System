import { getTimeRemainingByClientNumber } from './storage-management';

$('.js-calculate-time').click(() => {
  $('.js-calculated-time').remove();
  const inputValue = $('.js-number')[0].value;
  const waitingTime = getTimeRemainingByClientNumber(parseInt(inputValue, 10));
  const remainingTimeInMinutes = waitingTime > 0 ? Math.round(waitingTime / 1000 / 60) : 0;
  $('.js-time-remaining').append(`<strong class="js-calculated-time">${remainingTimeInMinutes} mins.</strong>`);
});
