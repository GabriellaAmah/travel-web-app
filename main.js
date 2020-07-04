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
let this_week = document.querySelector('#week')

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

})



function getData(){

  selectedCity.textContent = destination.value

  let picUrl = `https://pixabay.com/api/?key=13730652-d9e6835610cb9bb9525b4a5c6&q=${destination.value}&category=travel&image_type=photo&pretty=true`;
 

 async function getPic(){
  let res = await fetch(picUrl);
  let data = await res.json();
  return document.querySelector('.cityImg').src = data.hits[1].largeImageURL;
 }

 getPic()


  let postal = `https://eu1.locationiq.com/v1/search.php?key=cd8f8eb8677331&country=${destination.value}&format=json`;
  async function get_destination(){
   let res = await fetch(postal);
   let data = await res.json();

   console.log(data)
 
   let lat = data[0].lat
   let lon =  data[0].lon
   let weatherbit =  `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&country=${destination.value},NC&key=cb0cb1c78a97487ba286dfdedfcfdb28`;
 
   fetch(weatherbit)
   .then((req) => req.json())
   .then((req_data) => {
    return document.querySelector('.temp').textContent = req_data.data[0].temp
   })
  }
  
  get_destination()

  return (document.querySelector('.card').hidden = true, 
  document.querySelector('.result').hidden = false)
}



submitButton.addEventListener('click', () => {
  if(destination.value == "" && (!today.checked || !this_week.checked)){
      document.querySelector('.errorMessage').hidden = false

      setTimeout(() => document.querySelector('.errorMessage').hidden = true, 2000)
  }else if(!destination.value == "" && today.checked){

    getData();


  }else if(!destination.value == "" && this_week.checked){

    selectedCity.textContent = destination.value;


    let picUrl = `https://pixabay.com/api/?key=13730652-d9e6835610cb9bb9525b4a5c6&q=${destination.value}&category=travel&image_type=photo&pretty=true`;
 

    async function getPic(){
       let res = await fetch(picUrl);
       let data = await res.json();
       return document.querySelector('.cityImg').src = data.hits[1].largeImageURL;
    }

    getPic()

 
    let postal = `https://eu1.locationiq.com/v1/search.php?key=cd8f8eb8677331&country=${destination.value}&format=json`

    async function get_destination(){
      let res = await fetch(postal);
      let data = await res.json();
    
      let lat = data[0].lat
      let lon =  data[0].lon

      let weatherbit =  `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&country=${destination.value},NC&key=cb0cb1c78a97487ba286dfdedfcfdb28`;


      fetch(weatherbit)
      .then((req) => req.json())
      .then((req_data) => {
       return document.querySelector('.temp').textContent = req_data.data[0].temp
      })
     }
     
     get_destination()

     document.querySelector('.card').hidden = true, 
  document.querySelector('.result').hidden = false
  }
})

exit.addEventListener('click', ()=>{
  document.querySelector('.card').hidden = false;
  document.querySelector('.result').hidden = true;
  destination.value = ""
  this_week.checked = false
  today.checked = false
  document.querySelector('.cityImg').src = "";
  document.querySelector('.temp').innerHTML = '<p>0<sup>o</sup>C</p>'
})


console.log(`hello  ${selectedCity.textContent} girl`)
