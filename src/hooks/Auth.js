import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers";
import {
  login as userLogin,
  signup as userSignup,
  editUser,
  fetchFriends,
} from "../api";
import jwt from "jwt-decode";
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from "../utils";

//this is a custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// this is a custom hook  (we add those functions here to update the user state)
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getuser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchFriends();

        let friends = [];
        if (response.success) {
          friends = response.data.friends;
        }

        setUser({
          ...user,
          friends,
        });
      }
      setLoading(false);
    };
    getuser();
  }, []);

  const updateUser = async (userId, name, password, confirmpassword) => {
    const response = await editUser(userId, name, password, confirmpassword);
    console.log("response", response);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      console.log("success response", response);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  // why not here ??
  // const UserInformation = async(userId) => {
  //     const response =await userInfo();
  //      console.log('UserInformation response' , response);
  // }

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmpassword) => {
    const response = await userSignup(name, email, password, confirmpassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const updateUserFriends = (addfriend, friend) => {
    if (addfriend == true) {
      setUser({
        ...user,
        friends: [...user.friends, friend], // friends is the array jo add kia hai user state mei.
        // we are spreading the user friends who are already there,  and adding a new friend at the end
      });
      return;
    }

    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );
    setUser({
      ...user,
      friends: newFriends,
    });
  };

  return {
    user,
    signup,
    login,
    logout,
    loading,
    updateUser,
    updateUserFriends,
  };
};
