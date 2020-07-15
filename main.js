//DOM 

let next = document.querySelector('.next');
let previous = document.querySelector('.previous');
let image = document.querySelector('.image')
let header = document.querySelector('.showCaseText');
let form = document.querySelector('.myform')
let submitButton = document.querySelector('#submit');
let destination = document.querySelector('.destination');
let selectedCity = document.querySelector('.selected-city');
let exit = document.querySelector('.exit');
let today = document.querySelector('#today');
let tomorrow = document.querySelector('#tomorrow');
let this_week = document.querySelector('#current_week');
let next_week = document.querySelector('#next_week')
let date = document.querySelector('#date-input')
let monday = document.querySelector('.monday')
let tuesday = document.querySelector('.tuesday');
let wednesday = document.querySelector('.wednesday');
let thursday = document.querySelector('.thursday');
let friday = document.querySelector('.friday');
let wed_value = document.querySelectorAll('.wed');
let thurs_value = document.querySelectorAll('.thurs');
let fri_value = document.querySelectorAll('.fri');
let sat_value = document.querySelectorAll('.sat');
let sun_value = document.querySelectorAll('.sun');

// an array consiting of images and their headers

let cities = [
    {url : "url('../images/image3.jpg')", h1: 'explore the madives' },
    {url : "url('../images/image4.jpg')", h1: 'experience cairo' },
    {url : "url('../images/image5.jpg')", h1: 'beach bum in morroco' },
    {url : "url('../images/image2.jpg')", h1: 'resurrect your taste buds' },
    {url : "url('../images/image6.jpg')", h1: 'explore the philipines' }
]

// event listeners to handle the button controlling the images

let index = 0;



next.addEventListener('click', function(){
    index++
   if (index === cities.length){
     index = 0
   }

     image.style.backgroundImage =`linear-gradient(rgba(0, 15, 200, 0.5), rgba(68, 74, 160, 0.5)), ${cities[index].url}`, 
     header.textContent = cities[index].h1
})

previous.addEventListener('click', () => {
    if(index === 0){
        index = cities.length
    }

    index--;

    image.style.backgroundImage =`linear-gradient(rgba(0, 15, 200, 0.5), rgba(68, 74, 160, 0.5)), ${cities[index].url}`, 
     header.textContent = cities[index].h1

});

async function fetch_Api(cb){
  selectedCity.textContent = destination.value

  let picUrl = `https://pixabay.com/api/?key=13730652-d9e6835610cb9bb9525b4a5c6&q=${destination.value}&category=travel&image_type=photo&pretty=true`;
 
 

 async function getPic(){
  let res = await fetch(picUrl);
  let data = await res.json();
  console.log(data)
  return (document.querySelector('.cityImg').src = data.hits[1].largeImageURL,
  document.querySelector('.caption').textContent =  data.hits[1].tags)
 }

 getPic();

 let co_ordinates = `https://eu1.locationiq.com/v1/search.php?key=cd8f8eb8677331&country=${destination.value}&format=json`;
 async function get_destination(){
  let res = await fetch(co_ordinates);
  let data = await res.json();

  let lat = data[0].lat
  let lon =  data[0].lon
  let weatherbit =  `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&country=${destination.value},NC&key=cb0cb1c78a97487ba286dfdedfcfdb28`;

  fetch(weatherbit)
  .then((req) => req.json())
  .then((req_data) => {
    cb(req_data)
  })
 }

 get_destination()

 return (document.querySelector('.card').hidden = true, 
  document.querySelector('.result').hidden = false)
}


submitButton.addEventListener('click', () => {
  
  if (destination.value == '' && (!today.checked || !tomorrow.checked || !this_week.checked || !next_week.checked)){
    document.querySelector('.errorMessage').hidden = false

    setTimeout(() => document.querySelector('.errorMessage').hidden = true, 2000)
  }
  else if(destination.value !== "" && today.checked){
    fetch_Api(temperature => {
      return document.querySelector('.temp').textContent = temperature.data[0].temp
    })
  }
  else if(destination.value !== "" && tomorrow.checked){
    fetch_Api(temperature => {
      return document.querySelector('.temp').textContent = temperature.data[1].temp
    })
  }
  else if(destination.value !== "" && this_week.checked){
    document.querySelector('.weather-text').hidden = true
    fetch_Api(temperature => {
      console.log(temperature)
      let dat = new Date();
      let day = dat.getDay()
      console.log(day)
      switch(day){
        case 1:
          monday.hidden = false;
          wed_value[0].textContent = temperature.data[2].temp
          thurs_value[0].textContent = temperature.data[3].temp
          fri_value[0].textContent = temperature.data[4].temp
          sat_value[0].textContent = temperature.data[5].temp
        break;

        case 2:
          tuesday.hidden = false;
          thurs_value[1].textContent = temperature.data[2].temp
          fri_value[1].textContent = temperature.data[3].temp
          sat_value[1].textContent = temperature.data[4].temp
        break;

        case 3: 
          wednesday.hidden = false;
          fri_value[2].textContent = temperature.data[2].temp
          sat_value[2].textContent = temperature.data[3].temp
        break;

        case 4: 
          thursday.hidden = false;
          sat_value.textContent[3] = temperature.data[2].temp
          sun_value.textContent = temperature.data[3].temp
        break;

        default:
          alert('please use the the today or tomorrow options');
      }
    })
  }
  else if(destination.value !== "" && next_week.checked){
    fetch_Api(temperature => {
      let next_week_data = temperature.data.slice(8,15);
    })
  }
});

exit.addEventListener('click', ()=>{
  document.querySelector('.card').hidden = false;
  document.querySelector('.result').hidden = true;
  destination.value = ""
  tomorrow.checked = false
  today.checked = false
  document.querySelector('.cityImg').src = "";
  monday.hidden = true;
  tuesday.hidden = true;
  wednesday.hidden = true;
  thursday.hidden = true
  document.querySelector('.caption').textContent = ""
  document.querySelector('.weather-text').hidden = false;
})

      
