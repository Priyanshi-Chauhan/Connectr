import PropTypes from "prop-types";
import styles from "../styles/home.module.css";

const Comment = ({ commenty }) => {
  console.log("inside comment", commenty);
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{commenty.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        {/* <span className = {styles.postCommentLikes}>4</span> */}
      </div>
      <div className={styles.postCommentContent}>{commenty.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
