// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content sections
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and content sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Store the active tab in localStorage for persistence
            localStorage.setItem('activeTab', targetTab);
        });
    });

    // Restore previously active tab from localStorage
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        const savedButton = document.querySelector(`[data-tab="${savedTab}"]`);
        if (savedButton) {
            savedButton.click();
        }
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.tab-button.active');
        const buttons = Array.from(tabButtons);
        const currentIndex = buttons.indexOf(activeButton);

        if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
            buttons[currentIndex + 1].click();
            buttons[currentIndex + 1].focus();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            buttons[currentIndex - 1].click();
            buttons[currentIndex - 1].focus();
        }
    });
});
