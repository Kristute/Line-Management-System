$('#load-data').click(() => {
  $.when(
    loadJsonDataToLocalStorage("./data/service.json", "line-data"),
    loadJsonDataToLocalStorage("./data/clients.json", "line-clients"),
    loadJsonDataToLocalStorage("./data/specialists.json", "line-specialists")
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

function loadJsonDataToLocalStorage(url, localStorageKey) {
  return $.ajax({
    type: "Get",
    url: url,
    dataType: "json",
    success: (data) => {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
    error: (e) => {
        console.log(e);
    }
});
}

function initializeSpecialistsSelector () {
  const specialistsData = localStorage.getItem('line-specialists');
  const dropdown = $('#specialists-dropdown')

  if (specialistsData !== null) {
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Choose Specialist</option>');
    dropdown.prop('selectedIndex', 0);

    $.each(JSON.parse(specialistsData), (key, entry) => {
      dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.specialist));
    })

    dropdown.removeClass('d-none');
  }
}

initializeSpecialistsSelector();
