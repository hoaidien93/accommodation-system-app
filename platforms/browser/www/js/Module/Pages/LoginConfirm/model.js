const RegisterAPI = require("API/Register");
const Store = require("Store/Store");
this.phoneNumber = this._request.phoneNumber;
let isEnableButton = false;

this.afterBinding = () => {
    $(".mm-number-input-item > input").on('input', function (event) {
        let length = this.value.length;
        if (length > 1 || event.originalEvent.data === "e") {
            if (event.originalEvent.data) {
                this.value = event.originalEvent.data;
            }
        }
        if (event.originalEvent.data && event.originalEvent.data !== "e") {
            let nextElement = this.parentNode.nextElementSibling;
            if (nextElement) nextElement.querySelector('input').focus();
        }
        let code = getCode();
        if (code.length >= 6) {
            $('.btn-continue').css({ 'background-color': '#003780', 'color': 'white' });
            isEnableButton = true;
        }
        else {
            $('.btn-continue').css({ 'background-color': '#fff', 'color': '#000' })
            isEnableButton = false;
        }
    })

}

let getCode = () => {
    let code = "";
    $(".mm-number-input-item > input").each(function (index, e) {
        code += e.value;
    })
    return code.trim();
}

this.confirm = () => {
    if (isEnableButton) {
        let code = getCode();
        Store.isShowLoading(true);
        RegisterAPI.phoneLogin(this.phoneNumber, code).then((res) => {
            console.log(res);
            Store.isShowLoading(false);
            localStorage.setItem("appToken", res.data);
            app.setPage("Home");
        }).catch((e) => {
            Store.isShowLoading(false);
            console.log(e);
        })
    }
}