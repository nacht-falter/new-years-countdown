// Create the map
mapboxgl.accessToken = "pk.eyJ1IjoieWFubmlja2ZlcmVuY3ppIiwiYSI6ImNscTVkaHZtajBoenIybW52cWt2ODVhZjgifQ.BobuT_4StjW8vzWSJ7TevA"
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/yannickferenczi/clq6eztad001001pka7aa4274",
    zoom: 1,
    minZoom: 1,
    maxZoom: 3,
});

const geojson = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: {
                id: 1,
                name: "Samoa",
                timezone: 14,
            },
            geometry: {
                coordinates: [
                    -172.15560570544685,
                    -13.782188174654394
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 2,
                name: "Auckland",
                timezone: 13,
            },
            geometry: {
                coordinates: [
                    174.76342916544002,
                    -36.853872872411806
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 3,
                name: "Sydney",
                timezone: 11,
            },
            geometry: {
                coordinates: [
                    151.20880405027583,
                    -33.87407800977239
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 4,
                name: "Brisbane",
                timezone: 10,
            },
            geometry: {
                coordinates: [
                    153.0237382537598,
                    -27.474474487837497
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 5,
                name: "Tokyo",
                timezone: 9,
            },
            geometry: {
                coordinates: [
                    139.69643681393507,
                    35.67062659414344
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 6,
                name: "Singapore",
                timezone: 8,
            },
            geometry: {
                coordinates: [
                    103.80661854913677,
                    1.3513777369856257
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 7,
                name: "Bangkok",
                timezone: 7,
            },
            geometry: {
                coordinates: [
                    100.49382716789688,
                    13.750062974805346
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 8,
                name: "Maldives",
                timezone: 5,
            },
            geometry: {
                coordinates: [
                    73.25642345110148,
                    3.1710836929889297
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 9,
                name: "Dubai",
                timezone: 4,
            },
            geometry: {
                coordinates: [
                    55.292903718147926,
                    25.263363496675467
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 10,
                name: "St Petersburg",
                timezone: 3,
            },
            geometry: {
                coordinates: [
                    30.316877014127044,
                    59.93121171815156
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 11,
                name: "Cairo",
                timezone: 2,
            },
            geometry: {
                coordinates: [
                    31.235634266566223,
                    30.04307627181882
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 12,
                name: "Zurich",
                timezone: 1,
            },
            geometry: {
                coordinates: [
                    8.541135016550612,
                    47.3737541349895
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 13,
                name: "London",
                timezone: 0,
            },
            geometry: {
                coordinates: [
                    -0.1274434986156905,
                    51.50651394779507
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 14,
                name: "Rio de Janeiro",
                timezone: -2,
            },
            geometry: {
                coordinates: [
                    -43.20911665838554,
                    -22.911903521349714
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 15,
                name: "Sao Paulo",
                timezone: -3,
            },
            geometry: {
                coordinates: [
                    -46.63184148149199,
                    -23.555541089237337
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 16,
                name: "St Barthelemy",
                timezone: -4,
            },
            geometry: {
                coordinates: [
                    -62.82958387254189,
                    17.900742079646946
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 17,
                name: "New York",
                timezone: -5,
            },
            geometry: {
                coordinates: [
                    -74.00379480226954,
                    40.711137709041026
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 18,
                name: "Mexico City",
                timezone: -6,
            },
            geometry: {
                coordinates: [
                    -99.13290824402493,
                    19.42999021368182
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 19,
                name: "Salt Lake City",
                timezone: -7,
            },
            geometry: {
                coordinates: [
                    -111.88652049193188,
                    40.7585457692785
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 20,
                name: "Los Angeles",
                timezone: -8,
            },
            geometry: {
                coordinates: [
                    -118.24196684163917,
                    34.051697256244935
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 21,
                name: "Honolulu",
                timezone: -10,
            },
            geometry: {
                coordinates: [
                    -157.8555757219646,
                    21.302254339683714
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 22,
                name: "Marrakesh",
                timezone: 0,
            },
            geometry: {
                coordinates: [
                    -7.9888828698186956,
                    31.624965093921958
                ],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                id: 23,
                name: "Cape Town",
                timezone: +2,
            },
            geometry: {
                coordinates: [
                    18.41821270969055,
                    -33.93268642021059
                ],
                type: "Point"
            }
        }
    ]
};

var countDownDate = new Date("2023-12-17T00:00:00+00:00").getTime();

for (const feature of geojson.features) {
    // Create a container for every marker on the map
    const markerContainer = document.createElement('div');
    markerContainer.className = 'marker-container centered';
    // Add the icon to the marker container
    const markerElement = document.createElement("div");
    markerContainer.appendChild(markerElement);
    markerElement.setAttribute("id", `marker-element-${feature.properties.id}`);
    markerElement.className = 'marker-2023';
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
            let markerElement = document.getElementById(`marker-element-${feature.properties.id}`)
            markerElement.classList.remove("marker-2023");
            markerElement.className = "marker-2024";
            propertiesElement.innerHTML = `<h4 class="centered">${feature.properties.name}</h4>`;
        }

    }, 1000);
    new mapboxgl.Marker(markerContainer).setLngLat(feature.geometry.coordinates).addTo(map);
};