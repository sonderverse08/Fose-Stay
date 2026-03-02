document.addEventListener('DOMContentLoaded', function() {
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

    const locationInput = document.getElementById('location');
    const dropdown = document.getElementById('location-dropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    if (locationInput) {
        locationInput.addEventListener('focus', () => {
            dropdown.classList.add('show');
        });

        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                locationInput.value = this.textContent.trim();
                dropdown.classList.remove('show');
                e.stopPropagation(); 
            });
        });
    }

    document.addEventListener('click', function(e) {
        if (langDropdown && !langDropdown.contains(e.target)) {
            langList.classList.remove('show');
            langDropdown.classList.remove('active');
        }
        if (locationInput && !locationInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });

    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('click', function() {
            if (typeof this.showPicker === 'function') {
                this.showPicker();
            }
        });
    });

    const searchForm = document.querySelector('.type-form');
    searchForm.addEventListener('submit', function(e) {
        const loc = document.getElementById('location').value;
        if (!loc) {
            alert("Vui lòng chọn địa điểm!");
            e.preventDefault(); 
            return;
        }
        console.log("Form đang được gửi...");
    });
});