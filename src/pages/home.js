import styles  from '../styles/home.module.css';   // imported as object from styles/xyz.modules.css
import {Posts ,Loader, FriendList, CreatePost} from '../components';
import {useAuth , usePosts} from '../hooks';


const Home = () => {  
  const auth = useAuth();
   const posts = usePosts();
   console.log('auth' , auth);
    console.log('posts', posts);

  //commenting this for PostsProvider
//  useEffect(()=>{
//           const fetchPosts = async() => {
//           const response = await getposts();  
         
//           if(response.success){
//             console.log('response in home.js before', response);
//             setPosts(response.data.posts);
//             console.log('response in home.js after', response);
//           }

//           setLoading(false);
//         };

//         fetchPosts();
          
//     }, []);


if(posts.loading){
    return <Loader />
}
    return (
        <div className= {styles.home}>
        <div className ={styles.postsList}>
        <CreatePost />
            {posts.data.map((post) =>(
                <Posts post ={post}  key ={`post-${post._id}`}/>
             ))}
</div>
{auth.user && <FriendList />}
</div>
    )
}

// Home.propTypes = {
//     posts :PropTypes.array.isRequired,          // means it should be array and is mandatory
// }
export default Home;