import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useAppContext } from '../../context/app-context';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginModal = (props) => {
    const { setUser, fetchUser, axios } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const navigate = useNavigate();

    // initial state button is disabled - now only checks for email and password
    // in 'login' state, but for 'register' it should also check for name
    const isButtonDisabled = state === "login" 
        ? !email || !password
        : !name || !email || !password;

    // A single validation function that checks all necessary fields based on the current state.
    const validateForm = (currentState, currentName, currentEmail, currentPassword) => {
        const newErrors = {};

        if (currentState === "register") {
            if (currentName.trim() === "") {
                newErrors.name = "User name is required";
            } else if (currentName.length < 4) {
                newErrors.name = "Username must contain 4 characters";
            }
        }
        
        if (currentEmail.trim() === "") {
            newErrors.email = "Email is required";
        } else if (!currentEmail.includes("@")) {
            newErrors.email = "Enter a valid email";
        }


        if (currentPassword.trim() === "") {
            newErrors.password = "Password is required";
        } else if (currentPassword.length < 8) { // Changed < 7 to < 8 for consistency with error message
            newErrors.password = "Password must be at least 8 characters";
        } else if (!/[!@#$%^&*()_+\-={};':|,.<>?]/.test(currentPassword)) {
            newErrors.password = "Use a special character to make your password stronger";
        }

        return newErrors;
    };
    
    // Function to handle the form validation and state update on input change
    const handleValidation = (
        newState = state, 
        newName = name, 
        newEmail = email, 
        newPassword = password
    ) => {
        const newErrors = validateForm(newState, newName, newEmail, newPassword);
        // Only set errors for the fields that are currently visible/relevant for the state
        if (newState === "login") {
            // Remove the name error when in login state
            delete newErrors.name; 
        }
        setErrors(newErrors);
    };

    // --- OnChange Handlers with Validation ---

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        handleValidation(state, newName, email, password);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        handleValidation(state, name, newEmail, password);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        handleValidation(state, name, email, newPassword);
    };
    
    // --- State Change Handler with Validation ---
    const handleStateChange = (newState) => {
        // Clear old errors and set new state
        setErrors({});
        setState(newState);
        // Re-validate to check for any current field errors in the new state
        // This is crucial for name validation when switching to 'register'
        if (newState === 'register') {
            handleValidation(newState, name, email, password);
        } else if (newState === 'login') {
             handleValidation(newState, name, email, password);
        }
    }


    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        
        // Final validation before submission
        const newErrors = validateForm(state, name, email, password);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            toast.error("Please correct the errors in the form.");
            return; // Stop submission if there are errors
        }

        try {
            const {data} = await axios.post(`/api/user/${state}`, {
                name, email, password
            })
            if (data.success) {
                navigate('/');
                setUser(data.user);
                fetchUser();
                toast.success('Logged in successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
        }
    }

    return (
        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered >

                <form onSubmit={onSubmitHandler} className="w-100 px-5 py-5">

                    {state === "login" ? <p className="login-heading">Login to Your <span>Account</span> </p> : <p className="login-heading">Create an <span>Account</span> </p>}

                    {state === "register" && (
                        <div className="w-100">
                            <p className='form-label'>Name</p>
                            {/* Use the new onChange handler */}
                            <input onChange={handleNameChange} value={name} placeholder="Enter your name" className="form-control form-controll mb-2" type="text" required />
                            {errors.name && (
                                <span className="error-message">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="w-100 ">
                        <p className='form-label mt-17px'>Email</p>
                        {/* Use the new onChange handler */}
                        <input onChange={handleEmailChange} value={email} placeholder="Enter your email" className="form-control form-controll mb-2" type="email" required />
                        {errors.email && (
                            <span className="error-message">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="w-100 ">
                        <p className='form-label mt-17px'>Password</p>
                        {/* Use the new onChange handler */}
                        <input onChange={handlePasswordChange} value={password} placeholder="Enter password" className="form-control form-controll mb-2" type="password" required />
                        {errors.password && (
                            <span className="error-message">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {state === "register" ? (
                        <p className='ptxt mt-17px'>
                            Already have account? <span onClick={() => handleStateChange("login")} className="text-danger c-pointer">login here</span>
                        </p>

                    ) : (
                        <p className='ptxt mt-17px'>
                            Create an account? <span onClick={() => handleStateChange("register")} className="text-danger c-pointer">click here</span>
                        </p>

                    )}

                    {/* Removed props.onHide from button's onClick as the modal should only close on successful login */}
                    <button className="site-btn w-100" type="submit" disabled={isButtonDisabled}>
                        {state === "register" ? "Create Account" : "Login"}
                    </button>

                </form>

            </Modal>
        </>
    );
};

export default LoginModal;