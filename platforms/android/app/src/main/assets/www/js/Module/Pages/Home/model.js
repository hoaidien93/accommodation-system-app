const searchAPI = require("API/Search");
const addressAPI = require("API/Address");
const postAPI = require("API/Post");
const store = require("Store/Store");
const PAGE_SIZE = 10;
let dataChangePage = this._request.data;
this.listPinID = ko.observableArray([]);
this.temp = new Array(10).fill(1);
this.resultSearch = ko.observableArray([]);
let page = 0;
let size = 2;
let me = this;
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
    console.log(1);
    searchAPI.indexPage(page++).then((res) => {
        size = Math.ceil(res.data.total / PAGE_SIZE);
        this.resultSearch.push(...res.data.hits.map((e) => { return Object.assign(e, { pinned: ko.observable(false) }) }));
        store.isShowLoading(false);
    }).catch((e) => {
        console.log(e);
        store.isShowLoading(false);
    })
}

this.resultWithPin = ko.pureComputed(() => {
    let result = this.resultSearch();
    result.forEach((e) => {
        if (this.listPinID.indexOf(e.id) > -1) {
            e.pinned(true);
        }
        else e.pinned(false);
    })
    return result;
});
if (dataChangePage) {
    this.resultSearch(dataChangePage.map((e) => { return Object.assign(e, { pinned: ko.observable(false) }) }));
} else {
    getStartPage();
}

$(document).off("changeSearchResult");
$(document).on("changeSearchResult", (event, res) => {
    this.resultSearch(res.data.map((e) => { return Object.assign(e, { pinned: ko.observable(false) }) }));
})

this.addFavorite = (data, event) => {
    console.log(data);
    if (data.pinned()) {
        postAPI.unpin(data.id).then((res) => {
            data.pinned(false);
        }).catch((e) => console.log(e));
    }
    else {
        event.currentTarget.getElementsByTagName('path')[0].setAttribute("fill", "red");
        postAPI.pin(data.id).then((res) => {
            if (!res.code) {
                app.setPage("MyPin");
            }
        }).catch((e) => console.log(e));
    }
}

(function () {
    postAPI.getMyPin().then((res) => {
        me.listPinID(res.data.hits.map((e) => { return e.id }));
    }).catch((e) => {
        console.log(e);
    })
})();
