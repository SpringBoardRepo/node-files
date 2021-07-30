const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, function (err) {
            if (err) {
                console.log("ERROR", err)
                process.kill(1)
            }
        });
    } else {
        console.log(text)
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', function (err, data) {

        if (err) {
            console.log(err);
            process.kill(1);
        }
        else {
            handleOutput(data, out)
        }
    })
}

async function webcat(URL, out) {
    try {
        const res = await axios.get(URL);
        handleOutput(res.data, out)
    }
    catch (err) {
        console.log(`ERROR, ${URL} ,${err}`)
        process.kill(1)
    }

}

let out;
let path
if (process.argv[2] === '--out') {
    out = process.argv[3]
    path = process.argv[4]
}
else {
    path = (process.argv[2]);
}

if (path.slice(0, 4) === "http") {
    webcat(path, out)
}
else { cat(path, out) }