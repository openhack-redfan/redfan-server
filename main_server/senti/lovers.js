const calLover = (totalCommentAuthor, subscriberCount) => {
    /* select commentAuthorId from comments ---- main option */
    /* temp option for comments */
    let totalCommentAuthorLength = totalCommentAuthor.length

    /* list up comments */
    let dictCommentAuthor = {}

    for(let author of totalCommentAuthor){
        dictCommentAuthor[author] = 0
    }

    for(let author of totalCommentAuthor){
        dictCommentAuthor[author] += 1
    }

    const diffLength = Object.keys(dictCommentAuthor).length
    const average = totalCommentAuthorLength / diffLength
    const keys = Object.keys(dictCommentAuthor)

    console.log(average)

    let lover = 0
    for(let key in dictCommentAuthor){
        if(dictCommentAuthor[key] >= average){
            console.log(key + ' ' + dictCommentAuthor[key])
            lover += 1
        }
    }

    let loverRate = lover / diffLength
    const subRate = subscriberCount / diffLength

    return { loverRate: loverRate * 100, loverCount: lover * subRate }
}

module.exports = calLover




