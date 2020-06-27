const postAPI = require("API/Post");
let request = this._request;
this.postDetail = ko.observable({});
console.log(request);
postAPI.getPostDetail(request.id).then((res) => {
    console.log(res);
    this.postDetail(res.data);
}).catch((e)=>{
    console.log(res);
})