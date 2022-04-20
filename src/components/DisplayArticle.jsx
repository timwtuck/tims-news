import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import Article from './Article'

const DisplayArticle = ({api}) => {

    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    
    useEffect(() => {
        api.get(`/articles/${article_id}`)
            .then(res => {
                console.log(res.data);
                setArticle(res.data.article);
            });
    }, []); 

    function onChangeVote(changeBy) {

    }

    return (
        <main>
            <Article article={article} class="whole-article"/>
            <button onClick={() => onChangeVote(1)}>↑</button>
            <button onClick={() => onChangeVote(-1)}>↓</button>
        </main>
    );
}

export default DisplayArticle;