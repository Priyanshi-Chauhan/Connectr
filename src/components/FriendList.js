import styles from '../styles/home.module.css';
import {useAuth} from  '../hooks';
import {Link} from 'react-router-dom';

const FriendList = () => {
     const auth = useAuth();
     const {friends =[]} = auth.user;   // destructuring the friends which is coming from auth.user state

    return (
        <div className ={styles.friendsList}>
            <div className= {styles.header} >
                Friends
            </div>
            {friends && friends.length === 0 && (<div className = {styles.noFriends}> No Friends found !!</div>) }

 {friends &&  friends.map(friend  => (<div key = {`friend-${friend._id}`}>
  <Link className = {styles.friendsItem} to= {`/friend/${friend._id}`}>
    <div className = {styles.friendsImg}>
        <img src="https://img.icons8.com/?size=1x&id=23516&format=png"
        alt =""
           />
        </div>
        <div className ={styles.friendsName}>{friend.to_user.email}</div>
</Link>
 </div>))}

        </div>
    )
}

export default FriendList;