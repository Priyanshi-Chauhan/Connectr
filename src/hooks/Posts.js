import {useContext, useState, useEffect} from 'react';
import {PostsContext} from '../providers';
import {getposts} from '../api';


//custom hook
export const usePosts = () => {
    return useContext(PostsContext);
}

export const useProvidePosts = () => {
    const[posts, setPosts] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(()=>{
                  const fetchPosts = async() => {
                  const response = await getposts();  
                 
                  if(response.success){
                    setPosts(response.data.posts);
                  }
        
                  setLoading(false);
                };
                fetchPosts();   
            }, []);

        const addPostToState = (post) =>{
        const newposts =[post , ...posts];    // adding the latest post and spreading the already there posts
        setPosts(newposts);
            }

         const addComment = (comment, postId) => {
          const newPosts = posts.map((post) => {
             if(post._id === postId){
               return {...post, comments : [...post.comments, comment]}   // all the details of the post is spread;  
                                //  ...post.comments => current comments of the post
              } 
             return post;
          })
          setPosts(newPosts);
         }   

        
     return {
        data : posts, 
        loading ,
        addPostToState,
        addComment
     }
}