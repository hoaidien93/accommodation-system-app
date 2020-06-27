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

        this.getMyPin = (page = 0) => {
            return this.send("GET", "/user/list-user-pin", {
            });
        }

        this.pin = (id) => {
            return this.send("GET", `/user/add-user-pin?post_id=${id}`, {
            });
        }

        this.unpin = (id) => {
            return this.send("GET", `/user/un-user-pin?post_id=${id}`, {
            });
        }

        this.getPostDetail = (id) => {
            return this.send("GET", `/post/view-detail?post_id=${id}`, {
            });
        }
    }
    return new APIPost();
})
