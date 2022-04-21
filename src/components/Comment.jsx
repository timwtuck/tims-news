import Votes from "./Votes";
import { patchCommentVote } from "../api";

const Comment = ({comment, user, deleteComment}) => {

    return (
        <section className="comment">
            <p className="comment__author">Posted by: {comment.author}</p>
            <p className="comment__body">{comment.body}</p>
            <Votes cssClass="comment__votes" votes={comment.votes} 
                id={comment.comment_id} apiCall={patchCommentVote}/>

            {user===comment.author && <button className="comment__delete"
                onClick={() => deleteComment(comment.comment_id)}>delete</button>}
        </section>
    )
}

export default Comment;