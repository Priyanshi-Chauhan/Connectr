import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { useAuth } from "../hooks";
import { searchUsers } from "../api";

const Navbar = () => {
  const [searchresults, setSearchresults] = useState([]);
  const [searchText, setSearchtext] = useState("");

  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);
      if (response.success) {
        setSearchresults(response.data.users);
      }
    };
    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setSearchresults([]);
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      {/* left part*/}
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            className={styles.logo}
            alt=""
            src="https://www.zohowebstatic.com/sites/default/files/styles/product-home-page/public/connect-icon_1.png?itok=s3N1b559"
          />
        </Link>
        <span className={styles.con}>Connectr</span>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="http://cdn.onlinewebfonts.com/svg/img_391459.png"
          alt=""
        />
        <input
          placeholder="Search Users"
          value={searchText}
          onChange={(e) => setSearchtext(e.target.value)}
        />

        {searchresults.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {searchresults.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://img.icons8.com/?size=1x&id=23516&format=png"
                      alt=" "
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/*right part*/}
      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://img.icons8.com/?size=1x&id=23516&format=png"
                alt="profile"
                className={styles.userDp}
              />
            </Link>

            <span>{auth.user.name}</span>
          </div>
        )}
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log Out </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in </Link>
                  {/*similar to anchor tag, but it uses "to" and doesn't refreshes the page*/}
                </li>

                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
