const input = document.getElementById("country-input");
const button = document.getElementById("search-btn");

const spinner = document.getElementById("loading-spinner");
const countryInfo = document.getElementById("country-info");
const borderingCountries = document.getElementById("bordering-countries");
const errorMessage = document.getElementById("error-message");

async function searchCountry(countryName){

try{

spinner.classList.remove("hidden");

errorMessage.classList.add("hidden");
countryInfo.classList.add("hidden");
borderingCountries.classList.add("hidden");

countryInfo.innerHTML="";
borderingCountries.innerHTML="";

const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

if(!response.ok){
throw new Error("Country not found");
}

const data = await response.json();

const country = data[0];

countryInfo.innerHTML = `

<h2>${country.name.common}</h2>

<p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>

<p><strong>Population:</strong> ${country.population.toLocaleString()}</p>

<p><strong>Region:</strong> ${country.region}</p>

<img src="${country.flags.svg}" alt="${country.name.common} flag">

`;

countryInfo.classList.remove("hidden");


if(country.borders){

for(const code of country.borders){

const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

const borderData = await borderResponse.json();

const border = borderData[0];

const borderCard = document.createElement("div");

borderCard.classList.add("border-country");

borderCard.innerHTML = `

<p>${border.name.common}</p>

<img src="${border.flags.svg}" alt="${border.name.common} flag">

`;

borderingCountries.appendChild(borderCard);

}

borderingCountries.classList.remove("hidden");

}else{

borderingCountries.innerHTML="<p>No bordering countries</p>";

borderingCountries.classList.remove("hidden");

}

}catch(error){

errorMessage.textContent="Country not found. Please try again.";

errorMessage.classList.remove("hidden");

}finally{

spinner.classList.add("hidden");

}

}


button.addEventListener("click", () =>{

const countryName = input.value.trim();

if(countryName !== ""){
searchCountry(countryName);
}

});


input.addEventListener("keydown", (event)=>{

if(event.key === "Enter"){

const countryName = input.value.trim();

if(countryName !== ""){
searchCountry(countryName);
}

}

});
