document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const list = dropdown.querySelector('.simple-dropdown-list');
        
        if (!toggle || !list) return;

        // Desktop hover
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 991) {
                // Close all others immediately
                document.querySelectorAll('.simple-dropdown-list').forEach(l => {
                    if (l !== list) l.style.display = 'none';
                });
                list.style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 991) {
                list.style.display = 'none';
            }
        });

        // Mobile click
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const isVisible = list.style.display === 'block';
                // Close others
                document.querySelectorAll('.simple-dropdown-list').forEach(l => l.style.display = 'none');
                
                if (!isVisible) {
                    list.style.display = 'block';
                }
            }
        });
    });
});
