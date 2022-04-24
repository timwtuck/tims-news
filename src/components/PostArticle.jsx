import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics, postArticle } from "../api";
import { displayPageStatusFeedback } from "../utils";

const PostArticle = ({user}) => {

    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [errMsg, setErrMsg] = useState({});
    const [pageStatus, setPageStatus] = useState('loading');

    const navigate = useNavigate();

    useEffect(() => {

        getTopics()
            .then(topics => {
                setTopics(topics);
                setPageStatus('loaded');
                if (topics.length > 0)
                    setSelectedTopic(topics[0].slug);
            });
    })


    function onPostArticle(e){

        e.preventDefault();
        const msg = {};
        
        if (!title)
            msg.title = "Article title cannot be blank";
        if (!body)
            msg.body = "Article content cannot be blank";

        if (msg.title || msg.body){
            setErrMsg(msg);
            return;
        }

        const newArticle = {
            author: user,
            title,
            body,
            topic: selectedTopic
        };

        setPageStatus('posting');

        postArticle(newArticle)
            .then(article => navigate(`/articles/${article.article_id}`))
            .catch((err) => {
                alert('Something went wrong, please try again');
                setPageStatus('loaded');
            });
    }

    return <>
            <h2 className="generic-banner">Post New Article</h2>
            {displayPageStatusFeedback(pageStatus)}
            {pageStatus === 'loaded' &&
            <main className="post-article-page">
                <form className="post-article" onSubmit={onPostArticle}>
                    <label htmlFor="title">Article Title:</label>
                    <input type="text" name="title" id="title" 
                        value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <p>{errMsg.title}</p>
                    <label htmlFor="body">Article Contents:</label>
                    <textarea id="body" name="body"
                        value={body} onChange={(e) => setBody(e.target.value)}/>
                    <p>{errMsg.body}</p>
                    <label htmlFor="topic">Topic:</label>
                    <select id="topic" name="topic" value={selectedTopic} 
                        onChange={(e) => setSelectedTopic(e.target.value)}>
                        {topics.map(topic => 
                        <option value={topic.slug} id={topic.slug} key={topic.slug}>{topic.slug}</option>)}
                    </select>
                    <button>Post Article</button>
                </form>
            </main>     
            }
        </>

}

export default PostArticle;