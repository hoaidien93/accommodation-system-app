define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");

    function APINotify() {
        AbstractAPI.call(this, {});

        this.getCurrentSettings = (str, page = 0) => {
            return this.send("GET", "/notification/setting/get", {
            });
        }
    }
    return new APINotify();
})

