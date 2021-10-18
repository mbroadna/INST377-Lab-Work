
var mymap;
var markers;

function mapInit() {
    markers = [];
    mymap = L.map('mapid').setView([38.9, -76.7], 9);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

}

async function windowActions() {
    
    mapInit();
    const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";


    const request = await fetch(endpoint);
    const places = await request.json();

    function findMatches(wordToMatch, places) {
        return places.filter(place => {
            if (wordToMatch == "")
                return false;
                
            const regex = new RegExp(wordToMatch, 'gi');
            // return place.name.match(regex) 
            //         || place.category.match(regex)
            //         || place.address_line_1.match(regex)
            //         || place.city.match(regex)
            //         || place.zip.match(regex);
            return place.zip.match(regex);
        });
    }

    function displayMatches(event) {

        for (var i = 0; i < markers.length; i++) {
            mymap.removeLayer(markers[i]);
        }
        markers = [];

        const matchArray = findMatches(event.target.value, places).filter(match => match["geocoded_column_1"]).slice(0, 5);
        for (var i = 0; i < matchArray.length; i++) {
            console.log(matchArray[i].geocoded_column_1)
            var coords = matchArray[i].geocoded_column_1.coordinates;
            if (i == 0) {
                mymap.flyTo([coords[1], coords[0]], 12);
            }
            
            var mk = L.marker([coords[1], coords[0]]).addTo(mymap);
            markers.push(mk);
        }
        

        const html = matchArray.map(place => {
            return `
                <li class="listelem">
                    <span class="name"><b>${place.name}</b></span><br>
                    <span class="address"><i>${place.address_line_1}</i></span><br>
                    
                </li>
            
            `;
        }).join("");
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector(".search");
    const suggestions = document.querySelector(".suggestions");


    searchInput.addEventListener("change", (evt) => displayMatches(evt));
    searchInput.addEventListener("keyup", (evt) => displayMatches(evt));
}

window.onload = windowActions;


