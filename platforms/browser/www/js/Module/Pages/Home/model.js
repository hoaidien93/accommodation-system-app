const searchAPI = require("API/Search");
const addressAPI = require("API/Address");
const store = require("Store/Store");
const PAGE_SIZE = 10;
let dataChangePage = this._request.data;

this.temp = new Array(10).fill(1);
this.resultSearch = ko.observableArray([]);
let page = 0;
let size = 2;

this.afterBinding = () => {
    cordova.plugins.firebase.messaging.requestPermission({ forceShow: true }).then(function () {
        console.log("You'll get foreground notifications when a push message arrives");
        cordova.plugins.firebase.messaging.subscribe("Test");
    }).catch((e) => {
    });

    $(window).off('scroll');
    // Detect scroll end of page
    $(window).on('scroll', function () {
        if ($('.app').height() <= $('html').scrollTop() + $(window).height() + 1) {
            if (page < size) {
                getStartPage();
            }
        }
    })
}

let getStartPage = () => {
    store.isShowLoading(true);
    searchAPI.indexPage(page++).then((res) => {
        size = Math.ceil(res.data.total / PAGE_SIZE);
        this.resultSearch.push(...res.data.hits);
        store.isShowLoading(false);
    }).catch((e) => {
        console.log(e);
        store.isShowLoading(false);
    })
}

if (dataChangePage) {
    this.resultSearch(dataChangePage);
} else {
    getStartPage(page);
}

$(document).off("changeSearchResult");
$(document).on("changeSearchResult", (event, res) => {
    this.resultSearch(res.data);
})