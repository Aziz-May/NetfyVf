import React, { useState } from "react";
import styles from './LogIn.module.css';
import classNames from "classnames";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LogIn() {
    const [email, setEmail] = useState(""); // State for storing email
    const [password, setPassword] = useState(""); // State for storing password
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate(); // React Router hook to navigate after successful login

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        try {
            // Send login request to backend API
            const response = await axios.post("http://localhost:5555/api/users/login", {
                email,
                password
            });
            // If login is successful, save the user data (e.g., token) and redirect
            console.log("Login success", response.data);
            // You can store the response (token, user details) in localStorage or context
            localStorage.setItem("user", JSON.stringify(response.data));

            // Redirect to the welcome page or dashboard
            navigate("/Welcome");
        } catch (error) {
            // Handle errors (invalid credentials, server errors, etc.)
            if (error.response) {
                setErrorMessage(error.response.data.message);
                alert("No User Found");
            } else {
                setErrorMessage("Something went wrong, please try again.");
            }
        }
    };

    return (
        <>  
        <div className={styles.containerOfContainer}>
            <div className={styles.container}>
                <div className={styles.login}>
                    <div className={styles.login__content}>
                        <h2 id="namelogin">Netfy</h2>

                        <form className={styles.login__form} onSubmit={handleLogin}>
                            <div>
                                <h1 className={styles.login__title}>
                                    <span>Login</span>
                                </h1>

                                <p className={styles.login__description}>
                                    Welcome! Please login to continue.
                                </p>
                            </div>

                            <div>
                                <div className={styles.login__inputs}>
                                    <div>
                                        <label htmlFor="email" className={styles.login__label}>Email</label>
                                        <input 
                                            className={styles.login__input} 
                                            type="email" 
                                            id="email" 
                                            placeholder="Enter your email address" 
                                            required
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className={styles.login__label}>Password</label>
                                        <div className={styles.login__box}>
                                            <input 
                                                className={styles.login__input} 
                                                type="password" 
                                                id="password" 
                                                placeholder="Enter your password" 
                                                required
                                                value={password} 
                                                onChange={(e) => setPassword(e.target.value)} 
                                            />
                                            <i className={styles.login__eye} id="input-icon"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.login__check}>
                                    <label className={styles.login__checkLabel} htmlFor="check">
                                        <input 
                                            className={styles.login__checkInput} 
                                            type="checkbox" 
                                            id="check" 
                                        />
                                        <i className={styles.login__checkIcon}></i>
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div>
                                <div className={styles.login__buttons} id="b1">
                                    {/* Log in button triggering the form submission */}
                                    <button type="submit" className={styles.login__button}>Log In</button>
                                    <br />
                                    <Link to="/SignUp">
                                        <button className={classNames(styles.login__button, styles.login__buttonGhost)} id="b2">Sign Up</button>
                                    </Link>
                                </div>

                                <a className={styles.login__forgot} href="#">Forgot Password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default LogIn;