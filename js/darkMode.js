
let darkMode;

if (localStorage.getItem("blackMode")) {
    darkMode = localStorage.getItem("blackMode");
} else {
    darkMode = "light";
}


localStorage.setItem("blackMode", darkMode);



$( () => {
    if (localStorage.getItem("blackMode") == 'dark') {
        $("body").addClass("blackMode");
        $("#btnDarkMode").hide();
        $("#btnLightMode").show();
    } else {
        $("#btnLightMode").hide();
    }

    $("#btnLightMode").click( () => {
        $("#btnLightMode").hide();
        $("#btnDarkMode").show();


        $("#navbar-toggle").removeClass("navbar-dark bg-dark");
        $("#navbar-toggle").addClass("navbar-light bg-light");
        
        $("#mostrar-creditos").removeClass("table-dark");
        $("#mostrar-creditos").addClass("table-light");


        $("body").removeClass("blackMode");
        localStorage.setItem("blackMode", "light")
    })


    $("#btnDarkMode").click( () => {
        $("#btnLightMode").show();
        $("#btnDarkMode").hide();

        $("#navbar-toggle").removeClass("navbar-light bg-light");
        $("#navbar-toggle").addClass("navbar-dark bg-dark");
        
        $("#mostrar-creditos").removeClass("table-light");
        $("#mostrar-creditos").addClass("table-dark");
        
        $("body").addClass("blackMode");
        localStorage.setItem("blackMode", "dark")
    })
})
