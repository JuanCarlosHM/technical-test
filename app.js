const https = require('https');
const url = require('url');


function makeCall(cityName, estimatedCost)
{
    return new Promise((resolve, reject) =>
    {
        const requestUrl = url.parse(url.format({
            protocol: 'https',
            hostname: 'jsonmock.hackerrank.com',
            pathname: '/api/food_outlets',
            query: {
                city: cityName,
                estimated_cost: estimatedCost,
            }
        }));
        const req = https.get({
            hostname: requestUrl.hostname,
            path: requestUrl.path,
        }, res => {
            res.on('data', d => {
                console.log("data -->", JSON.parse(d));
                resolve(JSON.parse(d).data)
            })
        })

        req.on('error', error => {
            reject(error)
        })

        req.end()
    })
}

function handleResults(results)
{
    if (results.length === 0) {
        return -1
    }
    else
    {
        let totalVotes = 0;
        results.map((value, index) => {
            totalVotes += value.votes;
        })

        return totalVotes;
    }
}

async function getVoteCount(cityName, estimatedCost, callback)
{
    const result =  await makeCall(cityName, estimatedCost)
    return  handleResults(result);
}


async function main()
{
    let result = await getVoteCount("Delaware", 110);
}

main();
