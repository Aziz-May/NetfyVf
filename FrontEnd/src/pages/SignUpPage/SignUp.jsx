import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';

function SignUp() {
    const [username, setUsername] = useState(""); // State for storing username
    const [email, setEmail] = useState(""); // State for storing email
   
    const [password, setPassword] = useState(""); // State for storing password
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate(); // React Router hook to navigate after successful sign-up

    // Handle sign-up form submission
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            // Send sign-up request to backend API
            const response = await axios.post("http://localhost:5555/api/users/register", {
                username,
                email,
                password
            });

            // If sign-up is successful, redirect to the login page
            console.log("Sign-up success", response.data);
            navigate("/LogIn");
        } catch (error) {
            // Handle errors (user already exists, server errors, etc.)
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong, please try again.");
            }
        }
    };

    return (
        <>
        <section id="signup" className={styles.signupSection}>
            <div className={styles.signupContainer}>
                <h2>Sign Up</h2>

                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                <form id="signupForm" className={styles.signupForm} onSubmit={handleSignUp}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username"> usernme</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="username" 
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email"> e-mail Adress</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="e-mail Adress" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                  

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            placeholder="Confirmez votre password" 
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button className={styles.submitButton} type="submit">Sign Up</button>
                </form>

                <p>Already have an account ? <br />
                    <Link to="/LogIn">
                        <button className={styles.connect}>Login</button>
                    </Link>
                </p>
            </div>
        </section>
        </>
    );
}

export default SignUp;
