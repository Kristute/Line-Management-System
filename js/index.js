import { getClientsBySpecialist } from './storage-management';

function generateTbodyRow(client, active) {
  return `<tr><td ${ active ? 'class="bg-success"' : '' }>${client.number}</td></tr>`;
}

function generateSpecialistColumn(specialist, clients) {
  const thead = `<thead class="js-thead"><tr><th>${specialist.specialist}</th><tr></thead>`;
  const tbody = `<tbody class="js-tbody">${clients.sort((a, b) => a.number - b.number).map((client, index) => generateTbodyRow(client, index === 0)).join('')}</tbody>`;
  const content = `<div class="col-sm"><table class="table table-dark table-bordered">${thead}${tbody}</table></div>`;
  return content;
}

function generateQueueTable() {
  const specialists = JSON.parse(localStorage.getItem('line-specialists'));
  const content = specialists.map(
    (specialist) => generateSpecialistColumn(specialist, getClientsBySpecialist(specialist.ID))
  );

  $('.js-data').html(content);
}

generateQueueTable();
