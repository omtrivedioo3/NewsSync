import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordForm from "./PasswordForm";

function ChangePassword() {

  const Navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const emailRef = useRef();
  const [otpForm, showForm] = useState(true);
  const sendOtp = async (e) => {
    try {
      e.preventDefault();
      const { email } = user;

      const res = await fetch("http://localhost:5000/email-send", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data1 = await res.json();
      if (data1.statusText == 'Success') {
        alert(data1.message);
        showForm(false);
      }

    }
    catch (err) {
      console.log(err);
    }



  }

  return (
    <div>
      <section className="vh-100" style={{ "background-color": "#f4f5f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              {otpForm ? <form method="post" id='otpForm'>
                <div className="card mb-3" style={{ "border-radius": ".5rem" }}>

                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <div className="row pt-1">
                        <div className="col-16 mb-3">
                          <h6>Email</h6>
                          <div className="form-outline mb-4">
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              name="email"
                              value={user.email}
                              ref={emailRef}
                              onChange={handleChange}
                              placeholder="Your Email"
                            // onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">

                          <p className="text-muted">
                            <button
                              type="button"
                              className="btn btn-outline-danger float-right"
                              onClick={sendOtp}
                            >
                              Send Otp
                            </button>
                          </p>
                        </div>
                        <div className="col-6 mb-3">

                          <p className="text-muted">
                            <button
                              type="button"
                              className="btn btn-outline-danger float-right"
                              onClick={() => {
                                Navigate("/");
                              }}
                            >
                              Back
                            </button>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
                : <PasswordForm user={user} />
              }
            </div>
            {/* </div> */}
          </div>
        </div>
      </section >
    </div >
  );
}

export default ChangePassword;
