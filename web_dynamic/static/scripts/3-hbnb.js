const $ = window.$;
$(document).ready(function() {
    let checked_amenities_id_name = {};
    $('.amenities input[type=checkbox]').change(function() {
        if ($(this).is(':checked')) {
            checked_amenities_id_name[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete checked_amenities_id_name[$(this).attr('data-id')];
        }
        let checked_amenities_names = (Object.values(checked_amenities_id_name).join(', '));
        $('.amenities h4').text(checked_amenities_names);
    })
    fetch('http://0.0.0.0:5001/api/v1/status/')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                $('header #api_status').addClass('available');
            } else {
                $('header #api_status').removeClass('available');
            }
        })
})
fetch('http://0.0.0.0:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
})
.then(response => response.json())
.then(places => {
    for (let idx = 0; idx < places.length; idx++) {
        $('section.places').append(`
        <article>
	  <div class="title_box">
	    <h2>${places[idx].name}</h2>
	    <div class="price_by_night">$${ places[idx].price_by_night }</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${ places[idx].max_guest } Guest${places[idx].max_guest > 1 ? 's' : ''}</div>
            <div class="number_rooms">${ places[idx].number_rooms } Bedroom${places[idx].number_rooms > 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${ places[idx].number_bathrooms } Bathroom${places[idx].number_bathrooms > 1 ? 's' : ''}</div>
	    </div>
		<div class="description">
	    ${ places[idx].description}
        </div>
	</article>
        `);
    }
})

