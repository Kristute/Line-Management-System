import { loadJsonDataToLocalStorage, addNewEntry, normalizeImportedClientsData } from './storage-management';
import { initializeSpecialistsSelector, addNewNotification } from './dom-actions';

initializeSpecialistsSelector();
$('#dropdownMenu').focus();
$('.js-specialists-dropdown').click((event) => {
  event.preventDefault();

  const specialistID = parseInt(event.currentTarget.dataset.value, 10);
  addNewEntry(specialistID);
  addNewNotification('success', 'Užregistruota sėkmingai');
})

$('#load-data').click(() => {
  $.when(
    loadJsonDataToLocalStorage('./data/service.json', 'line-data'),
    loadJsonDataToLocalStorage('./data/clients.json', 'line-clients'),
    loadJsonDataToLocalStorage('./data/specialists.json', 'line-specialists'),
  ).then(
    () => {
      addNewNotification('success', 'Sėkmingai nuskaityti lankytojų duomenys');
      initializeSpecialistsSelector();
      normalizeImportedClientsData();
    },
    () => {
      addNewNotification('danger', 'Nepavyko nuskaityti lankytojų duomenų');
    },
  );
});
