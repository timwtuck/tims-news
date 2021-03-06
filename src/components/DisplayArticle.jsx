
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import { getArticleById, getArticleComments, deleteComment, postComment, deleteArticle } from "../api";
import Article from './Article';
import Comment from "./Comment";
import AddComment from "./AddComment";
import SearchBar from "./SearchBar";
import { displayPageStatusFeedback, handleError } from "../utils";

const DisplayArticle = ({user}) => {

    const commentsLimit = 5;
    const navigate = useNavigate();
    
    const {article_id} = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [requestStatus, setRequestStatus] = useState(null);
    const [savedComments, setSavedComments] = useState([]); 
    const [savedCommentCount, setSavedCommentCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [pageStatus, setPageStatus] = useState('loading');
    const [commentPage, setCommentPage] = useState(1);
    const [loadMoreStatus, setLoadMoreStatus] = useState('idle');

    let [searchParams, setSearchParams] = useSearchParams();
    const query = {};
    query.topic = searchParams.get('topic') || '';
    query.order = searchParams.get('order') || 'desc';
    query.sortBy = searchParams.get('sort_by') || 'votes';
   
    useEffect(() => {
        const getArticle = getArticleById(article_id);
        const getComments = getArticleComments(article_id, commentsLimit, commentPage);

        Promise.all([getArticle, getComments])
            .then(([article, comments]) =>{
                setPageStatus('loaded');

                setArticle(article);
                setCommentCount(article.comment_count);
                setSavedCommentCount(article.comment_count);

                setComments(comments);
                setSavedComments(comments);
            })
            .catch((err) => handleError(err, setPageStatus));
    }, []); 

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

    function onDeleteArticle(){

        setPageStatus('deleting article');

        deleteArticle(article_id)
            .then(() => navigate('/'))
            .catch((err) => {
                alert('Something went wrong, please try again');
                setPageStatus('loaded');
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

    // loading comment pagination
    function onDisplayMore(e) {

        setCommentPage(commentPage + 1);
        setLoadMoreStatus('loading');

        getArticleComments(article_id, commentsLimit, commentPage + 1)
            .then(newComments => {
                setComments([...comments, ...newComments]);
                setLoadMoreStatus('idle')
            })
        .catch(() => {
                alert('Could not load more comments, please try again');
                setLoadMoreStatus('idle');
                setCommentPage(commentPage - 1);
        });
    }

    function displayButton() {

        if ((commentPage*commentsLimit) < commentCount && pageStatus === "loaded"){
            const buttonText = loadMoreStatus === 'idle' ? "Display More ???" : "Loading...";
            return <button className="display-more-button" onClick={onDisplayMore}>{buttonText}</button>;
        }
    }

    return (
        <>
        <SearchBar query={query} setSearchParams={setSearchParams}/>
        <main>
            {displayPageStatusFeedback(pageStatus, 'Article Not Found')}
            {pageStatus === 'loaded' &&
            <section className="display-page">
                <Article user={user} article={article} thumbnail={false} commentCount={commentCount} onDelete={onDeleteArticle}/>
                <AddComment user={user} onPostComment={onPostComment}/>
                <p className="comment-label">{comments.length ? 'Comments: ' : 'No Comments'}</p>
                {comments.map(comment => <Comment key={comment.comment_id} 
                comment={comment} user={user} deleteComment={onDeleteComment}/>)}
                {displayButton()}
            </section>
            }
        </main>
        </>
    );
}

export default DisplayArticle;