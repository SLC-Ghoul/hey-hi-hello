// configure firebase
var config = {
  apiKey: 'AIzaSyBPE-HZQnIQTV0Sse0K7_JSMqcTDj5ZUH8',
  authDomain: 'ours-d8ddf.firebaseapp.com',
  databaseURL: 'https://ours-d8ddf.firebaseio.com',
  projectId: 'ours-d8ddf',
  storageBucket: 'ours-d8ddf.appspot.com',
  messagingSenderId: '248215919572'
};
firebase.initializeApp(config);

const activity = '';
const database = firebase.database();

$('.add-activity').on('click', function(event) {
  event.preventDefault();
  listItem = $('.activity-input').val();
  if (listItem === '') {
    console.log('nuuuuul');
  } else {
    database.ref('activities').push({
      activity: listItem,
      checkedOff: false
    });
  }

  $('.activity-input').val('');
});

// render activity list from firebase
function render() {
  database.ref('activities').on('child_added', function(snapshot) {
    const checked = snapshot.val().checkedOff;
    console.log('checked');
    if (checked === false) {
      $('.activity-table').append(
        "<div class='row list-item'> <div class= 'col-md-10 item'>" +
          snapshot.val().activity +
          "</div> <div class='col-md-2 done'> <button type='button' class = 'btn btn-default btn-lg check-off' data-key = " +
          snapshot.key +
          "> Check Off <i class='fas fa-check'> </i> </button> </div> </div>"
      );
    } else {
      return null;
    }
  });
}
render();

$(document).on('click', '.check-off', function(event) {
  event.preventDefault();
  console.log('check clicked lovely');
  const eventKey = event.target.dataset.key;
  console.log(event);
  database.ref('activities/' + eventKey + '/checkedOff').set(true);
  location.reload();
});
