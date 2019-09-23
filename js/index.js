import { getClientsBySpecialist, getAverageTimeOfWaiting } from './storage-management';
import { generateTbodyRow } from './dom-actions';

function generateSpecialistColumn(specialist, clients) {
  const averageTimeOfWaiting = getAverageTimeOfWaiting(specialist.ID);

  const clientsTrList = clients
    .sort((a, b) => a.number - b.number)
    .map((client, index) => {
      const timeRemaining = averageTimeOfWaiting * index;
      return generateTbodyRow(client, index === 0, false, timeRemaining);
    })
    .join('');
  const thead = `<thead class="js-thead"><tr><th>${specialist.specialist}</th><tr></thead>`;
  const tbody = `<tbody class="js-tbody">${clientsTrList}</tbody>`;
  const content = `<div class="col-sm"><table class="table table-dark table-bordered">${thead}${tbody}</table></div>`;
  return content;
}

function generateQueueTable() {
  const specialists = JSON.parse(localStorage.getItem('line-specialists'));
  const content = specialists.map(
    (specialist) => generateSpecialistColumn(specialist, getClientsBySpecialist(specialist.ID)),
  );

  $('.js-data').html(content);
}

generateQueueTable();
