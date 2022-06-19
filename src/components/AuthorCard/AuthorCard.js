import React, { useContext, useState } from 'react';
import { LocaleContext } from '../../services/LocaleService/LocaleService';
import { AuthorContext } from '../../services/AuthorService/AuthorService';
import { makeDate } from '../../utils/Web';
import { Content } from '../../services/LocaleService/Content'

const BookCard = ({ book, color }) => {

    let coverUrl = "";
    if(book.has_cover){
        coverUrl = `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`
    }
    
    const getColor = () => {
        return color ? 'bg-book-'+color : '';
    }

    return (
        <div className={ `book ${ getColor() } ${ (book.has_cover ? 'has-cover' : 'no-cover') }` } style={ { backgroundImage: `url(${coverUrl})` }}>
            <div className="title">
                <div>
                    { book.title }
                </div>
            </div>
        </div>
    )

}

const AuthorProfile = () => {

    const { currentAuthor } = useContext( AuthorContext );
    const { author, books } = currentAuthor;
    const { currentLang } = useContext( LocaleContext );

    const TopSubjects = () => {
        
        if(author.top_subjects){
            return (
                <div className="top-subjects">
                    <strong>{ currentLang.top_subjects }:</strong>
                    { author.top_subjects.map( (subject, index) => 
                        ( <span key={ index }> { subject } </span> )
                    ) }
                </div>
            )
        }

    }

    const getColor = (index = 0) => {
        if(index < 5){
            return index + 1;
        }
        if((index / 5) >= 1){
            return (index + 1) - 5 * Math.floor((index / 5));
        }
    }

    const BirthStatus = () => {

        const { birth_date, death_date } = author;

        if(birth_date || death_date){

            const format = currentLang.__date_format;
            const months = currentLang.months;

            return (
                <dl className="birth-status">
                    { birth_date && (<><dt>✹</dt><dd>{ ( makeDate(new Date(birth_date), format, months) ) }</dd></>) }
                    { death_date && (<><dt>✚</dt><dd>{ ( makeDate(new Date(death_date), format, months) ) }</dd></>) }
                </dl>
            )
        }
    }

    const GeneralInfo = () => {
        
        const { top_work, work_count } = author;

        return (
            <dl className="birth-status">
                { top_work && (<><dt><strong>{ currentLang.top_work }</strong></dt><dd>{ top_work }</dd></>) }
                { work_count && (<><dt><strong>{ currentLang.work_count }</strong></dt><dd>{ work_count }</dd></>) }
            </dl>
        )
        
    }

    return (
        <>
        <section className="author-bio" role="author">
            <div className="author-data">
                <div className="picture">
                    <img src={ author.picture } alt={ author.name } />
                </div>
                <div className="author-data-wrapper">
                    <h2>{ author.name }</h2>
                    <BirthStatus />
                    <GeneralInfo />
                </div>
            </div>
            <TopSubjects />
        </section>
        <section className="author-books" role="books">
            <div className="book-grid">
                { books.map( (book, index) => 
                    ( <BookCard key={ book.key } book={ book } color={ getColor(index) } /> )
                ) }
            </div>
        </section>
        </>
    );
}

const NoAuthor = () => {

    const { currentLang } = useContext( LocaleContext );

    return (
        <div className="no-author">
            <Content locale={ currentLang.__lang } />
        </div>
    );

}

const AuthorCard = () => {

    const { currentAuthor } = useContext( AuthorContext );
    
    let Component = currentAuthor.author?.name ? AuthorProfile : NoAuthor;

    return (
        <div id="AuthorCard" className="author-card layout">
            <Component />
        </div>
    );

}

export default AuthorCard;