import { initializeSpecialistsSelector, generateTbodyRow } from './dom-actions';
import { getClientsBySpecialist, markAsServiced } from './storage-management';

initializeSpecialistsSelector();

let currentSpecialistID = null;
let specialistName = null;

function renderClientsList(specialistName, clients) {
  $('.js-thead').html(`<tr><th>${specialistName}</th><tr>`);
  $('.js-tbody').html(clients.sort((a, b) => a.number - b.number).map((client, index) => generateTbodyRow(client, index === 0, true)).join(''));
}

function bindMarkAsServicedkEvent() {
  $('.js-servised').click((event) => {
    const clientID = parseInt(event.currentTarget.dataset.value, 10);
    markAsServiced(clientID);
    getClientsBySpecialist(currentSpecialistID);
    renderClientsList(specialistName, getClientsBySpecialist(currentSpecialistID));
  });
}

$('.js-specialists-dropdown').click((event) => {
  currentSpecialistID = parseInt(event.currentTarget.dataset.value, 10);
  specialistName = $(event.currentTarget).html();
  const clientsBySpecialist = getClientsBySpecialist(currentSpecialistID);
  renderClientsList(specialistName, clientsBySpecialist);
  bindMarkAsServicedkEvent();
});
