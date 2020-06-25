define(["API/Address","Store/Store"],()=>({viewModel:function(){const addressAPI=require("API/Address"),store=require("Store/Store");this.title=ko.observable(""),this.listDistrict=ko.observableArray([]),this.selectedDistrict=ko.observable({}),this.listWards=ko.observable({}),this.selectedWard=ko.observable({}),this.listRoomTypes=ko.observableArray([]),this.selectedRoomType=ko.observable({}),this.price=ko.observable(0),this.area=ko.observable(0),this.location=ko.observable(""),this.selectedDistrict.subscribe(e=>{e&&addressAPI.getWards(e).then(res=>{this.listWards(res.data)}).catch(e=>{console.log(e)})}),this.selectedWard.subscribe(e=>console.log(e)),addressAPI.getDistricts().then(res=>{this.listDistrict(res.data),console.log(this.listDistrict())}).catch(e=>{console.log(e)}),addressAPI.getRoomTypes().then(res=>{this.listRoomTypes(res.data)}).catch(e=>{console.log(e)}),this.publish=(()=>{store.isShowLoading(!0),addressAPI.createPost({area:this.area(),description:this.title(),district_id:this.selectedDistrict(),location:this.location(),price:this.price(),room_type_id:this.selectedRoomType(),ward_id:this.selectedWard()}).then(res=>{store.isShowLoading(!1),app.setPage("MyRoom"),console.log(res)}).catch(e=>{console.log(e)})})},template:'\n            <div id="post-page">\n    <com-slider></com-slider>\n    <com-headercontext></com-headercontext>\n    <div class="body-content">\n        <h3 class="header-title">Thêm bài đăng</h3>\n        <div class="content-wrapper">\n            <div class="row">\n                <div class="title">Tiêu đề</div>\n                <div class="content">\n                    <input type="text" id="title" placeholder="Tiêu đề bài đăng" data-bind="textInput: title">\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Quận</div>\n                <div class="content">\n                    <select name="district" data-bind="\n                            options: listDistrict,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedDistrict\n                            ">\n\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Phường</div>\n                <div class="content">\n                    <select name="ward" data-bind="\n                            options: listWards,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedWard\n                    ">\n\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Đường</div>\n                <div class="content">\n                    <textarea data-bind="textInput: location"></textarea>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Loại phòng</div>\n                <div class="content">\n                    <select name="typeRoom" data-bind="\n                            options: listRoomTypes,\n                            optionsText: function(item){return item.name},\n                            optionsValue: function(item){return item.id},\n                            value: selectedRoomType\n                    ">\n                    </select>\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Diện tích</div>\n                <div class="content">\n                    <input type="text" id="title" placeholder="Đơn vị (m²)" name="area" data-bind="textInput: area">\n                </div>\n            </div>\n            <div class="row">\n                <div class="title">Giá tiền</div>\n                <div class="content">\n                    <input type="text" id="title" placeholder="Đơn vị (VNĐ)" data-bind="textInput: price">\n                </div>\n            </div>\n        </div>\n        <div class="btn-wrapper">\n            <button class="btn-submit" data-bind="event: {tap: publish}">Đăng bài</button>\n        </div>\n    </div>\n</div>\n        '}));