const postAPI = require("API/Post");
let request = this._request;
this.isShowImageView = ko.observable(false);
this.pagingImage = ko.observable({
    current: 0,
    max: 7
});

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

this.showImage = (index) => {
    console.log(index);
    this.isShowImageView(true);
    updateIndexImage(++index);
}
let updateIndexImage = (index) => {
    let desIndex = index;
    if(index <= 1) desIndex = 1;
    if(index >= this.pagingImage().max) desIndex = this.pagingImage().max;
    this.pagingImage().current = desIndex;
    this.pagingImage(this.pagingImage());
}
this.closeImageView = () => {
    this.isShowImageView(false);
}
this.changeIndexImage = (data, event) => {
    let currentIndex = this.pagingImage().current;
    switch (event.detail.direction) {
        case "left":
            updateIndexImage(++currentIndex);
            break;
        case "right":
            updateIndexImage(--currentIndex);
            break;
    }
}