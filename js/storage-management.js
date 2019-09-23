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
  const creationTimestamp = new Date().getTime();

  clients.push({
    ID: newId,
    number: maxQueueNumber,
    createdAt: creationTimestamp,
    serviced: false,
  });

  setData('line-clients', clients);

  return newId;
}

function addNewService(clientId, specialistId) {
  const service = getData('line-data');
  const newId = getNewId(service);

  service.push({
    ID: newId,
    client_id: clientId,
    specialist_id: specialistId,
  });

  setData('line-data', service);

  return newId;
}

export function getClientsBySpecialist(specialistId, serviced = false) {
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
            ) !== -1 && client.serviced === serviced,
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
    clients[clientListId].endedAt = new Date().getTime();

    setData('line-clients', clients);
  }
}

export function normalizeImportedClientsData() {
  const creationTimestamp = new Date().getTime();
  const clients = getData('line-clients');
  const updatedClients = clients.map((client) => {
    const updatedClient = {
      ...client,
      createdAt: creationTimestamp,
      serviced: false,
    };

    return updatedClient;
  });

  setData('line-clients', updatedClients);
}

export function getAverageTimeOfWaiting(specialistId) {
  const servicedClients = getClientsBySpecialist(specialistId, true);
  const averageTime = servicedClients
    .reduce(
      (total, currentClient) => {
        if (typeof currentClient.endedAt !== 'undefined') {
          return total + (currentClient.endedAt - currentClient.createdAt);
        }

        return total;
      },
      0,
    ) / servicedClients.length;

  if (!Number.isNaN(averageTime)) {
    return Math.round(averageTime);
  }

  return 0;
}

export function getTimeRemainingByClientNumber(clientNumber) {
  const clients = getData('line-clients');

  const requiredClient = clients.find((client) => client.number === clientNumber);

  if (typeof requiredClient !== 'undefined') {
    const serviceEntry = getData('line-data').find((entry) => entry.client_id === requiredClient.ID);

    if (typeof serviceEntry !== 'undefined') {
      const averageTimeOfWaiting = getAverageTimeOfWaiting(serviceEntry.specialist_id);
      const requiredClientIndexInLine = getClientsBySpecialist(serviceEntry.specialist_id)
        .sort((a, b) => a.number - b.number)
        .findIndex((client) => client.ID === requiredClient.ID);

      if (requiredClientIndexInLine !== -1) {
        return averageTimeOfWaiting * requiredClientIndexInLine;
      }
    }
  }

  return 0;
}
