const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, param) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.log(`Error reading ${path} ${error}`);
            process.exit(1);
        } 
        sendOut(data, param);
        }
    )}

async function webCat(url, param) {
  try {
    resp = await axios.get(url);
    sendOut(resp.data, param);
  } catch(err) {
      console.log(`Error retrieving ${url}: ${err}`);
      process.exit(1);
    }    
}


function sendOut(data, param) {
  if(param) {
    fs.writeFile(param, data, 'utf8', err => {
      if (err) {
        console.log(`COULDN'T WRITE ${param}: ${err}`);
        process.exit(1);
      }
    })
  } else {console.log(data)};
  console.log(data);
}




let path, param;
if (process.argv[2] === '--out') {
      path = process.argv[4]
      console.log(`PATH ${path}`)
      param = process.argv[3]
      console.log(`PARAM ${param}`)
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path, param);
}
 else cat(path, param);
 


