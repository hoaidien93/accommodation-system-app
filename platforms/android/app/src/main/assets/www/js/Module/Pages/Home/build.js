define(["Store/Store","API/Search","API/Address","API/Post"],()=>({viewModel:function(){const searchAPI=require("API/Search"),postAPI=(require("API/Address"),require("API/Post")),store=require("Store/Store");let dataChangePage=this._request.data;this.listPinID=ko.observableArray([]),this.temp=new Array(10).fill(1),this.resultSearch=ko.observableArray([]);let page=0,size=2,me=this;this.afterBinding=(()=>{cordova.plugins.firebase.messaging.requestPermission({forceShow:!0}).then(function(){console.log("You'll get foreground notifications when a push message arrives"),cordova.plugins.firebase.messaging.subscribe("Test")}).catch(e=>{}),$(window).off("scroll"),$(window).on("scroll",function(){$(".app").height()<=$("html").scrollTop()+$(window).height()+1&&page<size&&getStartPage()})});let getStartPage=()=>{store.isShowLoading(!0),searchAPI.indexPage(page++).then(res=>{size=Math.ceil(res.data.total/10),this.resultSearch.push(...res.data.hits.map(e=>Object.assign(e,{pinned:ko.observable(!1)}))),store.isShowLoading(!1)}).catch(e=>{console.log(e),store.isShowLoading(!1)})};this.resultWithPin=ko.pureComputed(()=>{let result=this.resultSearch();return result.forEach(e=>{this.listPinID.indexOf(e.id)>-1?e.pinned(!0):e.pinned(!1)}),result}),dataChangePage?this.resultSearch(dataChangePage.map(e=>Object.assign(e,{pinned:ko.observable(!1)}))):getStartPage(),$(document).off("changeSearchResult"),$(document).on("changeSearchResult",(event,res)=>{this.resultSearch(res.data.map(e=>Object.assign(e,{pinned:ko.observable(!1)})))}),this.addFavorite=((data,event)=>{console.log(data),data.pinned()?postAPI.unpin(data.id).then(res=>{data.pinned(!1)}).catch(e=>console.log(e)):(event.currentTarget.getElementsByTagName("path")[0].setAttribute("fill","red"),postAPI.pin(data.id).then(res=>{res.code||app.setPage("MyPin")}).catch(e=>console.log(e)))}),postAPI.getMyPin().then(res=>{me.listPinID(res.data.hits.map(e=>e.id))}).catch(e=>{console.log(e)})},template:'\n            <div id="home-page">\n    <com-slider></com-slider>\n    <com-headercontext></com-headercontext>\n    <div class="body-content">\n        <div class="filter">\n            <select name="city" disabled>\n                <option value="HCM" selected>Hồ Chí Minh</option>\n            </select>\n            <select name="type">\n                <option value="phong-tro">Phòng trọ</option>\n            </select>\n            <div class="dp-flex">\n                <select name="price-range">\n                    <option value="" selected>Khoảng giá</option>\n                    <option value="1">Dưới 500.000</option>\n                    <option value="2">500.000 - 1.000.000</option>\n                    <option value="3">1.000.000 - 2.000.000</option>\n                    <option value="4">2.000.000 - 5.000.000</option>\n                    <option value="5">Trên 5.000.000</option>\n                </select>\n                <select name="area">\n                    <option value="" selected>Diện tich</option>\n                    <option value="1">Dưới 20m²</option>\n                    <option value="1">Từ 20m² đên 40m²</option>\n                    <option value="1">Trên 40m²</option>\n                </select>\n            </div>\n        </div>\n        <div class="search-result" data-bind="foreach: resultWithPin">\n            <div class="search-item" data-bind="directInfo: {to: \'PostDetail\', data: $data}">\n                <div class="image-wrapper">\n                    <img data-bind="attr: {src: image ? image: \'./img/example.jpg\'}">\n                </div>\n                <div class="content-wrapper">\n                    <div class="content-title" data-bind="text: title   "></div>\n                    <div class="content-bottom">\n                        <div class="content-price">\n                            <div class="price" data-bind="convertMoney: price"></div>\n                            <svg data-bind="event: {tap: $root.addFavorite}" \n                                xmlns="http://www.w3.org/2000/svg" width="21.828" height="20" viewBox="0 0 21.828 20">\n                                <path id="Path_1261" data-name="Path 1261"\n                                    d="M-618.345,1377.831c-.575-.558-1.109-1.06-1.625-1.58q-3.687-3.721-7.368-7.448a6.558,6.558,0,0,1-1.941-4.061,6.264,6.264,0,0,1,4.657-6.639,6.275,6.275,0,0,1,5.984,1.513c.055.049.112.1.177.152.137-.125.261-.248.4-.358a6.182,6.182,0,0,1,6.3-1.184,6.082,6.082,0,0,1,4.178,4.933,6.162,6.162,0,0,1-1.813,5.664c-1.681,1.7-3.381,3.385-5.072,5.077q-1.865,1.865-3.729,3.732A1.182,1.182,0,0,0-618.345,1377.831Zm-.131-15.77c-.42-.43-.8-.86-1.226-1.248a4.633,4.633,0,0,0-4.388-1.2,4.71,4.71,0,0,0-2.439,7.7c.456.53.928,1.049,1.421,1.545q3.251,3.271,6.519,6.526c.057.057.118.108.19.173.642-.644,1.271-1.275,1.9-1.9,1.985-1.986,3.977-3.966,5.954-5.96a4.681,4.681,0,0,0,1.308-4.631,4.777,4.777,0,0,0-4.741-3.623,4.792,4.792,0,0,0-3.315,1.421C-617.684,1361.252-618.065,1361.647-618.475,1362.061Z"\n                                    transform="translate(629.311 -1357.831)" \n                                    data-bind="style: {fill: pinned() ? \'red\': \'#8c8c8c\'}"\n                                />\n                            </svg>\n                        </div>\n                        <div class="content-description">\n                            <span data-bind="convertTime: created_at"></span>\n                            <span data-bind="text: location" class="location"></span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n        '}));