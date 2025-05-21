export async function initMap() {
    let map;

    const { Map } = await google.maps.importLibrary('maps');
    const { Marker } = await google.maps.importLibrary('marker');

    const fallbackPosition = { lat: 41.9028, lng: 12.4964 }; // Rome

    function renderMap(position) {
        map = new Map(document.getElementById('map'), {
            center: position,
            zoom: 12,
        });

        new Marker({
            position,
            map,
            title: 'Your location',
        });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const userPosition = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                renderMap(userPosition);
            },
            () => {
                console.warn('Geolocation rejected, showing Rome');
                renderMap(fallbackPosition);
            }
        );
    } else {
        console.warn("Browser doesn't support geolocation");
        renderMap(fallbackPosition);
    }
}
