// Load Google Fonts
const googleFonts = document.createElement("link");
googleFonts.rel = "preconnect";
googleFonts.href = "https://fonts.googleapis.com";
document.head.appendChild(googleFonts);

const googleFontsStatic = document.createElement("link");
googleFontsStatic.rel = "preconnect";
googleFontsStatic.href = "https://fonts.gstatic.com";
googleFontsStatic.crossOrigin = "anonymous";
document.head.appendChild(googleFontsStatic);

const fontStylesheet = document.createElement("link");
fontStylesheet.rel = "stylesheet";
fontStylesheet.href =
    "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap";
document.head.appendChild(fontStylesheet);

// Load Navbar
async function loadNavbar() {
    try {
        const response = await fetch("navbar.html");

        if (!response.ok) {
            throw new Error(`Failed to load navbar (${response.status})`);
        }

        const html = await response.text();
        document.getElementById("navbar").innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

loadNavbar();