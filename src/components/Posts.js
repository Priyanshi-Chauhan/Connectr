import {Link} from 'react-router-dom';
 import Comment from './Comment';
 import styles from '../styles/home.module.css';
import {useState} from 'react'
import {usePosts} from '../hooks';
import {useToasts} from 'react-toast-notifications'
import { createComment , toggleLike} from '../api';

const Posts =({post}) => {
const[comment, setComment] =  useState('');
const[creatingComment, setCreatingComment] = useState(false);
const posts = usePosts();
const {addToast} =useToasts();

const handleAddComment = async(e) => {
    if(e.key === 'Enter'){
        setCreatingComment(true);
        const response = await createComment(comment, post._id); 

        if(response.success){
            setComment('');
            posts.addComment(response.data.comment , post._id);
            addToast('Comment added successfully' , {
                appearance :'success',
            })
        }
        else {
            addToast(response.message , {
              appearance : 'error'
            })
        }
        setCreatingComment(false);
    }

}
 // due to the limitation of our api, we cannot update the like count over here, 
    const handlePostLikeClick = async () => {
        const response = await toggleLike(post._id, 'Post');
        if (response.success) {
            if (response.data.deleted) {
                addToast('Like Removed successfully', {
                    appearance: "success",
                });
            }
            else {
                addToast('Like added successfully', {
                    appearance: "success"
                })
            }
        }
        else {
            addToast(response.message, {
                appearance: "error"
            })
        } 
    }
    return (
<div className = {styles.postWrapper} key ={`post-${post._id}`}>
<div className ={styles.postHeader}>
<div className ={styles.postAvatar}>
    <img src= "https://img.icons8.com/?size=1x&id=23516&format=png"        
 alt="user-pic"/>
 <div>
 {/* // is there a way we can pass the user data(post.user) to the userProfile component */}
    <Link to ={
          { pathname : `/user/${post.user._id}`,     // this is mapped to the /users/:userId
          state : {
            user : post.user           // lets access this user state from UserProfile component
              }                             
         }         
       }     
       // but if we copy paste the link to another tab, state becomes undefined and we cannot access the users profile,.
       // this is because we are NOT coming to this url of (usersprofile) via the link which we have made, but we are simply copy pasting the url to another tab    
   className ={styles.postAuthor}>{post.user.name}</Link>
    <span className = {styles.postTime}>a minute ago</span>
 </div>
</div>

<div className= {styles.postContent}>{post.content}</div>

<div className= {styles.postActions}>

<div className= {styles.postLike}>
    
    <button onClick = {handlePostLikeClick}>
    <img src= "https://img.icons8.com/?size=1x&id=24816&format=png"
alt ="likes-icon"/>
    </button>
                    
<span>{post.likes.length}</span>
</div>

<div className ={styles.postCommentsIcon}>
<img src="https://img.icons8.com/?size=1x&id=42245&format=png"
alt="comments-icon"/>
<span>{post.comments.length}</span>
</div>

</div>

<div className={styles.postCommentBox}>
<input placeholder ="start typing a comment"
value ={comment}
onChange = {(e) => setComment(e.target.value)}
onKeyDown={handleAddComment}
/>
</div>

<div className= {styles.postCommentsList}>
{post.comments.map((comment) => {                                   
return <Comment commenty = {comment} />         //commenty is the prop name which is passed to the comment.js
})}

</div>
</div>
</div>
)}

export default Posts;