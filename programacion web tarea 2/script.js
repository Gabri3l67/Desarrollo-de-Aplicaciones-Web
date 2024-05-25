let map;
let markers = [];
let autocomplete;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    const input = document.getElementById('event-location');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            alert("No se encontró información de ubicación para: '" + place.name + "'");
            return;
        }
        map.setCenter(place.geometry.location);
        map.setZoom(17);

        const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        markers.push(marker);
    });
}

document.getElementById('new-event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const location = document.getElementById('event-location').value;

    addEventToList(title, date, location);
    geocodeAddress(location);
    this.reset();
});

function addEventToList(title, date, location) {
    const eventList = document.getElementById('event-list');
    const eventItem = document.createElement('li');
    eventItem.textContent = `${title} - ${date} - ${location}`;
    eventList.appendChild(eventItem);
}

function geocodeAddress(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            markers.push(marker);
        } else {
            alert('Geocode no tuvo éxito debido a: ' + status);
        }
    });
}
