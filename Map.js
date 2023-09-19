//Initialize and add the map
let map;
let autocomplete;
let marker;
const nameCity = document.getElementById("city");


async function initMap() {
    const position = { lat: -12.067981523442159, lng: -75.20999125319716};
    
    const { Map } = await google.maps.importLibrary("maps");  
    const mapDiv= document.getElementById("map");

    map = new  Map(mapDiv, {
        center: position,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.HYBRID 

    });
    marker = new google.maps.Marker({
        map: map,
        position: position,        
    });      
    initAutocomplete();   
}

function initAutocomplete(){
    autocomplete = new google.maps.places.Autocomplete(nameCity);
    autocomplete.addListener('place_changed', function(){
        const place = autocomplete.getPlace();
        map.setCenter(place.geometry.location);
        marker.setPosition(place.geometry.location);
    });
}

initMap();