const postAPI = require("API/Post");
let request = this._request;
this.postDetail = ko.observable({
    title: "",
    location: "",
    phone: "",
    description: "",
    area: "",
    dateCreate: "",
    price: 0
});
console.log(request);
postAPI.getPostDetail(request.id).then((res) => {
    console.log(res);
    let data = res.data;
    data.dateCreate = new Date(data.created_at).toLocaleDateString();
    this.postDetail(data);
}).catch((e) => {
    console.log(res);
})