define(["API/AbstractAPI"], () => {
    let AbstractAPI = require("API/AbstractAPI");
    const SIZE = 10;
    function APISearch() {
        var me = this;
        AbstractAPI.call(this, {});
        this.indexPage = (page = 0) => {
            return this.send("POST", "/post/search", {
                "order": 1,
                "page": page,
                'size': SIZE
            });
        }

        this.getPosts = (str, page = 0) => {
            return this.send("POST", "/post/search", {
                "order": 1,
                "page": page,
                "size": SIZE,
                "location": str 
            });
        }


    }
    return new APISearch();
})

