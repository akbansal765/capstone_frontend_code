import likeIcon from '../assets/icons/like.png';
import dislikeIcon from '../assets/icons/dislike.png';
import editComment from '../assets/icons/edit.png';
import deleteComment from '../assets/icons/delete.png';
import { useEffect, useRef, useState } from 'react';

function Comments({comments, videoId}){
    const [isInputFocused, setInputFoucused] = useState(false);
    const [isUserTyping, setUserTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isEdit, setEdit] = useState(false);
    const [commentId, setCommentId] = useState(""); // this is set only when user click on the edit button

    const commentComponent = useRef(null);
    const commentsContainer = useRef(null);
 
    // cancel and comment buttons will appear
    function handleOnFocusEvent(){
        setInputFoucused(true);
    }

    async function handleAddComment(){
        const comment = {
            text: inputValue,
            userName: JSON.parse(localStorage.getItem("LoggedInUserData"))?.username || "Guest User",
            internalUser: true
        };
        comments.unshift(comment);
        console.log(comments);

        try{
            const response = await fetch(`http://localhost:5050/comment/${videoId}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            })
            
            const data = await response.json();
            if(response.ok){
                alert("Comment has been added!")
            }else{
                alert(data.message);
            }
        }catch(err){
            console.log(err.message);
        }
        
        setInputFoucused(false);
        setInputValue("");
    }

    function handleCancelComment(){
        setInputFoucused(false);
        setUserTyping(false);
        setInputValue('');
        setEdit(false)
    }
    
    function handleOnChange(e){
        setInputValue(e.target.value);
        setUserTyping(true);
    }

    function handleEditComment(comment){
        setInputValue(comment.text);
        setCommentId(comment._id);
        setInputFoucused(true);
        setEdit(true)

        // scroll to add comment section after person clicks on edit comment icon
        commentComponent.current?.scrollIntoView({behavior: "smooth"});
    }

    async function handleSaveEditedComment(){
        const comment = {
            text: inputValue,
        };

        try{
            const response = await fetch(`http://localhost:5050/comment/${commentId}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            })
            
            const data = await response.json();
            console.log(data);
            if(response.ok){
                const allComments = [...commentsContainer.current.childNodes]
                const commentContainer = allComments.find(el => el.id == commentId);
                const comment = commentContainer.querySelector(".comment_text");
                comment.innerText = inputValue;
                
                alert(data.message);
            }else{
                alert(data.message);
            }
        }catch(err){
            console.log(err.message)
        }

        setInputValue("")
        setInputFoucused(false)
        setEdit(false);
    }
    
    async function handleDeleteComment(id){
        try{
            const response = await fetch(`http://localhost:5050/comment/${id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json"
                }
            })
            
            const data = await response.json();
            console.log(data);
            if(response.ok){
                const allComments = [...commentsContainer.current.childNodes]
                const commentContainer = allComments.find(el => el.id == id);
                commentContainer.remove();
                
                alert(data.message);
            }else{
                alert(data.message);
            }
        }catch(err){
            console.log(err.message)
        }
    };

    // un-populate the comment button if the user has typed nothing
    useEffect(() => {
      if(inputValue == ""){
        setUserTyping(false);
      }
    }, [inputValue]);


    return (
        <div className="comments_component" ref={commentComponent}>
            <p className="totalComments">{comments?.length} comments</p>
            <input onFocus={handleOnFocusEvent} onChange={handleOnChange} value={inputValue} type="text" className="addComment_input" placeholder='Add a comment...'/>
            {isInputFocused && <div className="cancel_addComment_buttons_box">
                                    <button onClick={handleCancelComment} className="cancel_comment">Cancel</button>
                                    {!isEdit &&<button onClick={handleAddComment} disabled={!isUserTyping} className={`add_comment ${isUserTyping ? 'user_typing' : 'user_not_typing'}`}>Comment</button>}
                                    {isEdit && <button onClick={handleSaveEditedComment} disabled={!isUserTyping} className={`add_comment ${isUserTyping ? 'user_typing' : 'user_not_typing'}`}>Save</button>}
                               </div>}
            <div ref={commentsContainer} className="comment_main_container">
               {comments?.map((comment, i) => {
                return <div className="comment_container" key={comment?._id || i} id={comment._id}>
                            <div className="comment_user_icon_box">
                                <div className="user_icon">
                                    <p>{comment?.userName?.slice(0, 1)}</p>
                                </div>
                            </div>
                
                            <div className="comment_box">
                                <div className="comment_username_timestamp">
                                    <p className="comment_username">@{comment?.userName}</p>
                                    <p className="comment_timestamps">{comment?.timestamp?.split("T")[0]}</p>
                                </div>
                                <p className="comment_text">{comment?.text}</p>
                                <div className="comment_like_dislike_reply_btns">
                                    <div className="comment_like_dislike_reply_buttons_box">
                                        <button className="comment_like_btn">
                                                <img src={likeIcon} alt="like comment" />
                                        </button>
                                        <button className="comment_dislike_btn">
                                                <img src={dislikeIcon} alt="dislike comment" />
                                        </button>
                                        <p>Reply</p>
                                    </div>

                                    {comment?.internalUser && <div className="edit_and_delete_user_comment">
                                                                <button onClick={() => handleEditComment(comment)} className="edit_comment">
                                                                    <img src={editComment} alt="edit comment" />
                                                                </button>
                                                                <button onClick={() => handleDeleteComment(comment._id)} className="delete_comment">
                                                                    <img src={deleteComment} alt="delete comment" />
                                                                </button>
                                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        
               })}
            </div>


        </div>
    )
}

export default Comments;