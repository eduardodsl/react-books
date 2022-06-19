import React, { useContext } from 'react';
import { LocaleContext } from '../../services/LocaleService/LocaleService';
import { getLocale } from '../../utils/Web';

const LocaleSelect = ({ children }) =>{

    const { currentLang, setCurrentLang } = useContext( LocaleContext );

    const changeLang = async (e) => {
        const locale = await getLocale(e.target.value, (_, defLocale) => defLocale);
        setCurrentLang(locale);
    }

    return(
        <select value={currentLang.__lang} className="locale locale-select" onChange={changeLang}>
            { children }
        </select>
    );

}

export default LocaleSelect;