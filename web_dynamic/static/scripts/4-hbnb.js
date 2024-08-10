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

    if (Object.keys(selectedAmenities).length == 0) {
      showPlacesBySearch();
    } else {
      showPlacesBySearch(selectedAmenities)
    }

    function showPlacesBySearch (selectedAmenities={}) {
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
          $('section.places').empty();
  
          data.forEach(place => {
            // Title Box
            const titleBox = $('<div></div>').addClass('title_box');
            const h2 = $('<h2></h2>').text(place.name);
            const priceByNight = $('<div></div>').addClass('price_by_night').text('$' + place.price_by_night);
  
            // Information Box
            const information = $('<div></div>').addClass('information');
            const maxGuestText = place.max_guest + 'Guest' + (place.max_guest != 1 ? 's' : '');
            const maxGuest = $('<div></div>').addClass('max_guest').text(maxGuestText);
            const numberRoomsText = place.number_rooms + 'Bedroom' + (place.number_rooms !== 1 ? 's' : '');
            const numberRooms = $('<div></div>').addClass('number_rooms').text(numberRoomsText);
            const numberBathroomsText = place.number_bathrooms + 'Bathroom' + (place.number_bathrooms !== 1 ? 's' : '');
            const numberBathrooms = $('<div></div>').addClass('number_bathrooms').text(numberBathroomsText);
  
            // // User
            
            console.log(place);
            // let ownerPrefix = $('<b></b>').text('Owner:')
            // let userText = ownerPrefix + ' ' + place.user.first_name + ' ' + place.user.last_name;
            // let user = $('<div></div>').text(userText);
  
            // Description
            console.log(place);
            const description = $('<div></div>').addClass('description').text(
              (place.description !== null ? place.description : 'no description')
            );
  
            titleBox.append(h2, priceByNight);
            information.append(maxGuest, numberRooms, numberBathrooms);
  
            const article = $('<article></article>');
            article.append(titleBox, information, description);
  
            $('section.places').append(article);
          });
        },
        error: function (xhr, status, error) {
          console.error('Error fetching places:', error);
        }
      });
    }
  }
);
