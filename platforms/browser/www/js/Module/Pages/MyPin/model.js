const postAPI = require("API/Post");
this.listMyPin = ko.observableArray([]);
postAPI.getMyPin().then((res) => {
    console.log(res);
    this.listMyPin.push(...res.data.hits);
}).catch((e) => {
    console.log(e);
})