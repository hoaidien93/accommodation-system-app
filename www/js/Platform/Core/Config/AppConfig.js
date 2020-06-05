var h = document.getElementsByTagName("head")[0];
document.addEventListener("deviceready", () => {
    let requireJS = document.createElement("script");
    requireJS.type = "text/javascript";
    requireJS.src = "library/require.js";
    requireJS.async = false;//THIS ATTRIBUTE
    requireJS.onload = () => {
        requirejs.config({
            baseUrl: 'js'
        });
        require(['Platform/Core/Application'], function (Application) {
            var app = new Application(document.querySelector('.app'));
            window.app = app;
            app.Screen = "Home";
            app.Start();
        });
    }
    h.parentNode.appendChild(requireJS);
}, false);
