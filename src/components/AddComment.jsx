import { useState } from "react";


const AddComment = ({user, onPostComment}) => {

    const [text, setText] = useState(user?'':'You must login to post a comment');

    function postComment() {

        if (!text)
            return;

        onPostComment(text, setText);
        setText('')
    }

    return (
        <section className="add-comment">
            <p>Add Comment: </p>
            <textarea value={text} disabled={user?false:true}
                onChange={(e) => setText(e.target.value)}/>
            <button className={`add-comment__button--${text?'enabled':'disabled'}`}
                disabled={user?false:true}
                onClick={postComment}>Post Comment</button>
        </section>  
    )
}

export default AddComment;