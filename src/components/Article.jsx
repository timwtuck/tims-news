import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { patchArticleVote } from '../api';

const Article = ({api, article, thumbnail}) => {

    const cssClass = thumbnail ? "article-thumbnail" : "article";
    const [votesState, setVotesState] = useState(
        {upPressed: false, downPressed: false, votes: 0})
    const [priorState, setPriorState] = useState(
        {upPressed: false, downPressed: false, votes: 0});
    const [requestStatus, setRequestStatus] = useState(null);

    //load the votes when the article gets loaded 
    useEffect(()=> {
        setVotesState({...votesState, votes: article.votes})
        setPriorState({...priorState, votes: article.votes});
    }, [article]);

    // handle error if api call errors
    useEffect(() => {
        if (!requestStatus)
            return;

        if (requestStatus === 'error'){
            setVotesState({...priorState});
            alert('Something went wrong, please try again');
        } else {
            setPriorState({...votesState});
        }

        setRequestStatus(null);
    }, [requestStatus])

    function onChangeVote(upvotePressed){

        //change the vote buttons. Buttons can toggle,
        // but also only one button can be toggled 'on'
        // at a time, so must force toggle off in this case.

        let changeBy = 0;

        if (upvotePressed){
            if (votesState.upPressed)
                changeBy--;
            else if (votesState.downPressed)
                changeBy += 2;
            else
                changeBy++;

            setVotesState((currState) => { return {
                    upPressed: !currState.upPressed,
                    downPressed: false,
                    votes: currState.votes + changeBy
                }});
        } else {

            if (votesState.downPressed)
                changeBy++;
            else if (votesState.upPressed)
                changeBy -= 2;
            else
                changeBy--;

            setVotesState((currState) => { return {
                upPressed: false,
                downPressed: !currState.downPressed,
                votes: currState.votes + changeBy
            }});
        }

        patchArticleVote(article.article_id, changeBy)
            .then(() => setRequestStatus('success'))
            .catch(() => setRequestStatus('error'));
    }


    return (
        <section className={cssClass}>
            <h3>{article.title}</h3>
            <p className={`${cssClass}__body`}>{article.body}</p>
            <p className={`${cssClass}__author`}>posted by: {article.author}</p>
            <p className={`${cssClass}__comment-count`}>Comments: {article.comment_count}</p>
            <div className={`${cssClass}__votes`}>
                <button className={`article-${votesState.upPressed?"":"-not"}-voted`} 
                hidden={thumbnail?"hidden":""} onClick={() => onChangeVote(true)}>↑</button>
                <p className={`${cssClass}__votes`}>votes: {votesState.votes}</p>
                <button className={`article-${votesState.downPressed?"":"-not"}-voted`} 
                hidden={thumbnail?"hidden":""} onClick={() => onChangeVote(false)}>↓</button>
            </div>
        </section>
    )
}

export default Article;