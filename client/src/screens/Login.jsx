import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAsync, resetError, signout } from "../state/reducers/auth";

const Login = () => {
  const [employeeId, updateEmployeeId] = useState("");
  const [password, updatePassword] = useState("");

  const dispatch = useDispatch();

  const { isAuthenticated, error, currentUser } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/pos");
    }

    return () => {
      dispatch(resetError());
    };
  }, [isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginAsync({
        employeeId,
        password,
      })
    );
  };

  return (
    <div>
      <div>{error}</div>
      <div>
        <form className="Login-form" onSubmit={onSubmit}>
          <h3 className="Login-form-title">
            Key your employee ID and password to sign on.
          </h3>
          <div>
            <label className="Employee-label" htmlFor="employeeId">
              Employee Id
            </label>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => updateEmployeeId(e.target.value)}
            />
          </div>
          <div>
            <label className="Password-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Sign On
            </button>
          </div>
        </form>
      </div>
      <div className="Logo-container">
        <div className="Image-container">
          <img src="./public/images/tdi-logo.png" />
          <h3>TractorDepot.com</h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
