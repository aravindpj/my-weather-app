const weatherCondition = document.querySelector(".weather-condition");
const countryDetail = document.querySelector(".country-details");
const btn = document.querySelector(".form-btn");
const currentLocationbtn=document.querySelector('.current-location')
//////////////////////////////////////////////////////////////////////////////
const getJSON = async function (url) {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Somethin went wrong !`);

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

const renderError = function (message) {
  alert(message);
};

const clear = function () {
  weatherCondition.innerHTML = "";
  countryDetail.innerHTML = "";
  
};



const renderWeatherData = function (data) {
  const weather = `
    <p class="text1 degree">${(+data.main.temp / 10).toFixed()}°C</p>
    <p class="text1 feel-degree">feels like ${(
      +data.main.feels_like / 10
    ).toFixed()}°C</p>
    <p class="text1  place">${data.name}</p>
    <p class="text1  date-and-time"></p>
    `;

  const countryInfo = `
    <p class="text p">Weather Detail</p>
    <p class="text">${data.sys.country}</p>
    <p class="text p">GB</p>
    <p class="text">humidity</p>
    <p class="text p">${data.main.humidity}%</p>
    <p class="text">wind</p>
    <p class="text p">${data.wind.speed}kmph</p>
    <p class="text">pressure</p>
    <p class="text p">${data.main.pressure}kmph</p>
    `;
  clear();
  setTimeout(() => {
    weatherCondition.style.opacity = 1;
    countryDetail.style.opacity = 1;
    weatherCondition.insertAdjacentHTML("afterbegin", weather);
    countryDetail.insertAdjacentHTML("afterbegin", countryInfo);
  },300);


};

const weatherAPI = async function () {
  try {
    const city = document.querySelector(".form-inp").value;
    if(city=='') return
    const data = await getJSON(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e`
    );
    
    renderWeatherData(data);
  } catch (error) {
    renderError(error.message);
  }
};

btn.addEventListener("click", function (e) {
  e.preventDefault();
  weatherCondition.style.opacity = 0;
  countryDetail.style.opacity = 0;
  weatherAPI();
  document.querySelector('.form-inp').value=''
});

