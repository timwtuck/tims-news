import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { patchArticleVote } from '../api';
import Votes from './Votes';

const Article = ({api, article, thumbnail, commentCount}) => {

    const cssClass = thumbnail ? "article-thumbnail" : "article";
    const navigate = useNavigate();

    if (commentCount === undefined)
        commentCount = article.comment_count;

    return (
        <section className={cssClass}>
            {!thumbnail && <button  onClick={() => navigate(-1)} className="article__back">←</button>}
            <h3>{article.title}</h3>
            <p className={`${cssClass}__body`}>{article.body}</p>
            <p className={`${cssClass}__author`}>posted by: {article.author}</p>
            <p className={`${cssClass}__comment-count`}>Comments: {commentCount}</p>
            {article.votes !== undefined && <Votes cssClass={`${cssClass}__votes`} votes={article.votes} 
                id={article.article_id} apiCall={patchArticleVote} hideButtons={thumbnail}/>}
        </section>
    )
}

export default Article;