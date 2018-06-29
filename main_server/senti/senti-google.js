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
                sentiResults.push({ score: sentiment.score, text: document.content, react: 'null' })
            })
            .catch(err => {
                console.error('ERROR:', err);
            })

        sentiPromise.push(commentPromise)
    }

    await Promise.all(sentiPromise)
    let neg = 0, com = 0, pos = 0
    for(comment of sentiResults){
        if(comment.score < -0.25){
            neg += 1
            comment.react = "negative"
        }
        else if(comment.score < 0.25){
            com += 1
            comment.react = "common"
        }
        else{
            pos += 1
            comment.react = "positive"
        }
    }

    return {
        neg,
        com,
        pos,
        total: neg + com + pos,
        commentResults: sentiResults
    }
}

module.exports = sentiPerVideo
