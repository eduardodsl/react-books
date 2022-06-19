import { getJson } from '../../utils/Web';
import LoggingService from '../LoggingService/LoggingService';

const baseUrl = 'https://openlibrary.org';

/**
 * makes queries to the Open Library API (https://openlibrary.org/developers/api)
 */
const OpenLibraryService = {

    /**
     * searches for an author.
     * 
     * reference: https://openlibrary.org/dev/docs/api/search
     * @returns {Promise<object>}
     */
    author: async (key) => {
        
        const requestUrl = `${baseUrl}/search/authors.json?q=${key}`;
        return getJson( requestUrl, LoggingService.error );

    },

    /**
     * searches for an author by ID.
     * 
     * reference: https://openlibrary.org/dev/docs/api/search
     * @returns {Promise<object>}
     */
     authorID: async (authorId) => {
        const requestUrl = `${baseUrl}/authors/${authorId}.json`;
        return getJson( requestUrl, LoggingService.error );

    },

    /**
     * gets all works done by an author.
     * 
     * reference: https://openlibrary.org/dev/docs/api/authors
     * @returns {Promise<object>}
     */
    authorWorks: async (authorId) => {

        const requestUrl = `${baseUrl}/authors/${authorId}/works.json`;
        return getJson( requestUrl, LoggingService.error );

    }

};

export default OpenLibraryService;