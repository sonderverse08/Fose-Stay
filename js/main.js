const locationInput = document.getElementById('location');
const dropdown = document.getElementById('location-dropdown');

locationInput.addEventListener('focus', () => {
    dropdown.classList.add('show');
});

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
        locationInput.value = item.textContent.trim();
        dropdown.classList.remove('show');
    });
});

document.addEventListener('click', (e) => {
    if (!locationInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});


// -------------------------------------------------------------
const track = document.querySelector('.suggestion-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let isTransitioning = false; 

nextBtn.addEventListener('click', () => {
    if (isTransitioning) return; 
    isTransitioning = true;

    const itemWidth = document.querySelector('.suggestion-item').offsetWidth + 20; 

    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${itemWidth}px)`;

    setTimeout(() => {
        track.style.transition = "none"; 
        track.appendChild(track.firstElementChild); 
        track.style.transform = `translateX(0)`; 
        isTransitioning = false;
    }, 500); 
});

prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;

    const itemWidth = document.querySelector('.suggestion-item').offsetWidth + 20;

    track.style.transition = "none";
    track.prepend(track.lastElementChild);
    

    track.style.transform = `translateX(-${itemWidth}px) `;

    setTimeout(() => {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(0)`;
        setTimeout(() => { isTransitioning = false; }, 500);
    }, 10);
});