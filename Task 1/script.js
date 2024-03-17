document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.fade-in');
    const navigationLinks = document.querySelectorAll('nav a');

    function fadeIn() {
        sections.forEach(section => {
            const position = section.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (position < screenHeight * 0.75) {
                section.classList.add('active');
            }
        });
    }

    function highlightNavigation() {
        let index = 0;

        sections.forEach((section, i) => {
            const position = section.getBoundingClientRect().top;

            if (position < window.innerHeight * 0.5) {
                index = i;
            }
        });

        navigationLinks.forEach(link => link.classList.remove('active'));
        navigationLinks[index].classList.add('active');
    }

    window.addEventListener('scroll', () => {
        fadeIn();
        highlightNavigation();
    });

    window.addEventListener('resize', () => {
        fadeIn();
        highlightNavigation();
    });

    fadeIn(); // Initial check on page load
    highlightNavigation(); // Initial highlight on page load
});
