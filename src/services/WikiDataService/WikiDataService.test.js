import WikiDataService from './WikiDataService'

test('makes request for a book author', async () => {

    const img = await WikiDataService.searchAuthor("tolkien");
    console.log(img);

});