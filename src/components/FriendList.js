import styles from "../styles/home.module.css";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";

const FriendList = () => {
  const auth = useAuth();
  const { friends = [] } = auth.user; // so that if there are no friends, it does not throw error

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {friends && friends.length === 0 && (
        <div className={styles.noFriends}> No Friends found !!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <div key={`friend-${friend._id}`}>
              <Link className={styles.friendsItem}
              to={{
                pathname: `/user/${friend.to_user._id}`, // this is mapped to the /users/:userId
                state: {
                  user: friend.to_user, // lets access this user state from UserProfile component
                },
              }}
              //Prevoiusly ->>>> if we copy paste the link to another tab, state becomes undefined and we cannot access the users profile,.
              // this is because we are NOT coming to this url of (usersprofile) via the link which we have made, but we are simply copy pasting the url to another tab
              
            >
              <div className={styles.friendsImg}>
                <img
                  src="https://img.icons8.com/?size=1x&id=23516&format=png"
                  alt=""
                />
              </div>
              <div className={styles.friendsName}>{friend.to_user.email}</div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FriendList;
