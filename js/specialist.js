import { initializeSpecialistsSelector, generateTbodyRow } from './dom-actions';
import { getClientsBySpecialist } from './storage-management';

initializeSpecialistsSelector();

function renderClientsList(specialistName, clients) {
  $('.js-thead').html(`<tr><th>${specialistName}</th><tr>`);
  $('.js-tbody').html(clients.sort((a, b) => a.number - b.number).map((client, index) => generateTbodyRow(client, index === 0)).join(''));
}

$('.js-specialists-dropdown').click((event) => {
  const specialistID = parseInt(event.currentTarget.dataset.value, 10);
  const specialistName = $(event.currentTarget).html();
  const clientsBySpecialist = getClientsBySpecialist(specialistID);
  renderClientsList(specialistName, clientsBySpecialist);
});
