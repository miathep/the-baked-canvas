async function loadNavbar() {
    const response = await fetch('components/navbar.html');

    if (!response.ok) {
        console.error('Failed to load navbar:', response.status);
        return;
    }

    const html = await response.text();
    document.getElementById('navbar').innerHTML = html;
}

loadNavbar();