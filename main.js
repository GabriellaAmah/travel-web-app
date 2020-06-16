let cities = [
    {url : "url('../images/image3.jpg')", h1: 'explore the madives' },
    {url : "url('../images/image4.jpg')", h1: 'experience cairo' },
    {url : "url('../images/image5.jpg')", h1: 'beach bum in morroco' },
    {url : "url('../images/image2.jpg')", h1: 'resurrect your taste buds' },
    {url : "url('../images/image6.jpg')", h1: 'explore the philipines' }
]

let next = document.querySelector('.next');
let previous = document.querySelector('.previous');
let image = document.querySelector('.image')
let header = document.querySelector('.showCaseText')

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

