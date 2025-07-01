import likeIcon from '../assets/icons/like.png';
import dislikeIcon from '../assets/icons/dislike.png';
import editComment from '../assets/icons/edit.png';
import deleteComment from '../assets/icons/delete.png';
import { useEffect, useRef, useState } from 'react';

function Comments({comments, setComments, videoId, isUserLoggedIn}){
    const [isInputFocused, setInputFoucused] = useState(false);
    const [isUserTyping, setUserTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isEdit, setEdit] = useState(false);
    const [commentId, setCommentId] = useState(""); // this is set only when user click on the edit button

    // using useRef for the scroll to add comment input element
    const commentComponent = useRef(null);
 
    // cancel and comment buttons will appear
    function handleOnFocusEvent(){
        setInputFoucused(true);
    }
    
    //adding new comment
    async function handleAddComment(){
        const comment = {
            text: inputValue,
            userName: JSON.parse(localStorage.getItem("LoggedInUserData"))?.username,
            internalUser: true
        };

        //adding comment in database
        if(isUserLoggedIn){
            try{
            const response = await fetch(`http://localhost:5050/comment/${videoId}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "authorization": `JWT ${JSON.parse(localStorage.getItem("LoggedInUserData"))?.accessToken}`
                },
                body: JSON.stringify(comment)
            })
            
            const data = await response.json();
            if(response.ok){
                //adding comment in DOM 
                setComments(prev => [comment, ...prev]);
                alert("Comment has been added!");
            }else{
                if(data.message == 'TOKEN NOT FOUND!'){
                    alert("Kindly Login First to add a comment!!")
                }else{
                    alert(data.message);
                }
            }
        }catch(err){
            console.log(err.message);
        }
        }else{
            alert("Kindly Login First to add a comment!!");
        }
        
        setInputFoucused(false);
        setInputValue("");
    }

    // changing of states after pressing the cancel button on adding comment section
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
    
    // handlnig editing comment on DOM
    function handleEditComment(comment){
        setInputValue(comment.text);
        setCommentId(comment._id);
        setInputFoucused(true);
        setEdit(true)

        // scroll to add comment section after person clicks on edit comment icon
        commentComponent.current?.scrollIntoView({behavior: "smooth"});
    }

    // saving the edited comment in the database and DOM
    async function handleSaveEditedComment(){
        const comment = {
            text: inputValue,
        };

        console.log(comments)

        //saving comment in database
        try{
            const response = await fetch(`http://localhost:5050/comment/${commentId}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            })
            
            const data = await response.json();
            if(response.ok){
                //updating the edited and saved comment on DOM
                setComments(prev => {
                    const updatedComment = prev.find(comment => comment._id === commentId);
                    if (!updatedComment) return prev;

                    const newComment = { ...updatedComment, text: inputValue }; // new object and overwriting the text with new input value rather than directly mutating it
                    const remaining = prev.filter(comment => comment._id !== commentId);
                    return [newComment, ...remaining]; // reordered, no mutation
                });

                //short method
                // setComments(prev => prev.map(comment => comment._id == commentId ? {...comment, text: inputValue} : comment));

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
        //deleting comment from database
        try{
            const response = await fetch(`http://localhost:5050/comment/${id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json"
                }
            })
            
            const data = await response.json();
            if(response.ok){
                //deleting comment in DOM
                setComments(prev => prev.filter(comment => comment._id != id));
                alert(data.message);
            }else{
                alert(data.message);
            }
        }catch(err){
            console.log(err.message);
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
            <div className="comment_main_container">
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

                                    {isUserLoggedIn && comment?.internalUser && <div className="edit_and_delete_user_comment">
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