import { LocaleContext } from "../../services/LocaleService/LocaleService";
import React, { useContext } from 'react';
import { SearchForm } from "../SearchForm/SearchForm";
import LocaleSelect from '../LocaleSelect/LocaleSelect';

const MainHeader = () => {

    const { currentLang } = useContext( LocaleContext );

    return (
        <header>
          <div className="bg-wrapper bg-0"></div>
          <div className="bg-wrapper bg-1"></div>
          <div className="bg-wrapper bg-2"></div>
          <div className="header-content">
            <section role="localization" className="layout locale">
              <LocaleSelect>
                <option value="en">English</option>
                <option value="pt">Português</option>
                <option value="zh">中文</option>
              </LocaleSelect>
            </section>
            <section role="title" className="layout title">
                  <h1>
                      { currentLang.app_title }
                  </h1>
            </section>
            <section role="search" className="layout">
                <SearchForm />
            </section>
          </div>
        </header>
    )

}

export default MainHeader;