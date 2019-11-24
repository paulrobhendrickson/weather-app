function initProgram() {
    const inputEl = document.getElementById("inputEl");
    const submitButtonEl = document.getElementById("submitBtn")
    const searchHistoryEL = document.getElementById("searchHistory")
    const mainSectionEl = document.getElementById("mainSection")
    let previousSearches;

    let cityName;
    let informationGathered;


    //Retrieves previous searches from local storage 
    //references function updateSearchHistory
    function renderStart() {
        previousSearches = JSON.parse(localStorage.getItem('previousSearches'))
        updateSearchHistory();
    }

    function runProgram(){
        saveInformation();
        updateSearchHistory();
        getInfo();
    }
    //Adds event listener to submit button 
    // references the following functions: saveInformation, updateSearchHistory, and getInfo
    submitButtonEl.addEventListener("click", function () {
        event.preventDefault();
        cityName = inputEl.value;
        runProgram();
    })

    //Checks the previousSearches array, removes any duplicates, 
    // will stop the array from getting to be more than 10 indexes long
    // saves information to local storage.
    function saveInformation() {
        const duplicateSearch = previousSearches.indexOf(cityName);
        if (duplicateSearch !== -1) {
            previousSearches.splice(duplicateSearch, 1);
        }

        if (previousSearches.length > 10) {
            previousSearches.splice(-11, 1);
        }
        previousSearches.push(cityName);
        localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
        // getInfo();
    }

    //erases previous search history list items
    //checks to see if there is anything in history
    //if there is nothing it turns it into an array
    //if there is not nothing it prepends the items to display on the page
    function updateSearchHistory() {
        ;
        searchHistoryEL.innerHTML = "";
        if (previousSearches !== null) {
            for (let i = 0; i < previousSearches.length; i++)
                $('#searchHistory').prepend(`
            <li class="previous-searches">
            `+ previousSearches[i] + `
            </li>
            `
                )
        } else {
            previousSearches = [];
        }
        handlePreviousSearchesClick();
    }

    //takes the value of the temperature in kelvins and returns in Fahrenheit
    function getFahrenheit(k) {
        return Math.floor((k - 273.15) * 1.8000 + 32.00);
    }

    //gets information from weather API
    //saves that information to informationGathered variable
    //runs renderWeather function
    function getInfo() {
        const apiKey = "&appid=201eb0ee5ccf4e9d19410ecb6a7d9eba"
        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="
        axios.get(queryURL + cityName + apiKey)
            .then(function (response) {
                informationGathered = response.data;
                renderWeather();
                if (informationGathered === undefined) {
                    alert("Failed to find city.")
                }
            }
            )
    }

    //erases what was previously in the main section 
    //renders the new information for the main section
    function renderWeather() {

        mainSectionEl.innerHTML = ` <div class="row forecast-boxes" id="weatherForecast"> </div>`;


        $('#mainSection').prepend(`
            <div class="row today-weather ` + informationGathered.list[4].weather[0].main + `">
               <div class="col">
                   <h2>
                    ` + informationGathered.city.name + ` <span class="indent"> ` + informationGathered.list[0].dt_txt.slice(5, 10) + ` </span>
                   </h2>
                   <ul>
                     <li id="uvIndex">
                           Conditions: `+ informationGathered.list[4].weather[0].main + `
                     </li>
                       <li id="temperature">
                           Temperature: `+ getFahrenheit(informationGathered.list[4].main.temp) + ` ℉
                       </li>
                       <li id="humidity">
                           Humidity: `+ informationGathered.list[4].main.humidity + `
                       </li>
                       <li id="windSpeed">
                           Wind Speed: `+ informationGathered.list[4].wind.speed + `
                       </li>
                   </ul>
                </div>
            </div>
               
            <div class="row forecast-words">
               <div class="col">
                    <h3>
                        5-Day Forecast:
                    </h3>
               </div>
           </div>`
        )

        for (let i = 0; i < 5; i++) {

            $('#weatherForecast').append(`
            <div class="col weather-card `+ informationGathered.list[i * 8 + 4].weather[0].main + `">
                <h4>
                `+ informationGathered.list[i * 8 + 4].dt_txt.slice(5, 10) + `
                </h4>
                <p>
                `+ informationGathered.list[i * 8 + 4].weather[0].main + `
                </p>
                <p>
                `+ getFahrenheit(informationGathered.list[i * 8 + 4].main.temp) + ` ℉
                </p>
                <p>
                Humidity: `+ informationGathered.list[i * 8 + 4].main.humidity + `
                </p>
             </div>
             `
            )
        }

    }

    //adds event listeners to the previous seaches
    function handlePreviousSearchesClick() {
        const previousSearchEls = document.querySelectorAll(".previous-searches")
        for (let i = 0; i < previousSearchEls.length; i++) {
            const SearchEl = previousSearchEls[i];
            console.log(SearchEl.innerText);
            SearchEl.addEventListener("click", function () {
                cityName = SearchEl.innerText;
                runProgram();
            }
            )
        }
    }

    renderStart();
} initProgram();













//<button data-searchterm="arnold schwarzenegger">

// const searchTerm = 

// const inputEl = document.getElementById("search");
// const result = inputEl.value
// console.log(result)

// searchButtonEl = document.getElementById("search-button");
// clearButtonEl = document.getElementById("clear-button");
// searchButtonEl.addEventListener("click", function (event) {
//     event.preventDefault();
//     const inputEl = document.getElementById("search");
//     const userInput = inputEl.value
//     const queryURL = "https://pokeapi.co/api/v2/pokemon/" + userInput;
//     let informationGathered;










//     function getInfo() {
//         axios.get(queryURL)
//             .then(function (response) {
//                 // const person = this.getAttribute("data-person");  
//                 // const results = response.data.data;=
//                 informationGathered = response.data.abilities;
//                 console.log(informationGathered)
//                 printInformation();
//             }
//          )

//     }












//     function printInformation() {
//         for (let i = 0; informationGathered.length; i++) {
//             $('#topArticles').append(`
//             <li class="section-articles">
//                 <span id ="resultTitle">
//                 `+ informationGathered[i].ability.name + `
//                 </span>
//                 <h3 id ="resultAuthor">
//                 `+ informationGathered[i].is_hidden + `
//                 </h3 id ="resultSection">
//                 <h3>
//                 `+ informationGathered[i].slot + `
//                 </h3>
//                 <h3 id ="resultDate">
//             I don't care
//                 </h3>
//                     <a href="https://google.com" id ="resultURL">google.com</a>
//                  </li>
//             `);
//         }
//     }

//     getInfo();
// })
// clearButtonEl.addEventListener("click", function (event) {
//     event.preventDefault();
//     console.log("You hit the clear button! I'm so proud of you.")
// })







