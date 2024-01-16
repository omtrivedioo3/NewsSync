import React, { useEffect } from "react";
import ShareLink from "react-linkedin-share-link";
import { useNavigate } from "react-router-dom";

function User({ setLoginUser, setProfile, profile, user }) {
  const update = () => {
    setProfile(!profile);
  };
  // const Navigate = useNavigate();

  useEffect(() => {
    update();
  }, []);

  const Navigate = useNavigate();
  return (
    <section className="vh-100" style={{ "background-color": "#f4f5f7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ "border-radius": ".5rem" }}>
              <div className="row g-0">
                <div
                  className="col-md-4 gradient-custom text-center text-white"
                  style={{
                    "border-top-left-radius": ".5rem",
                    "border-bottom-left-radius": ".5rem",
                  }}
                >
                  <img
                    src="https://picsum.photos/250/250"
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "80px" }}
                  />
                  <h5>Marie Horwitz</h5>
                  <p>Web Designer</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-16 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{user.email}</p>
                      </div>
                    </div>
                    <div className="row pt-1">
                      <div className="col-20 mb-3">
                        <h6>Name</h6>
                        <p className="text-muted">{user.name}</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        {/* <h6>Recent</h6> */}
                        <p className="text-muted">
                          <button
                            type="button"
                            className="btn btn-outline-danger float-right"
                            onClick={() => {
                              setProfile(!profile);
                              Navigate("/");
                            }}
                          >
                            Home
                          </button>
                        </p>
                      </div>
                      <div className="col-6 mb-3">
                        {/* <h6>Most Viewed</h6> */}
                        <p className="text-muted">
                          <button
                            type="button"
                            className="btn btn-outline-danger float-right"
                            onClick={() => {
                              setLoginUser({});
                              setProfile(!profile);
                              Navigate("/");
                            }}
                          >
                            Log Out
                          </button>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="https://www.linkedin.com/in/om-trivedi-8a1411224/">
                        <i className="fab fa-linkedin fa-lg">
                          {/* <ShareLink link="https://www.linkedin.com/in/om-trivedi-8a1411224/" /> */}
                          <ShareLink link="https://www.linkedin.com/in/om-trivedi-8a1411224/">
                            {(link) => <a href={link} target="_blank"></a>}
                          </ShareLink>
                        </i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default User;
{
  /*
   */
}
