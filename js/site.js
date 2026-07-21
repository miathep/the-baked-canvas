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
    initializeQuoteModal();
    initializeQuoteForm();

}

loadNavbar();

function initializeMobileMenu() {

    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".menu-overlay");

    if (!hamburger || !mobileMenu || !overlay) return;

    hamburger.addEventListener("click", () => {

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

function initializeQuoteModal() {

    const quoteButtons = document.querySelectorAll(".quote-button");
    const quoteOverlay = document.querySelector(".quote-overlay");
    const closeButton = document.querySelector(".close-quote");

    if (!quoteOverlay || !closeButton || quoteButtons.length === 0) return;

    function openQuoteModal() {

        quoteOverlay.classList.add("active");
        document.body.classList.add("menu-open");

    }

    function closeQuoteModal() {

        quoteOverlay.classList.remove("active");
        document.body.classList.remove("menu-open");

    }

    quoteButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();
            openQuoteModal();

        });

    });

    closeButton.addEventListener("click", closeQuoteModal);

    quoteOverlay.addEventListener("click", (event) => {

        if (event.target === quoteOverlay) {

            closeQuoteModal();

        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeQuoteModal();

        }

    });

}

function initializeQuoteForm() {

    const form = document.getElementById("quote-form");

    if (!form) return;

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = form.querySelector(".submit-quote");

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = new FormData(form);

        try {

            const response = await fetch(
                "https://form-api.mthep97.workers.dev/",
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error("Failed to send.");
            }

            alert("Your quote request has been sent! I'll be in touch soon.");

            form.reset();

            const status = document.getElementById("upload-status");
            if (status) status.textContent = "";

            document.querySelector(".quote-overlay").classList.remove("active");
            document.body.classList.remove("menu-open");

        } catch (error) {

            console.error(error);

            alert("Sorry! Something went wrong. Please try again.");

        }

        submitButton.disabled = false;
        submitButton.textContent = "Request a Quote";

    });

}