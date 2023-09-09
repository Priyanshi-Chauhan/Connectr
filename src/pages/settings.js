import { useState } from "react";
import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";
import { useToasts } from "react-toast-notifications";

const Settings = () => {
  const auth = useAuth();
  const [editmode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user.name ? auth.user.name : "");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState();
  const [savingform, setSavingForm] = useState(false);
  const { addToast } = useToasts();
  console.log("settings auth ", auth);

  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmpassword) {
      addToast("Please fill all the fields", {
        appearance: "error",
      });
      error = true;
    }

    if (password !== confirmpassword) {
      addToast("Password and Confirm Password does not match", {
        appearance: "error",
      });
      error = true;
    }
    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmpassword
    );
    console.log("Settings response", response);

    if (response.success) {
      setEditMode(false);
      setSavingForm(false);
      clearForm(); // we need to clear the passwrd and confirmpassword fields

      return addToast("user updated successfully", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }
    setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="https://img.icons8.com/?size=1x&id=23516&format=png" alt="" />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
        {/* optional chaining*/}
        {/* equivalent to auth.user ? auth.user.email : null*/}
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editmode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editmode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            {/*we are allowing user to change password*/}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>ConfirmPassword</div>
            {/* we are allowing user to change confirmpassword */}
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editmode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingform}
            >
              {savingform ? "SavingProfile ...." : "Save Profile"}
            </button>

            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
