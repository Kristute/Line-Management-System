import { loadJsonDataToLocalStorage, addNewEntry } from './storage-management';
import { initializeSpecialistsSelector } from './dom-actions';

initializeSpecialistsSelector();

function getNotification(type, text) {
  const notification = $('#notification');
  notification.addClass(`alert-${type}`);
  notification.append(text);
  notification.removeClass('d-none');
  notification.addClass('show');
}

$('.js-specialists-dropdown').click((event) => {
  const specialistID = parseInt(event.currentTarget.dataset.value, 10);
  addNewEntry(specialistID);
})

$('#load-data').click(() => {
  $.when(
    loadJsonDataToLocalStorage('./data/service.json', 'line-data'),
    loadJsonDataToLocalStorage('./data/clients.json', 'line-clients'),
    loadJsonDataToLocalStorage('./data/specialists.json', 'line-specialists'),
  ).then(
    () => {
      getNotification('success', 'Success! Initial data has been successfully loaded.');
      initializeSpecialistsSelector();
    },
    () => {
      getNotification('danger', 'Sorry, initial data could not be loaded.');
    },
  );
});
