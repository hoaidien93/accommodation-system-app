this.afterBinding = () => {
    if (cordova.platformId === "browser") {
        document.getElementById("signInAndroid").style.display = "none";
    }
    if (cordova.platformId === "android") {
        document.getElementById("signInBrowser").style.display = "none";
    }
}