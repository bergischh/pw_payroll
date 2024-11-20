import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
// import axios from '../api/axios';
import './Fonts.css';
import { registerUser } from '../api/axios';
import { Link } from 'react-router-dom';

const REGISTER_URL = "api/register/";

const Regis = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const [userFocus, setUserFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const userRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); // State untuk pendaftaran berhasil

  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{3,23}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email validation
  const passwordRegex = /^.{5,}$/;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(usernameRegex.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, confirmPassword]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    const v1 = emailRegex.test(email);
    const v2 = usernameRegex.test(username);
    const v3 = passwordRegex.test(password);
    
    // Menampilkan pesan error jika ada input yang tidak valid
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      console.log("Debugging: Invalid input entry");
      console.log({
        email: v1,
        username: v2,
        password: v3
      });
      return; // Menghentikan proses jika ada input yang tidak valid
    }
  
    try {
      const result = await registerUser({ email, username, password });
      console.log(result);
      setSuccess(true);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error response:", err.response);
      console.log("Debugging: Registration error");
    
      if (!err?.response) {
        setErrMsg("No Server Response");
        console.log("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Bad Request - Invalid data");
        console.log("Error: Bad Request - Invalid data", err.response.data);
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
        console.log("Debugging: Username taken");
      } else if (err.response?.data) {
        setErrMsg(`Registration Failed: ${err.response.data.detail || "Check input fields"}`);
        console.log("Debugging: Error message", err.response.data.detail || "Check input fields");
      } else {
        setErrMsg("Registration Failed");
        console.log("Debugging: Registration failed");
      }
      userRef.current.focus();
    }
    
  };
  
   
  return (
    <div
      className="card flex flex-col lg:flex-row items-center justify-center h-screen mx-auto w-full relative bg-cover bg-center"
      style={{ backgroundImage: "url('/img/latar-login.jpg')" }}
    >
      <div className="flex flex-col lg:flex-row relative bg-white lg:pl-10 rounded-[30px] w-[90%] lg:w-auto">
        <div className="lg:hidden pt-10 w-full flex flex-col items-center">
          <img src="/img/logo.png" alt="logo" className="w-16 mb-5 pic-logo" />
          <img
            src="/img/login-vector.png"
            alt="vector"
            className="w-3/4 mb-5"
          />
        </div>

        <div>
          <div className="hidden lg:block left-login pt-10 lg:mr-14 w-full lg:w-[55%]">
            <div className="logo flex mb-14">
              <img
                src="/img/logo.png"
                alt="logo"
                className="w-16 h-16 me-5 pic-logo"
              />
              <h1 className="text-4xl flex items-center">Create an account!</h1>
            </div>
          </div>

          <div className="lg:pt-10 lg:mr-14 w-full lg:w-[70%]">
            {success && (
              <p className="text-green-500 text-center">
                Registration Successful!
              </p>
            )}{" "}
            {/* Pesan sukses */}
            <form action="" method="post" onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email} // Bind state
                  onChange={handleEmailChange} // Update state
                  className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-400 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  name="username"
                  ref={userRef}
                  className="mt-1 block w-full px-3 py-2 border border-gray-400 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={username}
                  onChange={handleUsernameChange}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  aria-invalid={!validUsername ? "true" : "false"}
                />
                {userFocus && username && !validUsername && (
                  <p className="text-red-500 text-sm">
                    4-24 chars, start with a letter, use letters, numbers, or _
                    only.
                  </p>
                )}
              </div>

              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-400 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  aria-invalid={!validPassword ? "true" : "false"}
                />
                <Icon
                  icon={showPassword ? "iconamoon:eye" : "iconamoon:eye-off"}
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
                {pwdFocus && password && !validPassword && (
                  <p className="text-red-500 text-sm">
                    8-24 chars, with uppercase, lowercase, <br />
                    number, and special character.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-400 shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  aria-invalid={!validMatch ? "true" : "false"}
                />
                {matchFocus && confirmPassword && !validMatch && (
                  <p className="text-red-500 text-sm">Passwords must match.</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#9D83C1] text-white rounded-full shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Submit
              </button>
            </form>
            <p className="mx-auto text-center pt-5 pb-5">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block right-login bg-[#A996C5] pt-16 w-[400px] rounded-l-none rounded-[30px]">
          <img
            src="/img/login-vector.png"
            alt="vector"
            className="w-full ml-[-42px] img-vector"
          />
        </div>
      </div>
    </div>
  );
};

export default Regis;