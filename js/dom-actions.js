export function initializeSpecialistsSelector() {
  const specialistsData = localStorage.getItem('line-specialists');
  const dropdown = $('#specialists-dropdown');

  if (specialistsData !== null) {
    $.each(JSON.parse(specialistsData), (key, entry) => {
      dropdown.append($(`<span class="dropdown-item js-specialists-dropdown cursor-pointer" data-value=${entry.ID}>${entry.specialist}</span>`));
    });

    dropdown.removeClass('d-none');
  }
}

export function generateTbodyRow(client, active) {
  return `<tr><td ${active ? 'class="bg-success"' : ''}>${client.number}</td></tr>`;
}
