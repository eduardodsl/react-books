const WBK = require('wikibase-sdk');

const wdk = WBK({
    instance: "https://www.wikidata.org",
    sparqlEndpoint:"https://query.wikidata.org/sparql"
});

// source: https://www.kmjn.org/notes/images_from_wikidata.html
const WikiDataService = {

    searchAuthor(term, lang = "en") {
        const searchUrl = wdk.searchEntities({
            search: term,
            language: lang,
            limit: 1
        })

        return fetch(searchUrl).then(r => r.json())
            // grab ID of the first search result
        .then(r => r.search[0].id)
            // look up the claims for that ID
        .then(id => wdk.getEntities({ids:id, props:'claims'}))
        .then(entityUrl => fetch(entityUrl))
        .then(r => r.json())
        .then(wdk.simplify.entities)
            // grab the "P18" (image) claims, if they exist
        .then(r => r[Object.keys(r)[0]].claims["P18"])
            // get a URL for the first image if there is one (resized to width=300)
        .then(images => images ? wdk.getImageUrl(images[0], 300) : null)
            .then(imageUrl => imageUrl) // do something with the URL
    }

}

export default WikiDataService