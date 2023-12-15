// Create the map
mapboxgl.accessToken = "pk.eyJ1IjoieWFubmlja2ZlcmVuY3ppIiwiYSI6ImNscTVkaHZtajBoenIybW52cWt2ODVhZjgifQ.BobuT_4StjW8vzWSJ7TevA"
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/yannickferenczi/clq6eztad001001pka7aa4274",
    zoom: 1,
});

const geojson = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                name: "Rio de Janeiro",
                timezone: -2,
                nye_countdown: "COUNTDOWN !"
            },
            geometry: {
                coordinates: [
                    -43.2014,
                    -22.920543
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                name: "Los Angeles",
                timezone: -2,
                nye_countdown: "COUNTDOWN !"
            },
            geometry: {
                coordinates: [
                    -118.2014,
                    34.920543
                ],
                type: "Point"
            }
        }
    ]
};

for (const feature of geojson.features) {
    // Create a container for every marker on the map
    const markerContainer = document.createElement('div');
    markerContainer.className = 'marker-container centered';
    // Add the icon to the marker container
    const markerElement = document.createElement("div");
    markerContainer.appendChild(markerElement);
    markerElement.className = 'marker';
    // Add the properties to the marker container
    const propertiesElement = document.createElement("div");
    propertiesElement.className = 'marker-properties';
    markerContainer.appendChild(propertiesElement);
    propertiesElement.innerHTML += `<h4 class="centered">${feature.properties.name}</h4>`;
    propertiesElement.innerHTML += `<p class="centered">${feature.properties.nye_countdown}</p>`;

    new mapboxgl.Marker(markerContainer).setLngLat(feature.geometry.coordinates).addTo(map);
};

