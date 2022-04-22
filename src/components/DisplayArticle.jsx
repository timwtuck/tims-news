import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { getArticleById, getArticleComments, deleteComment, postComment } from "../api";
import Article from './Article';
import Comment from "./Comment";
import AddComment from "./AddComment";
import { displayPageStatusFeedback } from "../utils";

const DisplayArticle = ({user}) => {

    const commentsLimit = 5;
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [requestStatus, setRequestStatus] = useState(null);
    const [savedComments, setSavedComments] = useState([]); 
    const [savedCommentCount, setSavedCommentCount] = useState(0);
    const [toDisplay, setToDisplay] = useState(commentsLimit);
    const [commentCount, setCommentCount] = useState(0);
    const [pageStatus, setPageStatus] = useState('loading');
    
    useEffect(() => {
        const getArticle = getArticleById(article_id);
        const getComments = getArticleComments(article_id, toDisplay);

        Promise.all([getArticle, getComments])
            .then(([article, comments]) =>{
                setPageStatus('loaded');

                setArticle(article);
                setCommentCount(article.comment_count);
                setSavedCommentCount(article.comment_count);

                setComments(comments);
                setSavedComments(comments);
            })
            .catch((err) => setPageStatus('error'));
    }, [toDisplay]); 

    // if request failed, reinstate comments before
    // request was made, otherwise save current comments
    // in case of future failed requests
    useEffect(() => {
        if (!requestStatus)
            return;

        if (requestStatus == 'error'){
            setComments(savedComments);
            setCommentCount(savedCommentCount);
        }
        else {
            setSavedComments(comments);
            setSavedCommentCount(commentCount);
        }
        
        setRequestStatus(null);
    }, [requestStatus]);

    function onPostComment(text){

        const newComment = {
            comment_id: 'temp',
            author: user,
            body: text,
            votes: 0           
        };

        setComments([newComment, ...comments]);
        setCommentCount((curr) => curr + 1);
        
        // post to backend  
        postComment(article_id, {username: user, body: text})
            .then(comment => {
                // comment from backend has ID (i.e. can be deleted)
                // so add it in place of the temp one
                setComments([comment, ...savedComments]);
                setRequestStatus('success');
            })
            .catch(() => {
                alert('Something went wrong, please try again');
                setRequestStatus('error');
            });
    }

    function onDeleteComment(commentId) {

        const newComments = comments.filter(
            comment => comment.comment_id != commentId);

        setComments(newComments);
        setCommentCount((curr) => curr - 1);

        deleteComment(commentId)
            .then(() => setRequestStatus('success'))
            .catch(() => {
                setRequestStatus('error');
                alert('Something went wrong, please try again')
            });
    }

    return (
        <main>
            {displayPageStatusFeedback(pageStatus)}
            {pageStatus === 'loaded' &&
                <>
                    <Article article={article} thumbnail={false} commentCount={commentCount}/>
                    <AddComment user={user} onPostComment={onPostComment}/>
                    <p>{comments.length ? 'Comments: ' : 'No Comments'}</p>
                    {comments.map(comment => <Comment key={comment.comment_id} 
                    comment={comment} user={user} deleteComment={onDeleteComment}/>)}
                    {toDisplay < article.comment_count &&
                    <button onClick={() => setToDisplay(toDisplay+commentsLimit)}>More Comments</button>}
                </>
            }
        </main>
    );
}

export default DisplayArticle;