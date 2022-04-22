import { useState } from "react";


const AddComment = ({user, onPostComment}) => {

    const [text, setText] = useState('');

    function postComment() {

        if (!text)
            return;

        onPostComment(text, setText);
        setText('')
    }

    return (
        <section className="add-comment">
            <p>Add Comment: </p>
            <textarea value={text} 
                onChange={(e) => setText(e.target.value)}/>
            <button className={`add-comment__button--${text?'enabled':'disabled'}`}
                onClick={postComment}>Post Comment</button>
        </section>  
    )
}

export default AddComment;