import React, { useState } from "react";
import "./Login";
import "./regester.css";

import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Register = () => {
  const Navigate = useNavigate();
  // let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const Register = async (e) => {
    e.preventDefault();
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data1 = await res.json();
      // console.log(data);
      alert(data1.message);
      if (data1.success) Navigate("/");
      // history.push("/login");
    } else {
      alert("Invlid input");
    }
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
            <form className="register" onSubmit={Register}>
              {console.log("User", user)}
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="name"
                  value={user.name}
                  placeholder="Your Name"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  name="email"
                  value={user.email}
                  placeholder="Your Email"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Your Password"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-outline mb-4">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="reEnterPassword"
                  value={user.reEnterPassword}
                  placeholder="Re-enter Password"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  style={{ padding: "0rem 2rem" }}
                  type="submit"
                  className="btn btn-primary btn-lg"
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already register?{" "}
                  <button
                    style={{ padding: "0rem 2rem" }}
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                      Navigate("/");
                    }}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
