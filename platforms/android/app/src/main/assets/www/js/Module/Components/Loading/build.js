define(["Store/Store"],()=>({viewModel:function(){const store=require("Store/Store");this.isShow=store.isShowLoading},template:'\n            <div data-bind="visible: isShow" class="loader"></div>\n        '}));