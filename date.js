const https = require('https');
const url = require('url');


async function makeCall(date)
{
    return new Promise((resolve, reject) => {

        const requestUrl = url.parse(url.format({
            protocol: 'https',
            hostname: 'jsonmock.hackerrank.com',
            pathname: '/api/stocks',
            query: {
                date: date
            }
        }));

        const req = https.get({
            hostname: requestUrl.hostname,
            path: requestUrl.path,
        }, res => {
            //console.log(`statusCode: ${res.statusCode}`)
            res.on('data', d => {
                resolve(JSON.parse(d));
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    })
}


async function getStockInformation(date) {
    // write your code here
    // API endpoint: https://jsonmock.hackerrank.com/api/stocks?date=<date>

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    let mydate = new Date(date);

    let day = mydate.getDate()
    let month = mydate.getMonth()
    let year = mydate.getFullYear()

    let formattedDate = day + "-" + monthNames[month] + '-' + year;

    return await makeCall(formattedDate)
}

async function main() {
    const res = await getStockInformation("5-January-2020");
    console.log("res", res);
}

main();