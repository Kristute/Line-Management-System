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

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));  
}

function getNewId(data) {
  return data
    .map((item) => item.ID)
    .reduce((maxValue, currentValue) => Math.max(maxValue, currentValue), 0) + 1;
}

function addNewClient() {
  const clients = getData('line-clients');

  const maxQueueNumber = clients
    .map((client) => client.number)
    .reduce((maxValue, currentValue) => Math.max(maxValue, currentValue), 0) + 1;

  const newId = getNewId(clients);

  clients.push({ ID: newId, number: maxQueueNumber })

  setData('line-clients', clients);

  return newId;
}

function addNewService(clientId, specialistId) {
  const service = getData('line-data');
  const newId = getNewId(service);

  service.push({ ID: newId, client_id: clientId, specialist_id: specialistId })

  setData('line-data', service);

  return newId;
}

export function getClientsBySpecialist(specialistId) {
  const serviceLine = getData('line-data');

  if (serviceLine !== null) {
    const serviceEntries = serviceLine.filter(
      (service) => service.specialist_id === specialistId,
    );

    if (serviceEntries.length > 0) {
      const clients = getData('line-clients');

      if (clients !== null) {
        return clients
          .filter(
            (client) => serviceEntries.findIndex(
              (service) => service.client_id === client.ID,
            ) !== -1 && !client.serviced,
          );
      }
    }
  }

  return [];
}

export function addNewEntry(specialistId) {
  const specialists = getData('line-specialists');
  const specialistById = specialists.find(
    (specialist) => specialist.ID === specialistId,
  );

  if (typeof specialistById !== 'undefined') {
    const newClientId = addNewClient();

    addNewService(newClientId, specialistById.ID);
  }
}

export function markAsServiced(clientId) {
  const clients = getData('line-clients');
  const clientListId = clients.findIndex(
    (client) => client.ID === clientId,
  );

  if (clientListId !== -1) {
    clients[clientListId].serviced = true;

    setData('line-clients', clients);
  }
}
// create service time object
// insert how long it took for service (previous done === next one start till done, insert when started, update when done)