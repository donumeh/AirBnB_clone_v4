// On load update the amenities search filters
$(document).ready(

    function () {
        let selectedAmenities = {};

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

        function updateAmenities() {
            const amenitiesList = Object.values(selectedAmenities).join(', ');
            $('.amenities h4').text(amenitiesList);
        }
    }
);