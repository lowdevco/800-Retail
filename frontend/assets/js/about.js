document.addEventListener('DOMContentLoaded', () => {
    const chapters = document.querySelectorAll('.story-chapter');
    const images = document.querySelectorAll('.sticky-image');
    const section = document.getElementById('story-section');

    if (!chapters.length || !images.length) return;

    // Set up Intersection Observer for the scrolling text blocks
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when chapter is exactly in the middle of the screen
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetIndex = entry.target.getAttribute('data-index');
                
                // Update images
                images.forEach(img => {
                    if (img.getAttribute('data-index') === targetIndex) {
                        img.classList.remove('opacity-0');
                        img.classList.add('opacity-100');
                    } else {
                        img.classList.remove('opacity-100');
                        img.classList.add('opacity-0');
                    }
                });

                // Update Background and Text Color based on chapter
                if (targetIndex === '2') {
                    section.classList.remove('bg-white', 'text-zinc-900');
                    section.classList.add('bg-zinc-950', 'text-white');
                } else {
                    section.classList.remove('bg-zinc-950', 'text-white');
                    section.classList.add('bg-white', 'text-zinc-900');
                }
            }
        });
    }, observerOptions);

    chapters.forEach(chapter => {
        observer.observe(chapter);
    });
});
