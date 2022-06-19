import React, {useContext} from 'react';
import { BasicButton } from '../BasicComponents/Buttons';
import { LocaleContext } from '../../services/LocaleService/LocaleService';
import { replaceString } from '../../utils/Web';

export const Footer = () => {

    const { currentLang } = useContext( LocaleContext );

    return (
        <footer className="layout">
            { replaceString( currentLang.__lang === "zh" ? "薛恩达" : "Eduardo Augusto" , currentLang.developed_by) } [
                <BasicButton className='default-button' href="https://dsleite.com.br">dsleite.com.br</BasicButton> |
                <BasicButton className='default-button' href="https://github.com/eduardodsl">github</BasicButton>
            ]
        </footer>
    );

}