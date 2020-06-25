const addressAPI = require("API/Address");
const store = require("Store/Store");
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
    console.log(this.listDistrict());
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
    addressAPI.createPost({
        "area": this.area(),
        "description": this.title(),
        "district_id": this.selectedDistrict(),
        "location": this.location(),
        "price": this.price(),
        "room_type_id": this.selectedRoomType(),
        "ward_id": this.selectedWard()
    }).then((res) => {
        store.isShowLoading(false);
        //Hiện Popup
        app.setPage("MyRoom");
        console.log(res);
    }).catch((e) => {
        console.log(e);
    })
}