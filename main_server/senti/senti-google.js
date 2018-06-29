// Imports the Google Cloud client library
const language = require('@google-cloud/language')

// Creates a client
const client = new language.LanguageServiceClient()

/**
 * TODO(developer): Uncomment the following line to run this code.
 */

const sentiPerVideo = async (commentList) => {
    let sentiPromise = []
    let sentiResults = []


    for(const comment of commentList) {

        const text = comment

        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        }

        let commentPromise = client
            .analyzeSentiment({document: document})
            .then(function (results) {
                const sentiment = results[0].documentSentiment
                console.log(`Document sentiment:`)
                console.log(`  Score: ${sentiment.score}`)
                console.log(`  Magnitude: ${sentiment.magnitude}`)
                sentiResults.push(sentiment.score)
            })
            .catch(err => {
                console.error('ERROR:', err);
            })

        sentiPromise.push(commentPromise)
    }

    await Promise.all(sentiPromise)
    let neg = 0, com = 0, pos = 0
    for(score of sentiResults){
        if(score < -0.25){
            neg += 1
        }
        else if(score < 0.25){
            com += 1
        }
        else{
            pos += 1
        }
    }

    return {
        neg,
        com,
        pos,
        total: neg + com + pos
    }
}

module.exports = sentiPerVideo


