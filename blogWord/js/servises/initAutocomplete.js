async function initAutocomplete(inputElement) {
    const { Autocomplete } = await google.maps.importLibrary('places');

    const autocomplete = new Autocomplete(inputElement, {
        types: ['(cities)'],
        fields: ['name', 'geometry'],
    });

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log('city:', place.name);
        console.log('coordinates:', place.geometry?.location?.toString());
    });
}

export default initAutocomplete;
