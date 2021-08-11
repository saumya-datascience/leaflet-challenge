// Store our API endpoint as queryUrl.
let myMap
let earthquakes
let tectonicPlates
// var myMap = L.map("map", {
//     center: [40.7128, -74.0059],
//     zoom: 11
//   });


var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
    d3.json(url).then(function (response) {
            // Once we get a response, send the data.features object to the createFeatures function.
            console.log(response)
            tectoniclayer(response)
            
        });
// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    console.log(data.features)
    createFeatures(data.features);
});

    
        // var url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
        // d3.json(url).then(function (response) {
        //     // Once we get a response, send the data.features object to the createFeatures function.
        //     console.log(response)
        // });    
    
    
        // var polygon = L.polygon(latlngs, { color: 'red' }).addTo(map);
function chooseColor(coordinate) {
    if (coordinate[2] >= -10 && coordinate[2] < 10) return "yellow";
    else if (coordinate[2] >= 10 && coordinate[2] < 20) return "magenta";
    else if (coordinate[2] >= 20 && coordinate[2] < 30) return "grey";
    else if (coordinate[2] >= 30 && coordinate[2] < 40) return "teal";
    else if (coordinate[2] >= 40 && coordinate[2] < 50) return "orange";
    else if (coordinate[2] >= 50 && coordinate[2] < 60) return "pink";
    else if (coordinate[2] >= 60 && coordinate[2] < 70) return "red";
    else if (coordinate[2] >= 70 && coordinate[2] < 80) return "purple";
    else if (coordinate[2] >= 80 && coordinate[2] < 90) return "gold";
    else if (coordinate[2] >= 90) return "brown";
    else return "black";
}
function sizemagnitude(mag) {
    if (mag > 0 && mag < 2) return 5;
    else if (mag >= 2 && mag < 4) return 10;
    else if (mag >= 4 && mag < 6) return 15;
    else if (mag >= 6) return 20;
}
function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.mag}</h3><hr><p>${feature.properties.place}</p>`);
    }
         earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function (feature) {
            return {
                color: "white",
                fillColor: chooseColor(feature.geometry.coordinates),
                // fillcolor: "blue",
                fillOpacity: 0.5,
                radius: sizemagnitude(feature.properties.mag),
                weight: 2
            };
        },
        onEachFeature: onEachFeature

    });

    

    //Send our earthquakes layer to the createMap function/
    createMap();
}
function tectoniclayer (tectonic){
    // tectonic = L.polygon(latlngs, { color: 'red' }).addTo(map);
    tectonicPlates=L.geoJSON(tectonic,
        function () {
            return {
                color:"orange", weight:2
        }})
    
    
}

function createMap() {
    var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/satellite-v9",
        accessToken: API_KEY
    });
    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    });



    // Create a baseMaps object.
    var baseMaps = {
        "graymap": graymap,
        "satellitemap": satellitemap,
        "outdoors": outdoors
    };
    console.log(tectonicPlates);
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
        Earthquakes: earthquakes,
        Tectonic: tectonicPlates
    };


    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 8,
        layers: [graymap, earthquakes]
    });


    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);


    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            colors = ["yellow", "magenta", "grey", "teal", "orange", "pink", "red", "purple", "gold", "brown"],
            labels = ["-10 to 10", "10 to 20", "20 to 30", "30 to 40", "40 to 50", "50 to 60", "60 to 70", "70 to 80", "80 to 90", "greater 90"];

        for (var i = 0; i < colors.length; i++) {
            div.innerHTML +=
                '<i style="background:' + (colors[i]) + '"></i> ' + labels[i] + `<br>`

        }

        return div;
    };
    legend.addTo(myMap);

}
