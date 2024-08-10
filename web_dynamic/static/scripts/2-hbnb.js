// On load update the amenities search filters
$(document).ready(

  function () {
    const selectedAmenities = {};

    $('input[type=checkbox]').on('click', function () {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');

      if ($(this).is(':checked')) {
        selectedAmenities[amenityId] = amenityName;
      } else {
        delete selectedAmenities[amenityId];
      }

      updateAmenities();
    });

    function updateAmenities () {
      const amenitiesList = Object.values(selectedAmenities).join(', ');
      $('.amenities h4').text(amenitiesList);
    }

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (result) {
        if (result.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      },
      error: function (xhr, status, error) {
        $('#api_status').removeClass('available');
      }
    });
  }
);
