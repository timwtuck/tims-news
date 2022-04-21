import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { getArticleById, getArticleComments, deleteComment, postComment } from "../api";
import Article from './Article';
import Comment from "./Comment";
import AddComment from "./AddComment";

const DisplayArticle = ({user}) => {

    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [requestStatus, setRequestStatus] = useState(null);
    const [savedComments, setSavedComments] = useState([]); 
    
    useEffect(() => {
        getArticleById(article_id)
            .then(article => setArticle(article));
        getArticleComments(article_id)
            .then(comments => {
                setComments(comments);
                setSavedComments(comments);
            });
    }, []); 

    // if request failed, reinstate comments before
    // request was made, otherwise save current comments
    // in case of future failed requests
    useEffect(() => {
        if (!requestStatus)
            return;

        if (requestStatus == 'error')
            setComments(savedComments);
        else
            setSavedComments(comments);
        
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
        
        // post to backend  
        postComment(article_id, {username: user, body: text})
            .then(comment => {
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

        deleteComment(commentId)
            .then(() => setRequestStatus('success'))
            .catch(() => {
                setRequestStatus('error');
                alert('Something went wrong, please try again')
            });
    }

    return (
        <main>
            <Article article={article} thumbnail={false}/>
            <AddComment user={user} onPostComment={onPostComment}/>
            <p>{comments.length ? 'Comments: ' : 'No Comments'}</p>
            {comments.map(comment => <Comment key={comment.comment_id} 
            comment={comment} user={user} deleteComment={onDeleteComment}/>)}
        </main>
    );
}

export default DisplayArticle;