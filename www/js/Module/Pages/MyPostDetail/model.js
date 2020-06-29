const addressAPI = require("API/Address");
const store = require("Store/Store");
const postAPI = require("API/Post");
let request = this._request;
this.title = ko.observable(request.title || "");
this.listDistrict = ko.observableArray([]);
this.selectedDistrict = ko.observable({});
this.listWards = ko.observable({});
this.selectedWard = ko.observable({});
this.listRoomTypes = ko.observableArray([]);
this.selectedRoomType = ko.observable({});
this.price = ko.observable(0);
this.area = ko.observable(0);
this.location = ko.observable(request.location || "");
this.selectedDistrict.subscribe((e) => {
    if (e) {
        addressAPI
            .getWards(e)
            .then((res) => {
                this.listWards(res.data);
            })
            .catch((e) => { console.log(e) });
    }
})
this.selectedWard.subscribe((e) => console.log(e));
addressAPI.getDistricts().then((res) => {
    this.listDistrict(res.data);
}).catch((e) => {
    console.log(e);
})
addressAPI.getRoomTypes().then((res) => {
    this.listRoomTypes(res.data);
}).catch((e) => {
    console.log(e);
});

this.update = () => {
    
    store.isShowLoading(true);
    let formData = new FormData();
    formData.append('post_id', '3ff2f68a-d398-4998-8ef1-36d45b092160');
    let files = $('input[type=file]')[0].files;
    for (let i = 0; i < files.length; i++) {
        formData.append("files[]", files[i]);
    }
    window.formData = formData;
    postAPI.updateImage(formData).then((res) => {
        console.log(res)
    }).catch((e) => {
        console.log(e);
    })
}