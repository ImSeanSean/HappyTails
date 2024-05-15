//Slider
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", fetchData);


function initializeSlider(){

    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide")
        intervalId = setInterval(nextSlide, 5000);
    }
}
function showslide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}
function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showslide(slideIndex);
}
function nextSlide(){
    clearInterval(intervalId);  
    slideIndex++;
    showslide(slideIndex);
}
//Navigation
function goBack(){
    window.location.href = "../adopt.html"
}
function navigateToPaws() {
    if (pawLink) {
        window.open(pawLink, '_blank');
    }
}
//Fetch Data
function getParameter(pet){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(pet);
}
function fetchData(){
    //Get Name
    const petName = getParameter('pet');
    //Get JSON
    fetch('../paws.json')
        .then(response => response.json())
        .then(pets => {
            const pet = pets.find(p => p.name.toLowerCase() === petName.toLowerCase());

            if (pet) {
                document.getElementById('pet-name').textContent = pet.name;
                document.getElementById('pet-details').innerHTML = `
                    <li><b>Age:</b> ${pet.age}</li>
                    <li><b>Sex:</b> ${pet.sex}</li>
                `;
                document.getElementById('pet-description').textContent = pet.description;

                const slideFunction = document.getElementById('slides');
                slideFunction.innerHTML = ``;
                pet.slides.forEach((image) => {
                    slideFunction.innerHTML += `<img src="${image}" class="slide" alt="Picture of ${pet.name}">`
                })

                slides = document.querySelectorAll(".slides img");
                pawLink = pet.paws;
                initializeSlider();
            }
        })
        .catch(error => console.error('Error fetching adoption data:', error));
}