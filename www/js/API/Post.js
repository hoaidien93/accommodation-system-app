define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");
    const SIZE = 10;

    function APIPost() {
        AbstractAPI.call(this, {});

        this.getMyPost = (page = 0) => {
            return this.send("POST", "/user/list-post", {
                page,
                size: SIZE
            });
        }
    }
    return new APIPost();
})
