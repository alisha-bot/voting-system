

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'

const Login = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", mobile: "", password: "", aadhar: ""
    });
    const [errors, setErrors] = useState({});
    let name, value;

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        return re.test(String(email).toLowerCase());
    }

    const validateMobile = (mobile) => {
        return /^\d{10}$/.test(mobile);
    }

    const validateAadhar = (aadhar) => {
        return /^\d{12}$/.test(aadhar);
    }

    const validateName = (name) => {
        const re = /^[a-zA-Z]+$/;
        return re.test(name);
    }

    const validatePassword = (password) => {
        const lengthRegex = /.{8,}/; // Password length >= 8
        const lowercaseRegex = /[a-z]/; // At least one lowercase letter
        const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
        const numberRegex = /\d/; // At least one digit
        const specialCharRegex = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/; // At least one special character
    
        return (
            lengthRegex.test(password) &&
            lowercaseRegex.test(password) &&
            uppercaseRegex.test(password) &&
            numberRegex.test(password) &&
            specialCharRegex.test(password)
        );
    };
    

    const validateForm = () => {
        let formErrors = {};
        if (!user.name || !validateName(user.name)) formErrors.name = "Name can only contain letters";
        if (!user.name) formErrors.name = "Name is required";
        if (!user.email || !validateEmail(user.email)) formErrors.email = "Valid email is required";
        if (!user.mobile || !validateMobile(user.mobile)) formErrors.mobile = "Mobile number must be 10 digits";
        if (!user.password) formErrors.password = "Password is required";
        if (!user.aadhar || !validateAadhar(user.aadhar)) formErrors.aadhar = "Aadhar number must be 12 digits";
        if (!user.password || !validatePassword(user.password)) formErrors.password = "Password must be strong";
        return formErrors;
    }

    const PostData = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        const errorMessages = Object.values(formErrors).join("\n");
        
        if (errorMessages) {
            window.alert("User can't register");
            return;
        }
    
        const { name, email, mobile, password, aadhar } = user;
    
        const res = await fetch('/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, mobile, password, aadhar })
        });
    
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("User already exists. Try logging in");
            history.push('/signin');
        } else {
            window.alert("Registration Successful");
            history.push('/signin');
        }
    }
    
    



    return (
        <>
       
            <Container>
                <Form>
                    <form method="POST">
                        <div className="head">Register</div>
                        <div className="name">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter your Name" value={user.name} onChange={handleInput} />
                            {errors.name && <Error>{errors.name}</Error>}
                        </div>
                        <div className="mobile">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input type="text" name="mobile" id="mobile" placeholder="Enter your Mobile Number" value={user.mobile} onChange={handleInput} />
                            {errors.mobile && <Error>{errors.mobile}</Error>}
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter your email address" value={user.email} onChange={handleInput} />
                            {errors.email && <Error>{errors.email}</Error>}
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter your Password" value={user.password} onChange={handleInput} />
                            {errors.password && <Error>{errors.password}</Error>}
                        </div>
                        <div className="aadhar">
                            <label htmlFor="aadhar">Aadhar Number</label>
                            <input type="text" name="aadhar" id="aadhar" placeholder="Enter your aadhar number" value={user.aadhar} onChange={handleInput} />
                            {errors.aadhar && <Error>{errors.aadhar}</Error>}
                        </div>
                        <button type="submit" onClick={PostData}>Register</button>
                    </form>
                </Form>
            </Container>
        </>
    );
};

export default Login;

// const Container = styled.div`
//     height: 79vh;
//     width: 100vw;
//     display: flex;
//     justify-content: center;
//     align-items: center;
   
// `;

// const Form = styled.div`
//     height: 80%;
//     width: 30%;
//     border-radius: 4px;
//     box-shadow: 1px 1px 5px black;
//     border: 2px solid black;
//     padding: 2rem;
//     overflow: hidden

//     @media all and (max-width: 1236px) {
//         width: 40%;
//     }

//     @media all and (max-width: 1000px) {
//         width: 50%;
//     }

//     @media all and (max-width: 900px) {
//         width: 60%;
//     }

//     @media all and (max-width: 800px) {
//         width: 70%;
//     }
//     @media all and (max-width: 700px) {
//         width: 80%;
//     }
//     @media all and (max-width: 400px) {
//         width: 90%;
//         padding: 0;
//     }

//     form {
//         display: flex;
//         flex-direction: column;
//         gap: 1.4rem;
//         height: 100%;


//         .password, .email, .aadhar, .name, .mobile {
//             display: flex;
//             flex-direction: column;
//             padding: 0px 2rem;
//             overflow:hidden

//             input {
//                 height: 1.4rem;
//             }
//         }

//         .head {
//             height: 10%;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             font-size: 1.8rem;
//         }
//     }

//     button {
//         margin: 0px 2rem;
//         height: 2rem;
//         background: rgba(0, 0, 0, 0.2);
//         border: none;
//         outline: none;
//         cursor: pointer;
//         border-radius: 4px;
//     }

//     input[type=number]::-webkit-inner-spin-button, 
//     input[type=number]::-webkit-outer-spin-button { 
//         -webkit-appearance: none; 
//         margin: 0; 
//     }
// `;

// const Error = styled.div`
//     color: red;
//     font-size: 0.8rem;
//     margin-top: 0.5rem;
// `;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    overflow:hidden;
`;

const Form = styled.div`
    width: 30%;
    padding: 1.5rem; /* Changed padding from 2rem to 1.5rem */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 1236px) {
        width: 40%;
    }

    @media (max-width: 1000px) {
        width: 50%;
    }

    @media (max-width: 900px) {
        width: 60%;
    }

    @media (max-width: 800px) {
        width: 70%;
    }

    @media (max-width: 700px) {
        width: 80%;
    }

    @media (max-width: 400px) {
        width: 90%;
        padding: 1rem; /* Changed padding from 1rem to 0.75rem */
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 0.4rem; /* Changed gap from 1.5rem to 1rem */

        .password, .email, .aadhar, .name, .mobile {
            display: flex;
            flex-direction: column;

            label {
                margin-bottom: 0.4rem; /* Changed margin-bottom from 0.5rem to 0.4rem */
                font-weight: 500;
                color: #333;
            }

            input {
                padding: 0.6rem; /* Changed padding from 0.8rem to 0.6rem */
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 0.9rem; /* Changed font-size from 1rem to 0.9rem */
                transition: border-color 0.3s;

                &:focus {
                    border-color: #007bff;
                    outline: none;
                }
            }
        }

        .head {
            text-align: center;
            font-size: 1.8rem; /* Changed font-size from 2rem to 1.8rem */
            font-weight: 600;
            margin-bottom: 0.8rem; /* Changed margin-bottom from 1rem to 0.8rem */
            color: #007bff;
        }
    }

    button {
        padding: 0.6rem; /* Changed padding from 0.8rem to 0.6rem */
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`;

const Error = styled.div`
    color: red;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    font-weight: 500;
`;
