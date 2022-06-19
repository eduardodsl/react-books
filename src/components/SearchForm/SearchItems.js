import React, { useContext } from 'react';
import { LocaleContext } from '../../services/LocaleService/LocaleService';
import { AuthorContext } from '../../services/AuthorService/AuthorService';

const SearchItems = ({ items, visible, setLoading }) => {

    const { currentLang } = useContext( LocaleContext );
    const { currentAuthor, setCurrentAuthor } = useContext( AuthorContext );

    const onClick = async (value) => {
        setLoading(true);
        await setCurrentAuthor(value);
        setLoading(false);
    }

    return (
        items.length > 0 && (
            <ul className={ `search-items ${ visible ? "visible" : "" }` }>
                { items.map( value => (
                    <li className="search-item" key={value.key} >
                        <button onClick={ () => onClick(value) }>
                            { currentLang.author } { value.name }
                        </button>
                    </li>
                )) }
            </ul>
        )
    );

}

export default SearchItems;