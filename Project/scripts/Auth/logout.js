document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
        // Remove username and password cookie
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00; path=/";
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00; path=/";

        // Redirect to login page
        window.location.href = "login.html";
    });
});