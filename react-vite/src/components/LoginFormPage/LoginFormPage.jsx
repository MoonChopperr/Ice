import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import SignupFormPage from "../SignupFormPage";
import * as sessionActions from "../../redux/session";


import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // console.log('currUser@@@@', currUser)

  if (currUser) return <Navigate to="/" replace={true} />;

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

  //demo user
  const demoUser = (e) => {
    e.preventDefault()
    setErrors({})
    const demoUser = {
      email: 'demo@aa.io',
      password: 'password'
    }
    return dispatch(sessionActions.thunkLogin(demoUser))
      // .then(()=> navigate('/'))
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          setErrors(data.errors)
        }
      })
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
              <form onSubmit={handleSubmit}>
                <label className='S-email'>
                  SIGN IN WITH EMAIL
                  <div>
                    <input
                      className="sign-in-text"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </label>
                <label className='S-password'>
                  PASSWORD
                  <div>
                    <input
                      className="sign-in-text"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </label>
                <button className='sign-in-btn' type="submit">Sign in</button>
                <button className='sign-in-demo' type='submit' onClick={demoUser}> Sign in as a Demo User</button>
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
            <div style={{ color: 'white', fontWeight: 500 }}>OR</div>
          <div className="signup-in-oathcontainer">
                <a href={`${window.origin}/api/auth/oauth_login`}>
                <button class="gsi-material-button">
                  <div class="gsi-material-button-state"></div>
                  <div class="gsi-material-button-content-wrapper">
                    <div class="gsi-material-button-icon">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                        <path fill="none" d="M0 0h48v48H0z"></path>
                      </svg>
                    </div>
                    <span class="gsi-material-button-contents">Sign up with Google</span>
                  </div>
                </button>
                </a>
              </div>
        </div>

      </div>

    </>
  );
}

export default LoginFormPage;
