import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { patchArticleVote } from '../api';
import Votes from './Votes';

const Article = ({api, article, thumbnail}) => {

    const cssClass = thumbnail ? "article-thumbnail" : "article";

    return (
        <section className={cssClass}>
            <h3>{article.title}</h3>
            <p className={`${cssClass}__body`}>{article.body}</p>
            <p className={`${cssClass}__author`}>posted by: {article.author}</p>
            <p className={`${cssClass}__comment-count`}>Comments: {article.comment_count}</p>
            {article.votes !== undefined && <Votes cssClass={`${cssClass}__votes`} votes={article.votes} 
                id={article.article_id} apiCall={patchArticleVote} hideButtons={thumbnail}/>}
        </section>
    )
}

export default Article;