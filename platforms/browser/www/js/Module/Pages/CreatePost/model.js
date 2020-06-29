const addressAPI = require("API/Address");
const store = require("Store/Store");
const postAPI = require("API/Post");

this.title = ko.observable("");
this.listDistrict = ko.observableArray([]);
this.selectedDistrict = ko.observable({});
this.listWards = ko.observable({});
this.selectedWard = ko.observable({});
this.listRoomTypes = ko.observableArray([]);
this.selectedRoomType = ko.observable({});
this.price = ko.observable(0);
this.area = ko.observable(0);
this.location = ko.observable("");
this.description = ko.observable("");
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

this.publish = () => {
    store.isShowLoading(true);
    let formData = new FormData($('#form-post')[0]);
    /*
    let listFiles = $('input[type=file]')[0].files;
    for (let i = 0; i < listFiles.length; i++) {
        formData.append(`files[${i}]`, listFiles[i]);
    }
    formData.append('area', this.area());
    formData.append('description', this.description());
    formData.append('title', this.title());
    formData.append('district_id', this.selectedDistrict());
    formData.append('location', this.location());
    formData.append('price', this.price());
    formData.append('room_type_id', this.selectedRoomType());
    formData.append('ward_id', this.selectedWard());
*/
    console.log(formData);
    postAPI.createPost(formData).then((res) => {
        console.log(res);
        store.isShowLoading(false);
        //Hiện Popup
        app.setPage("MyRoom");
    }).catch((e) => {
        console.log(e);
    })
}