async function loadComponent(id, path, scriptPath) {
    const container = document.getElementById(id);
    const html = await fetch(path).then(res => res.text());
    container.innerHTML = html;
    if (scriptPath) {
        const script = document.createElement("script");
        script.src = scriptPath;
        document.body.appendChild(script);
    }
}

loadComponent("sidebar-container", "../components/sidebar/sidebar.html", "../components/sidebar/sidebar.js");
loadComponent("profile-container", "../components/profile-dropdown/profile-dropdown.html", "../components/profile-dropdown/profile-dropdown.js");
loadComponent("topbar-container", "../components/topbar/topbar.html", );
loadComponent("homelink-container", "../components/home-link/website-home-link.html", );
loadComponent("hamburger-container", "../components/hamburger-menu/hamburger-button.html", );