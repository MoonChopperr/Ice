import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

import './SignupForm.css'


function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    if (password.length < 7){
      return setErrors({
        confirmPassword:
          "Password must be a minimum of 7 characters"
      })
    }

    if (password.length > 20){
      return setErrors({
        confirmPassword:
          "Password must be a shroter than 20 characters"
      })
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="SU-background">
        <div className="sign-up-container">

          <div className="SU-title">CREATE YOUR ACCOUNT</div>

          <form className="SU-form" onSubmit={handleSubmit}>

            <label className='SU-text'>
              Email Address
              <div>
                <input className="SU-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>
            {errors.email && <p className="SU-error-message">{errors.email}</p>}


            <label className='SU-text'>
              Username
              <div>
                <input className="SU-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </label>
            {errors.username && <p className="SU-error-message">{errors.username}</p>}


            <label className='SU-text'>
              Password
              <div>
                <input className="SU-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>
            {errors.password && <p className="SU-error-message">{errors.password}</p>}


            <label className='SU-text'>
              Confirm Password
              <div>
                <input className="SU-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </label>
            {errors.confirmPassword && <p className="SU-error-message">{errors.confirmPassword}</p>}
            {errors.server && <p className="SU-error-message">{errors.server}</p>}

            <button className="SU-btn" type="submit">Sign Up</button>
          </form>

        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
