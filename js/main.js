document.addEventListener('DOMContentLoaded', function() {
    // --- 1. DROPDOWN ĐỊA ĐIỂM ---
    const locationInput = document.getElementById('location');
    const locationDropdown = document.getElementById('location-dropdown');
    if (locationInput) {
        locationInput.addEventListener('focus', () => locationDropdown.classList.add('show'));
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                locationInput.value = this.textContent.trim();
                locationDropdown.classList.remove('show');
                e.stopPropagation();
            });
        });
    }

    // --- 2. XỬ LÝ DATE PICKER (HIỆN LỊCH NGAY) ---
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('click', function() {
            if (this.showPicker) this.showPicker(); // Tự động mở bảng lịch
        });
    });

    // --- 3. XỬ LÝ SLIDER TRÁI/PHẢI ---
    const track = document.querySelector('.suggestion-track');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (track && nextBtn && prevBtn) {
        let isTransitioning = false;
        const move = (direction) => {
            if (isTransitioning) return;
            isTransitioning = true;
            const item = track.firstElementChild;
            const width = item.offsetWidth + parseInt(window.getComputedStyle(item).marginRight);

            if (direction === 'next') {
                track.style.transition = "transform 0.5s ease-in-out";
                track.style.transform = `translateX(-${width}px)`;
                track.addEventListener('transitionend', () => {
                    track.style.transition = "none";
                    track.appendChild(track.firstElementChild);
                    track.style.transform = `translateX(0)`;
                    isTransitioning = false;
                }, { once: true });
            } else {
                track.style.transition = "none";
                track.prepend(track.lastElementChild);
                track.style.transform = `translateX(-${width}px)`;
                track.offsetHeight; // force reflow
                track.style.transition = "transform 0.5s ease-in-out";
                track.style.transform = `translateX(0)`;
                setTimeout(() => { isTransitioning = false; }, 500);
            }
        };
        nextBtn.onclick = () => move('next');
        prevBtn.onclick = () => move('prev');
    }

    // --- 4. ĐÓNG MENU KHI CLICK NGOÀI ---
    document.addEventListener('click', (e) => {
        if (locationInput && !locationInput.contains(e.target) && !locationDropdown.contains(e.target)) {
            locationDropdown.classList.remove('show');
        }
    });
});