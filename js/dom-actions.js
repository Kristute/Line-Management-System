export function initializeSpecialistsSelector() {
  const specialistsData = localStorage.getItem('line-specialists');
  const dropdown = $('#specialists-dropdown');
  if (specialistsData !== null) {
    $.each(JSON.parse(specialistsData), (key, entry) => {
      dropdown.append($(`<a class="dropdown-item js-specialists-dropdown cursor-pointer" href="#" data-value=${entry.ID}>${entry.specialist}</a>`));
    });

    dropdown.removeClass('d-none');
  }
}

export function generateTbodyRow(client, active, buttonEnabled = false, remainingTime) {
  const remainingTimeInMinutes = remainingTime > 0 ? Math.round(remainingTime / 1000 / 60) : 0;
  const remainingTimeText = remainingTimeInMinutes > 0 ? `(apytikslis laukimo laikas: ${remainingTimeInMinutes}min.)` : '';
  const clientNumberColumn = `<td ${active ? 'class="bg-success"' : ''}>${client.number} ${remainingTimeText}</td>`;
  const buttonColumn = buttonEnabled ? `<td><button type="button" class="btn btn-success w-25 p-3 js-servised" data-value=${client.ID}>Serviced</button></td>` : '';
  return `<tr>${clientNumberColumn}${buttonColumn}</tr>`;
}

function constructNotificationElement(type, content) {
  const closeButton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  return `<div class="alert alert-${type} alert-dismissible fade show" role="alert">${content}${closeButton}</div>`;
}

export function addNewNotification(type, content) {
  const notificationsWrapper = $('#notifications-wrapper');

  notificationsWrapper.append(constructNotificationElement(type, content));
}
