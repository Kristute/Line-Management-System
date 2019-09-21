export function loadJsonDataToLocalStorage(url, localStorageKey) {
  return $.ajax({
    type: 'Get',
    url,
    dataType: 'json',
    success: (data) => {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    },
    error: (e) => {
      console.log(e);
    },
  });
}

export function getData(key) {
  const data = localStorage.getItem(key);

  return data !== null ? JSON.parse(data) : null;
}

export function getClientsBySpecialist(specialistId) {
  const serviceLine = getData('line-data');

  if (serviceLine !== null) {
    const serviceEntries = serviceLine.filter(
      (service) => service.specialist_id === specialistId.toString(10),
    );

    if (serviceEntries.length > 0) {
      const clients = getData('line-clients');

      if (clients !== null) {
        return clients
          .filter(
            (client) => serviceEntries.findIndex(
              (service) => service.client_id === client.ID,
            ) !== -1,
          );
      }
    }
  }

  return [];
}

// mark as done service
// create service time object
// create new service
// insert how long it took for service (previous done === next one start till done, insert when started, update when done)
//
