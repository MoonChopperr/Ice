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

  console.log('currUser@@@@', currUser)

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
      email:'demo@user.io',
      password:'password'
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
                  {errors.email && <p>{errors.email}</p>}
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
                  {errors.password && <p>{errors.password}</p>}
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
        </div>

      </div>

    </>
  );
}

export default LoginFormPage;
