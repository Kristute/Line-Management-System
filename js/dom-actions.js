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

export function generateTbodyRow(client, active, buttonEnabled = false) {
  const clientNumberColumn = `<td ${active ? 'class="bg-success"' : ''}>${client.number}</td>`;
  const buttonColumn = buttonEnabled ? `<td><button type="button" class="btn btn-success w-25 p-3 js-servised" data-value=${client.ID}>Serviced</button></td>` : '';
  return `<tr>${clientNumberColumn}${buttonColumn}</tr>`;
}
