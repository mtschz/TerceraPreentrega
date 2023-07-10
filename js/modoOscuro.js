let themeToggleBtn = document.getElementById("theme-toggle")
let modoOscuro = localStorage.getItem("modoOscuro")
function setDarkTheme () {
    document.body.classList.add("dark-theme")
    localStorage.setItem("modoOscuro", true)
}
function disableDarkTheme () {
    document.body.classList.remove("dark-theme")
    localStorage.setItem("modoOscuro", false)
}

if (modoOscuro === "true") {
    setDarkTheme()
    themeToggleBtn.checked = true
}
else {
    disableDarkTheme()
}
themeToggleBtn.addEventListener("change", () => {
    if (themeToggleBtn.checked) {
        setDarkTheme()
    }
    else {
        disableDarkTheme()
    }
})
