// Load Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
    "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap";

document.head.appendChild(fontLink);

// Load Navbar
async function loadNavbar() {

    const response = await fetch("navbar.html");

    if (!response.ok) {
        console.error("Navbar failed to load.");
        return;
    }

    const html = await response.text();

    document.getElementById("navbar").innerHTML = html;

    initializeMobileMenu();

}

loadNavbar();

function initializeMobileMenu() {

    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".menu-overlay");

    if (!hamburger || !mobileMenu || !overlay) return;

    hamburger.addEventListener("click", () => {
        console.log("Hamburger clicked!");

        hamburger.classList.toggle("active");

        mobileMenu.classList.toggle("active");

        overlay.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });

    function closeMenu() {

        hamburger.classList.remove("active");

        mobileMenu.classList.remove("active");

        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

    }

}