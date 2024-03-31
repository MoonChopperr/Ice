import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import SignupFormPage from "../SignupFormPage";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const signUp = () => {
    navigate("/signup");
  }

  return (
    <>
      <div className="sign-background">
        <div className="sign-in-container">
          <h1 className="S-in">Sign In</h1>
          {errors.length > 0 &&
            errors.map((message) => <p key={message}>{message}</p>)}
          <div className="sign-in-box">
            <div className='S-form'>
              <form nSubmit={handleSubmit}>
                <label className='S-email'>
                  SIGN IN WITH EMAIL
                  <div>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {errors.email && <p>{errors.email}</p>}
                </label>
                <label className='S-password'>
                  PASSWORD
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {errors.password && <p>{errors.password}</p>}
                </label>
                <button className='sign-in-btn' type="submit">Sign in</button>
              </form>

            </div>
          </div>
        </div>


        <div className="btm-page">
          <div className='new-to-steam'>
            New to Steam?
          </div>

          <div>
            <button onClick={signUp} className="create-acc">Create an account</button>
          </div>
        </div>

      </div>

    </>
  );
}

export default LoginFormPage;
