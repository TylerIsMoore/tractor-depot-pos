import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../state/reducers/auth";
import SignoutButton from "../SignoutButton";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <header className="App__Header">
      {isAuthenticated ? (
        <div>
          <div className="Employee-label">{currentUser?.name}</div>
          <div>
            <SignoutButton />
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
