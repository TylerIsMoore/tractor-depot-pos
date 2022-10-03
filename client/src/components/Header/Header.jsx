import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../state/reducers/auth";
import SignoutButton from "../SignoutButton";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <header className="App-header">
      <div className="App-header-container">
        <div className="TDI-icon">
          <img src="./public/images/tdi-icon_1_25.png" />
        </div>
        {isAuthenticated ? (
          <div className="User-signout">
            <div className="User-label">{currentUser?.name}</div>
            <div>
              <SignoutButton />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
