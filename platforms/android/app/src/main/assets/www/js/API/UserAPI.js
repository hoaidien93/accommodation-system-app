define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");

    function UserAPI() {
        AbstractAPI.call(this, {});

        this.getInfo = () => {
            return this.send("GET", `/user/get-info`, {
            });
        }
    }

    return new UserAPI();
})