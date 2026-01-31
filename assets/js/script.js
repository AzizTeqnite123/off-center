Fancybox.bind("[data-fancybox]", {
  on: {
    reveal: () => loop.pause(),
    destroy: () => loop.play(),
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const drawer = document.querySelector(".headerLinksMobileDrawer");
  const openBtn = document.querySelector(".menuDrawerOpen");
  const closeBtn = document.querySelector(".menuDrawerClose");
  const overlay = document.querySelector(".mobileDrawrLayer");

  openBtn.addEventListener("click", () => {
    drawer.classList.add("active");
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  });
});


const carousel = document.getElementById('main-carousel');
        const initialItems = Array.from(carousel.querySelectorAll('.slider-item-circle'));
        
        if (initialItems.length > 0 && initialItems.length < 10) {
            const repeatNeeded = Math.ceil(10 / initialItems.length);
            for (let i = 0; i < repeatNeeded; i++) {
                initialItems.forEach(item => {
                    carousel.appendChild(item.cloneNode(true));
                });
            }
        }

        Fancybox.bind("[data-fancybox]", {
            on: { 
                reveal: () => loop.pause(), 
                destroy: () => loop.play() 
            }
        });

        let loop;
        function updateSlider() {
            const allItems = document.querySelectorAll('.slider-item-circle');
            const n = allItems.length;
            const itemWidth = carousel.offsetWidth;
            const gap = 15; 
            const radius = ((itemWidth + gap) * n) / (2 * Math.PI);

            allItems.forEach((item, i) => {
                const angle = (i / n) * 360;
                gsap.set(item, {
                    rotationY: angle,
                    z: radius,
                    transformOrigin: `50% 50% -${radius}px`
                });
            });

            if (loop) loop.kill();
            loop = gsap.to(".slider-carousel-circle", {
                rotationY: 360,
                duration: 20 + (n * 1.5),
                repeat: -1,
                ease: "none"
            });
        }

        updateSlider();
        window.addEventListener('resize', updateSlider);

        const container = document.querySelector('.project-section');
        container.addEventListener('mouseenter', () => loop.pause());
        container.addEventListener('mouseleave', () => {
            if (!document.querySelector('.fancybox__container')) loop.play();
        });