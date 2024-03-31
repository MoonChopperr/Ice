import { useState } from "react";
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
          {errors.server && <p>{errors.server}</p>}
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
            {errors.email && <p>{errors.email}</p>}


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
            {errors.username && <p>{errors.username}</p>}


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
            {errors.password && <p>{errors.password}</p>}


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
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}


            <button className="SU-btn" type="submit">Sign Up</button>
          </form>

        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
