import OpenLibraryService from './OpenLibraryService';

test('looks for authors with the key "tolkien"', async () => {

    const result = await OpenLibraryService.author("tolkien");
    expect(result.docs.length).toBeGreaterThan(0);

});

test('looks for works written by Tolkien', async () => {

    const result = await OpenLibraryService.authorWorks('OL26320A');
    expect(result.entries.length).toBeGreaterThan(0);

});

test('fake author search, it must return a notfound error', async () => {

    const result = await OpenLibraryService.authorWorks('OL239');
    expect(result.error).toEqual('notfound');

});