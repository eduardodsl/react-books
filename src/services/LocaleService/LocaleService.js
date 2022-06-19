import { createContext, useState} from 'react';
import { defaultLocale } from '../../utils/Web';

export const LocaleContext = createContext();

export const LocaleService = ({ children }) => {

    const [currentLang, setCurrentLang] = useState(defaultLocale);

    return (
        <LocaleContext.Provider value={{currentLang, setCurrentLang}}>
            {children}
        </LocaleContext.Provider>
    );

}
