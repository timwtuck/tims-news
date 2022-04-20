import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import { getArticleById } from "../api";
import Article from './Article'

const DisplayArticle = () => {

    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    
    useEffect(() => {
        getArticleById(article_id)
            .then(article => setArticle(article))
    }, []); 

    function onChangeVote(changeBy) {

    }

    return (
        <main>
            <Article article={article} thumbnail={false}/>
        </main>
    );
}

export default DisplayArticle;