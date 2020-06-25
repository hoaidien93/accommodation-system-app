const searchAPI = require("API/Search");
const addressAPI = require("API/Address");
const store = require("Store/Store");
this.temp = new Array(10).fill(1);
this.resultSearch = ko.observableArray([]);
let page = 0;
window.temp = this;
this.afterBinding = () => {
    // Set cookies
    cordova.plugins.firebase.messaging.requestPermission({ forceShow: true }).then(function () {
        console.log("You'll get foreground notifications when a push message arrives");
        cordova.plugins.firebase.messaging.subscribe("Test");
    }).catch((e) => {
        console.log(e);
    });

    // Detect scroll end of page
    $(window).on('scroll', function () {
        if ($('.app').height() <= $('html').scrollTop() + $(window).height() + 1) {
            getStartPage(++page);
        }
    })
}

let getStartPage = (page) => {
    store.isShowLoading(true);
    searchAPI.indexPage(page).then((res) => {
        console.log(res);
        this.resultSearch.push(...res.data.hits);
        store.isShowLoading(false);
    }).catch((e) => {
        console.log(e);
        store.isShowLoading(false);
    })
}

getStartPage(page);


$(document).off("changeSearchResult");
$(document).on("changeSearchResult", (event, res) => {
    this.resultSearch(res.data);
})