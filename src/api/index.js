import { LOCALSTORAGE_TOKEN_KEY } from "../utils";
import {API_URLS, getFormBody} from '../utils'; 

const customfetch = async (url, {body, ...customConfig}) => {

    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const headers = {
    'content-type' :'application/x-www-form-urlencoded',
}

if(token){
     headers.Authorization  = `Bearer ${token}`;
}

const config = {
    ...customConfig,
    headers : {
        ...headers, 
        ...customConfig.headers,
    }
}

if(body){
     //config.body = JSON.stringify(body);
config.body = getFormBody(body);
}

    try {
        const response = await fetch(url, config);
        const data = await response.json(); 
     
        if(data.success){
        return {
            data :data.data,
            success :true
        }
      }
      throw new Error(data.message);
    } catch (error) {
   console.log('error');
   return {
    message : error.message,
    success :false
  }
    }
}

export const getposts = (page = 1 , limit = 5) => {
    return customfetch(API_URLS.posts(page, limit), {
        method:'GET'
    })
}

export const login = (email, password) => {
     return  customfetch(API_URLS.login() , {
     method :'POST' ,
     body : {email, password : password}
     } )
}

export const signup = async(name , email , password, confirmpassword) => {
     return customfetch(API_URLS.signup() , {
        method : "POST",
        body : {name , email , password, confirm_password: confirmpassword}
     })

}

export const editUser = async(userId, name, password, confirmpassword) => {
    return customfetch(API_URLS.editUser() , {
        method :'POST', 
        body : {id : userId , name, password,confirm_password :  confirmpassword}

    })
}
// jisne post ki hai , us user ki info ka yeh function hai
export const userInfo = (userId) => {
    return customfetch(API_URLS.userInfo(userId) , {
        method :'GET',  
    })
}

export const fetchFriends = () => {
     return customfetch(API_URLS.friends() , {
        method :'GET'
     })
}

export const addFriend = (userId) => {
     return customfetch(API_URLS.createFriendship(userId) ,{
method :'POST'        
     } )
}
export const removeFriend =(userId) => {
    return customfetch(API_URLS.removeFriend(userId), {
        method :'POST'
    })
}

export const addPost = (content) => {
     return customfetch(API_URLS.createPost() ,  {
        method:"POST",
        body : {
             content
                    }
     })
}

export const createComment =async (content, postId) => {
    return customfetch(API_URLS.comment() , {
        method :'POST',
        body : {
            post_id :postId, 
            content : content
        }
    })
}
 //itemType is either the post or the comment, whatever is the toggling 
export const toggleLike =(itemId ,itemType) => {
    return customfetch(API_URLS.toggleLike(itemId, itemType), {
        method :'POST',
    })
}

// we want to call the api , when the user is typing in the search bar  -> for this we will use useEffect hook , as soon as searchText changes, useEffect will make api calls again and again
export const searchUsers = (searchText) => {
    return customfetch(API_URLS.searchUsers(searchText), {
        method : 'GET', 
    })
}