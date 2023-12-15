// Create the map
mapboxgl.accessToken = "pk.eyJ1IjoieWFubmlja2ZlcmVuY3ppIiwiYSI6ImNscTVkaHZtajBoenIybW52cWt2ODVhZjgifQ.BobuT_4StjW8vzWSJ7TevA"
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/yannickferenczi/clq6eztad001001pka7aa4274",
    zoom: 1,
    minZoom: 1,
    maxZoom: 2,
});

const geojson = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                id: 1,
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
                id: 2,
                name: "Los Angeles",
                timezone: -8,
                nye_countdown: "COUNTDOWN !"
            },
            geometry: {
                coordinates: [
                    -118.2014,
                    34.920543
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 3,
                name: "New York",
                timezone: -5,
                nye_countdown: "COUNTDOWN !"
            },
            geometry: {
                coordinates: [
                    -73.977155,
                    40.638384
                ],
                type: "Point"
            }
        }
    ]
};

var countDownDate = new Date("Jan 1, 2024 00:00:00").getTime();

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
    markerContainer.appendChild(propertiesElement);
    propertiesElement.setAttribute("id", `marker-properties-${feature.properties.id}`);
    // Create countdown
    let x = setInterval(function() {
        let now = new Date().getTime();
        let timeDifference = countDownDate - now - (feature.properties.timezone * 1000 * 60 * 60);

        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        let propertiesElement = document.getElementById(`marker-properties-${feature.properties.id}`);
        propertiesElement.innerHTML = `<h4 class="centered">${feature.properties.name}</h4>`;
        propertiesElement.innerHTML += `<p class="centered">${days}d ${hours}h ${minutes}m ${seconds}s</p>`;

        if (timeDifference <= 0) {
            clearInterval(x);
            propertiesElement.innerHTML = `<h4 class="centered">${feature.properties.name}</h4>`;
            propertiesElement.innerHTML += `<p class="centered">Happy New Year !</p>`;
        }

    }, 1000);
    new mapboxgl.Marker(markerContainer).setLngLat(feature.geometry.coordinates).addTo(map);
};