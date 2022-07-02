const WBK = require('wikibase-sdk');

const wdk = WBK({
    instance: "https://www.wikidata.org",
    sparqlEndpoint:"https://query.wikidata.org/sparql"
});

// source: https://www.kmjn.org/notes/images_from_wikidata.html


const searchAuthor = (term, lang = "en") => {
    const searchUrl = wdk.searchEntities({
        search: term,
        language: lang,
        limit: 1
    });

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

/**
 * Helper function to get author image
 * @param {Object} data - the wikidata object 
 * @returns 
 */
const getFileName = (data) => {
    const PHOTOS = "P18";
    if(data.claims[PHOTOS]){
        return wdk.getImageUrl(data.claims[PHOTOS][0].mainsnak.datavalue.value, 300);
    }
    return "";
}

/**
 * Searches for author data on Wikidata, if you already know the ID
 * @param {String} ids - wikidata entity ID
 * @param {String} lang - default language
 */
const getAuthor = async (ids, languages = ["en", "pt", "zh"]) => {

    const searchUrl = wdk.getEntities({
        ids,
        languages,
    });
    const req = await fetch(searchUrl).then( r => r.json() );
    if(req.success === 1){

        const data = req.entities[ids];
        const picture = getFileName(data);
        const descriptions = data.descriptions;
        
        return {
            picture,
            descriptions,
        };

    }

}

const WikidataService = {
    searchAuthor,
    getAuthor,
}

export default WikidataService;