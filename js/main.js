document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. XỬ LÝ NGÔN NGỮ (LANGUAGE DROPDOWN) ---
    const langDropdown = document.querySelector('.lang-dropdown');
    const langCurrent = document.querySelector('.lang-current');
    const langList = document.querySelector('.lang-list');

    if (langCurrent) {
        langCurrent.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); 
            langList.classList.toggle('show');
            langDropdown.classList.toggle('active');
        });
    }

    // --- 2. XỬ LÝ ĐỊA ĐIỂM (LOCATION DROPDOWN) ---
    const locationInput = document.getElementById('location');
    const dropdown = document.getElementById('location-dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    if (locationInput) {
        // Hiện dropdown khi nhấn vào ô nhập
        locationInput.addEventListener('focus', () => {
            dropdown.classList.add('show');
        });

        // Chọn địa điểm từ danh sách
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                locationInput.value = this.textContent.trim();
                dropdown.classList.remove('show');
                e.stopPropagation(); 
            });
        });
    }

    // --- 3. ĐÓNG CÁC MENU KHI CLICK RA NGOÀI ---
    document.addEventListener('click', function(e) {
        // Đóng dropdown ngôn ngữ
        if (langDropdown && !langDropdown.contains(e.target)) {
            langList.classList.remove('show');
            langDropdown.classList.remove('active');
        }
        // Đóng dropdown địa điểm
        if (locationInput && !locationInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    // --- 4. XỬ LÝ INPUT DATE (MỞ LỊCH NGAY KHI CLICK) ---
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('click', function() {
            if (typeof this.showPicker === 'function') {
                this.showPicker();
            }
        });
    });

    // --- 5. KIỂM TRA SUBMIT FORM ---
    const searchForm = document.querySelector('.type-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const loc = document.getElementById('location').value;
            if (!loc) {
                alert("Vui lòng chọn địa điểm!");
                e.preventDefault(); 
                return;
            }
            console.log("Form đang được gửi...");
        });
    }

    // --- 6. XỬ LÝ SLIDER (SUGGESTION TRACK) ---
    const track = document.querySelector('.suggestion-track');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (track && nextBtn && prevBtn) {
        let isTransitioning = false;

        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;

            const firstItem = track.firstElementChild;
            // Lấy chiều rộng item + khoảng cách margin-right
            const margin = parseInt(window.getComputedStyle(firstItem).marginRight) || 0;
            const itemWidth = firstItem.offsetWidth + margin;

            track.style.transition = "transform 0.5s ease-in-out";
            track.style.transform = `translateX(-${itemWidth}px)`;

            track.addEventListener('transitionend', function handleNext() {
                track.style.transition = "none";
                track.appendChild(track.firstElementChild); // Chuyển phần tử đầu xuống cuối
                track.style.transform = `translateX(0)`;
                isTransitioning = false;
                track.removeEventListener('transitionend', handleNext);
            }, { once: true });
        });

        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;

            const lastItem = track.lastElementChild;
            const margin = parseInt(window.getComputedStyle(lastItem).marginRight) || 0;
            const itemWidth = lastItem.offsetWidth + margin;

            // Di chuyển phần tử cuối lên đầu ngay lập tức nhưng dịch chuyển track để bù đắp
            track.style.transition = "none";
            track.prepend(track.lastElementChild);
            track.style.transform = `translateX(-${itemWidth}px)`;

            // Ép trình duyệt cập nhật lại vị trí (Force reflow)
            track.offsetHeight; 

            track.style.transition = "transform 0.5s ease-in-out";
            track.style.transform = `translateX(0)`;

            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        });
    }
});