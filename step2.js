
const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function (err, data) {

        if (err) {
            console.log(err);
            process.kill(1);
        }
        else {
            console.log("DATA..", data);
        }
    })
}

async function webcat(URL) {
    try {
        const res = await axios.get(URL);
        console.log(res.data)
    }
    catch (err) {
        console.log(`ERROR, ${URL} ,${err}`)
        process.kill(1)
    }

}

let path = (process.argv[2]);
if (path.slice(0, 4) === "http") {
    webcat(path)
}
else { cat(path) }
