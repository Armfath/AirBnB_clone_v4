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
