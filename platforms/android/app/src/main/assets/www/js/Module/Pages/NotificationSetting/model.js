const nofifyAPI = require("API/Notify");
nofifyAPI.getCurrentSettings().then((res) => {
    console.log(res);
}).catch((e)=>{
    console.log(e);
})