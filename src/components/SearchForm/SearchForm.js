import React, { useContext, useState } from 'react';
import { LocaleContext } from '../../services/LocaleService/LocaleService';
import OpenLibraryService from '../../services/OpenLibraryService/OpenLibraryService';
import SearchItems from './SearchItems';

let textSearchInterval;

export const SearchForm = () => {

    const { currentLang } = useContext( LocaleContext );
    const [ searchResults, setSearchResults ] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const onBlur = async (e) => {
        setTimeout(() => {
            setVisible(false);
        }, 100);
    }

    const onChange = async (e) => {
        const val = e.target.value;
        // such a great privilege having some people in this world providing us an key free api right?
        if(val.length > 0){
            clearInterval(textSearchInterval);
            setLoading(true);
            textSearchInterval = setTimeout(async () => {
                const result = await OpenLibraryService.author(val);
                // only authors with books are allowed
                let validAuthors = result.docs.filter( author => {
                    return author.work_count > 0;
                });
                setSearchResults(validAuthors);
                setVisible(true);
                setLoading(false);
            }, 1000);
        }else{
            setSearchResults([]);
            setVisible(false);
        }
    }

    return(
        <div className="search-form">
            <div className={ `loading-text ${ loading ? "visible" : "" }`}>{ currentLang.loading }</div>
            <input onChange={ onChange } onBlur={ onBlur } placeholder={currentLang.input_search} type="text" />
            <SearchItems items={ searchResults } visible={ visible } setLoading={ setLoading } />
        </div>
    );

}