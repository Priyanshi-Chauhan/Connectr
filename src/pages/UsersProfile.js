import { useState, useEffect } from "react";
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useToasts } from "react-toast-notifications";
import { useParams, useHistory } from "react-router-dom";
import { userInfo, addFriend, removeFriend } from "../api";
import { Loader } from "../components";

const UsersProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setloading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams(); // useParams will give me an object from where i am basically getting the userId
  const { addToast } = useToasts();
  const history = useHistory();
  const auth = useAuth();

  console.log("userId", userId);
  console.log("settings auth", auth);

  useEffect(() => {
    const getUser = async () => {
      const response = await userInfo(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: "error",
        });

        return history.push("/"); // if user is not found(somehow got deleted), we will return the user back to home page
      }
      setloading(false);
    };
    getUser();
  }, [userId, history, addToast]); // userId is passed because if userId changes , we need to refresh the user details

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id); // collecting all the friends into friendIds
    const index = friendIds.indexOf(userId); // we are checking if the userId present in url(which is userId) is there in friendIds or not

    if (index !== -1) {
      // we found
      return true;
    }
    return false;
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      addToast("friend added successfully", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }
    setRequestInProgress(false);
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);
    if (response.success) {
      const friendship = auth.user.friends.filter(
        // response object mei nhi aayenge user k friends
        (friend) => friend.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      addToast("friend removed successfully", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="https://img.icons8.com/?size=1x&id=23516&format=png" alt="" />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
        {/* equivalent to user ? user.email : null */}
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? "Removing Friend...." : "Remove Friend"}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? "Adding Friend...." : "Add Friend"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UsersProfile;
