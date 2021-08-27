	// Created map and added tiles
    const mymap = L.map('mapid').setView([0, 0], 1);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">osm</a> contributors'
    const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    const tiles = L.tileLayer(tileURL, {attribution});
    tiles.addTo(mymap);

    // Setup custom marker icon
    const issIcon = L.icon({
        iconUrl: 'image/iss.png',
        iconSize: [50, 32],
        iconAnchor: [25, 16],
    });

    const marker = L.marker([0,0], {icon: issIcon}).addTo(mymap);

    const polyline = L.polyline([[0, 0]], {color: 'red'}).addTo(mymap);

    const issAPI_URL = 'https://api.wheretheiss.at/v1/satellites/25544'
    
    // Function fetching data from the web API
    async function getIss(){
        const response = await fetch(issAPI_URL);
        const data = await response.json();
        const {latitude:  Requested_timestamp , longitude:  Tle_timestamp, visibility} = data;
        document.getElementById('lat').textContent =  Requested_timestamp ;
        document.getElementById('lon').textContent =  Tle_timestamp;
        // document.getElementById('vis').textContent = visibility;

        mymap.setView([ Requested_timestamp ,  Tle_timestamp], mymap.getZoom());
        marker.setLatLng([ Requested_timestamp ,  Tle_timestamp]);
        polyline.setLatLngs([[ Requested_timestamp ,  Tle_timestamp]]);

        // Just simple effect. 
        if(visibility=="daylight"){
            document.body.style.backgroundColor = "lightgray";	
        }
        else{
            document.body.style.backgroundColor = "darkgray";
        }
        
    }

    window.setInterval(getIss, 1000);