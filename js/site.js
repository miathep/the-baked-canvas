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

    const formPanel = document.getElementById("quote-form-panel");
    const successPanel = document.getElementById("quote-success-panel");
    const form = document.getElementById("quote-form");

    const uploadStatus = document.getElementById("upload-status");
    const successClose = document.querySelector(".success-close");

    if (!quoteOverlay || !closeButton || quoteButtons.length === 0) return;

    function resetQuoteModal() {

        if (form) {
            form.reset();
        }

        if (uploadStatus) {
            uploadStatus.textContent = "";
        }

        if (formPanel) {
            formPanel.hidden = false;
        }

        if (successPanel) {
            successPanel.hidden = true;
        }

    }

    function openQuoteModal() {

        resetQuoteModal();

        quoteOverlay.classList.add("active");
        document.body.classList.add("menu-open");

    }

    function closeQuoteModal() {

        resetQuoteModal();

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

    if (successClose) {
        successClose.addEventListener("click", closeQuoteModal);
    }

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

    const formPanel = document.getElementById("quote-form-panel");
    const successPanel = document.getElementById("quote-success-panel");

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

            form.reset();

            const status = document.getElementById("upload-status");
            if (status) {
                status.textContent = "";
            }

            // Switch from the form to the success screen
            if (formPanel) {
                formPanel.hidden = true;
            }

            if (successPanel) {
                successPanel.hidden = false;
            }

        } catch (error) {

            alert("Sorry! Something went wrong. Please try again.");

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Request a Quote";

        }

    });

}   