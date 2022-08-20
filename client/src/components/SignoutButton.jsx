import { useDispatch } from "react-redux";
import { signout } from "../state/reducers/auth";
import { reset } from "../state/reducers/transaction";

const SignoutButton = () => {
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(reset());
    dispatch(signout());
  };

  return <button onClick={handleSignout}>Sign out</button>;
};

export default SignoutButton;
