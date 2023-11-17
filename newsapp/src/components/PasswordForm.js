import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const PasswordForm = ({ user }) => {
    const Navigate = useNavigate();
    const [user1, setUser1] = useState({
        code: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser1({
            ...user1,
            [name]: value,
        });
    };

    const changePasswordFunc = async (e) => {
        e.preventDefault();
        const { code, password, cpassword } = user1;
        try {
            if (code && password && password === cpassword) {
                Object.assign(user1, user);
                console.log(user1);
                console.log(user.email);

                const res = await fetch("http://localhost:5000/change-password", {
                    method: "POST",
                    body: JSON.stringify(user1),
                    headers: { "Content-Type": "application/json" },
                });
                const data1 = await res.json();
                alert(data1.message);

                if (data1.statusText)
                    Navigate("/");

                // setLoginUser(data1.user);
            } else {
                alert("Invlid input");
            }
        } catch (err) {
            alert(err);
        }
        // if (data1.success) {
        //     Navigate("/");
        // }
    };

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form className="PasswordForm">
                            {/* {console.log("User", user)} */}

                            <div className="form-outline mb-4">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    name="code"
                                    maxLength="4"
                                    value={user1.code}
                                    onChange={handleChange}
                                    placeholder="Enter your Otp Code"
                                ></input>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    name="password"
                                    minLength="8"
                                    value={user1.password}
                                    onChange={handleChange}
                                    placeholder="Enter your Password"
                                ></input>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    className="form-control form-control-lg"
                                    type="cpassword"
                                    name="cpassword"
                                    value={user1.cpassword}
                                    onChange={handleChange}
                                    placeholder="Enter your Password"
                                ></input>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    style={{ padding: "0rem 2rem" }}
                                    onClick={changePasswordFunc}
                                    className="btn btn-primary btn-lg"
                                >
                                    Change Password
                                </button>
                                <button
                                    style={{ padding: "0rem 2rem" }}
                                    onClick={() => {
                                        Navigate("/");
                                    }}
                                    className="btn btn-primary btn-lg"
                                >
                                    Back
                                </button>

                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PasswordForm;
