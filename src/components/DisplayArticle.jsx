import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { getArticleById, getArticleComments } from "../api";
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

const DisplayArticle = () => {

    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        getArticleById(article_id)
            .then(article => setArticle(article));
        getArticleComments(article_id)
            .then(comments => setComments(comments));
    }, []); 

    return (
        <main>
            <Article article={article} thumbnail={false}/>
            <AddComment/>
            <p>{comments.length ? 'Comments: ' : 'No Comments'}</p>
            {comments.map(comment => <Comment comment={comment}/>)}
        </main>
    );
}

export default DisplayArticle;