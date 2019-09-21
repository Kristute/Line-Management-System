import { loadJsonDataToLocalStorage } from './storage-management';


function initializeSpecialistsSelector() {
  const specialistsData = localStorage.getItem('line-specialists');
  const dropdown = $('#specialists-dropdown');

  if (specialistsData !== null) {
    $.each(JSON.parse(specialistsData), (key, entry) => {
      dropdown.append($('<a class="dropdown-item"></a>').text(entry.specialist));
    });

    dropdown.removeClass('d-none');
  }
}

$('#load-data').click(() => {
  $.when(
    loadJsonDataToLocalStorage('./data/service.json', 'line-data'),
    loadJsonDataToLocalStorage('./data/clients.json', 'line-clients'),
    loadJsonDataToLocalStorage('./data/specialists.json', 'line-specialists'),
  ).then(
    () => {
      $('#import-notification-success').removeClass('d-none');
      $('#import-notification-success').addClass('show');
      initializeSpecialistsSelector();
    },
    () => {
      $('#import-notification-error').removeClass('d-none');
      $('#import-notification-error').addClass('show');
    }
  );
});

initializeSpecialistsSelector();
