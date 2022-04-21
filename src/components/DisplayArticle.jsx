import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { getArticleById, getArticleComments, deleteComment } from "../api";
import Article from './Article';
import Comment from "./Comment";

const AddComment = () => {

    return (
        <section className="add-comment">
            <p>Add Comment: </p>
            <textarea></textarea>
            <button>Post Comment</button>
        </section>  
    )
}

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
                setSavedComments(comments)
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
            <AddComment/>
            <p>{comments.length ? 'Comments: ' : 'No Comments'}</p>
            {comments.map(comment => <Comment key={comment.comment_id} 
            comment={comment} user={user} deleteComment={onDeleteComment}/>)}
        </main>
    );
}

export default DisplayArticle;