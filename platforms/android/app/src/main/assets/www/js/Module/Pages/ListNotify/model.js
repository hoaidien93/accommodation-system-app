const userAPI = require("API/UserAPI");
this.temp = ko.observableArray([]);
this.isShowEmpty = ko.observable(false);
userAPI.getMyNotify().then((res) => {
    console.log(res);
    this.temp(res.data.hits.map((e) => {
        if (e.type !== 0) {
            e.imgSrc = `./img/comment-icon.png`;
        } else {
            e.imgSrc = `./img/post-icon.png`;
        }
        return e;
    }));
}).catch((e) => {
    console.log(e);
})
this.temp.subscribe((newValue) => {
    if (newValue.length === 0) {
        this.isShowEmpty(true);
    } else {
        this.isShowEmpty(false);
    }
})


this.directPage = (data, event) => {
    console.log(data);
    app.setPage('PostDetail', { id: data.post_id });
    if (data.read_at == 0) {
        userAPI.readNotify(data.id).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })
    }
}