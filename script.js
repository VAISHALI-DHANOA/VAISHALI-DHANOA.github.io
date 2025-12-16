// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentContainer = document.getElementById('tab-content-container');

    const setActiveButton = (activeTab) => {
        tabButtons.forEach(btn => {
            const isActive = btn.getAttribute('data-tab') === activeTab;
            btn.classList.toggle('active', isActive);
        });
    };

    // Load tab content from its external HTML file
    const loadTab = async (tab) => {
        const button = document.querySelector(`.tab-button[data-tab="${tab}"]`);
        const src = button ? button.getAttribute('data-src') : null;
        if (!src || !contentContainer) {
            return;
        }

        try {
            const response = await fetch(src);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${src}`);
            }

            const html = await response.text();
            contentContainer.innerHTML = html;

            const firstSection = contentContainer.firstElementChild;
            if (firstSection && firstSection.classList) {
                firstSection.classList.add('active');
            }

            localStorage.setItem('activeTab', tab);
        } catch (error) {
            contentContainer.innerHTML = '<div class="tab-content error"><p>Unable to load this section right now.</p></div>';
            console.error('Tab load failed:', error);
        }
    };

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            if (!targetTab) {
                return;
            }

            setActiveButton(targetTab);
            loadTab(targetTab);
        });

        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' && index < tabButtons.length - 1) {
                e.preventDefault();
                tabButtons[index + 1].click();
                tabButtons[index + 1].focus();
            } else if (e.key === 'ArrowLeft' && index > 0) {
                e.preventDefault();
                tabButtons[index - 1].click();
                tabButtons[index - 1].focus();
            }
        });
    });

    const savedTab = localStorage.getItem('activeTab');
    const validTabs = ['cv', 'projects', 'publications', 'research', 'contact'];
    const tabToOpen = savedTab && validTabs.includes(savedTab) ? savedTab : 'cv';

    setActiveButton(tabToOpen);
    loadTab(tabToOpen);

    document.getElementById('year').textContent = new Date().getFullYear();
});
