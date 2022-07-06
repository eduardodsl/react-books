import React, {useContext} from 'react';
import { AuthorContext } from '../AuthorService/AuthorService';
import { BasicButton } from '../../components/BasicComponents/Buttons';

export const Content = ({ locale }) => {
    
    return contentData[locale]();

}

const ExampleAuthors = () => {
    
    const { setLoading } = useContext( AuthorContext );
    const { setCurrentAuthorByID } = useContext( AuthorContext );
    
    const setAuthor = async (id) => {
        setLoading(true);
        await setCurrentAuthorByID(id);
        setLoading(false);
    }

    return (<>
        <BasicButton onClick={ () => setAuthor('OL93286A') } className="main-link">Machado de Assis</BasicButton>,&nbsp;
        <BasicButton onClick={ () => setAuthor('OL93118A') } className="main-link">Clarice Lispector</BasicButton>,&nbsp;
        <BasicButton onClick={ () => setAuthor('OL3778242A') } className="main-link">Yuval Noah Harari</BasicButton>,&nbsp;
        <BasicButton onClick={ () => setAuthor('OL26320A') } className="main-link">J.R.R Tolkien</BasicButton>,&nbsp;
        <BasicButton onClick={ () => setAuthor('OL118077A') } className="main-link">George Orwell</BasicButton>,&nbsp;
        <BasicButton onClick={ () => setAuthor('OL2675313A') } className="main-link">Yu Hua</BasicButton>.
    </>)

}

const contentData = {
    "pt": () =>(
        <article>
            <h2>Serviço React Books</h2>
            <p>
                Este aplicativo foi desenvolvido como parte de um desafio do Bootcamp DIO/TQI. Originalmente foi solicitado criar um sistema de consulta utilizando a API de dados do GitHub
                para prática dos React Hooks. Optei por propor uma solução diferente pelas seguintes razões:
            </p>
            <ul>
                <li>Por causa do nome;</li>
                <li>Queria fazer algo do zero;</li>
                <li>Estou aproveitando para aprender coisas novas;</li>
            </ul>
            <h2>Características</h2>
            <ul>
                <li>Suporte dinâmico a três idiomas (Português, Inglês e Mandarim);</li>
                <li>
                    Combinação de duas APIs públicas para a composição da aplicação:  <BasicButton className="main-link" href="https://openlibrary.org">Open Library</BasicButton> (autores e livros) e  <BasicButton className="main-link" href="https://www.wikidata.org">Wikidata</BasicButton> (fotos dos autores)
                </li>
            </ul>
            <h2>Exemplos</h2>
            <p>
                Autores de exemplo: <ExampleAuthors />
            </p>
        </article>
    ),
    "en": () => (
        <article>
            <h2>React Books Service</h2>
            <p>
                This application was developed as part of an DIO/TQI Bootcamp challenge. Originally it was intended to create a query app using the GitHub API as means to practice with
                React Hooks. I chose to propose a different solution for the following reasons:
            </p>
            <ul>
                <li>Because of the name;</li>
                <li>I wanted to do something from scratch;</li>
                <li>I'm using this opportunity to learn new things;</li>
            </ul>
            <h2>Features</h2>
            <ul>
                <li>Dynamic support for three languages (Portuguese, English e Mandarin);</li>
                <li>
                    Combination of two public APIs in order to compose this application: <BasicButton href="https://openlibrary.org">Open Library</BasicButton> (authors and books) and  <BasicButton href="https://www.wikidata.org">Wikidata</BasicButton> (author pictures)
                </li>
            </ul>
            <h2>Examples</h2>
            <p>
                Example authors: <ExampleAuthors />
            </p>
        </article>
    ),
    "zh": () => (
        <article>
            <h2>React Books 网上服务</h2>
            <p>
                此用程序是作为 DIO/TQI 训练营挑战开发的。以前的要求是开发一个使用 Git 数据 API 的程序为了 React Hooks 培训，但是我决定建议一个不同的方案由于以下理由：
            </p>
            <ul>
                <li>名称；</li>
                <li>我想从头开始开发；</li>
                <li>我趁本机会为学新东西；</li>
            </ul>
            <h2>功能</h2>
            <ul>
                <li>动态支持三个语言 (葡萄牙语, 英语和中文);</li>
                <li>
                    两个公共 API 结合：<BasicButton href="https://openlibrary.org">Open Library</BasicButton> (作家和作品) 与  <BasicButton href="https://www.wikidata.org">Wikidata</BasicButton> (作家的图片)
                </li>
            </ul>
            <h2>实例</h2>
            <p>
                实例作家: <ExampleAuthors />
            </p>
        </article>
    )
}

