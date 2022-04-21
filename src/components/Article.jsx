import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { patchVote } from '../api';

const Article = ({api, article, thumbnail}) => {

    const cssClass = thumbnail ? "article-thumbnail" : "article";
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [votes, setVotes] = useState(0);

    //load the votes when the article gets loaded 
    useEffect(()=> {
        setVotes(article.votes)
    }, [article]);

    function onChangeVote(upvotePressed){

        let changeBy = 0;

        if (upvotePressed){
            if (upvoted)
                changeBy--;
            else if (downvoted)
                changeBy += 2;
            else
                changeBy++;

            setUpvoted(!upvoted);
            setDownvoted(false);
        } else {

            if (downvoted)
                changeBy++;
            else if (upvoted)
                changeBy -= 2;
            else
                changeBy--;

            setDownvoted(!downvoted);
            setUpvoted(false);
        }

        setVotes(votes + changeBy);
        patchVote(article.article_id, changeBy);
    }


    return (
        <section className={cssClass}>
            <h3>{article.title}</h3>
            <p className={`${cssClass}__body`}>{article.body}</p>
            <p className={`${cssClass}__author`}>posted by: {article.author}</p>
            <p className={`${cssClass}__comment-count`}>Comments: {article.comment_count}</p>
            <div className={`${cssClass}__votes`}>
                <button className={`article-${upvoted?"":"-not"}-voted`} 
                hidden={thumbnail?"hidden":""} onClick={() => onChangeVote(true)}>↑</button>
                <p className={`${cssClass}__votes`}>votes: {votes}</p>
                <button className={`article-${downvoted?"":"-not"}-voted`} 
                hidden={thumbnail?"hidden":""} onClick={() => onChangeVote(false)}>↓</button>
            </div>
        </section>
    )
}

export default Article;