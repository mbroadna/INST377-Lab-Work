

async function windowActions() {
    
    const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";


    const request = await fetch(endpoint);
    const places = await request.json();

    function findMatches(wordToMatch, places) {
        return places.filter(place => {
            if (wordToMatch == "")
                return false;
                
            const regex = new RegExp(wordToMatch, 'gi');
            return place.name.match(regex) 
                    || place.category.match(regex)
                    || place.address_line_1.match(regex)
                    || place.city.match(regex)
                    || place.zip.match(regex);
        });
    }

    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, places);
        const html = matchArray.map(place => {
            return `
                <li>
                    <span class="name">${place.name}<span><br>
                    <span class="category">${place.category}<span><br>
                    <span class="address">${place.address_line_1}<span><br>
                    <span class="city">${place.city}<span><br>
                    <span class="zip">${place.zip}<span>
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


