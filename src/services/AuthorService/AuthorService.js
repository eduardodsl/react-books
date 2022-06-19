import { createContext, useState } from 'react';
import OpenLibraryService from '../OpenLibraryService/OpenLibraryService';
import WikiDataService from '../WikiDataService/WikiDataService';

export const AuthorContext = createContext();

export const AuthorService = ({ children }) => {

    const defaultData = {
        author: null,
        books: null,
    }

    const setCurrentAuthorByID = async (value) => {
        const author = await OpenLibraryService.authorID(value);
        return setCurrentAuthor(author);

    }

    const setCurrentAuthor = async (value) => {
        const newObj = { ...currentAuthor }
        value.key = value.key.replace("/authors/", "");
        newObj.author = value;
        newObj.books = await OpenLibraryService.authorWorks(value.key).then( result => result.entries );
        newObj.author.picture = await WikiDataService.searchAuthor(newObj.author.name);
        newObj.books.forEach((book) => {
            book.has_cover = book.covers ? 1 : 0;
        });
        newObj.books.sort((a, b) => {
            return b.has_cover - a.has_cover;
        });
        defineCurrentAuthor(newObj);
    }

    const [currentAuthor, defineCurrentAuthor] = useState(defaultData);

    return (
        <AuthorContext.Provider value={{currentAuthor, setCurrentAuthor, setCurrentAuthorByID}}>
            {children}
        </AuthorContext.Provider>
    );

}