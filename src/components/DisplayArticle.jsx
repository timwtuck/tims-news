import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { getArticleById } from "../api";
import Article from './Article';

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
    
    useEffect(() => {
        getArticleById(article_id)
            .then(article => setArticle(article))
    }, []); 

    return (
        <main>
            <Article article={article} thumbnail={false}/>
            <AddComment/>
        </main>
    );
}

export default DisplayArticle;