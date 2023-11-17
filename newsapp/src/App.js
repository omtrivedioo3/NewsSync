import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./App.css";
import ChangePassword from "./components/ChangePassword";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import News from "./components/News";
import PasswordForm from "./components/PasswordForm";
import Register from "./components/Regester";
import User from "./components/User";
// iPVkXuK23PBILVBJ
// FwTDfh2eV057WasA -->database
function App() {
  const [user, setLoginUser] = useState({});
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [profile, setProfile] = useState(true);
  return (
    <div className="App">
      <Router>
        {user && user._id && profile ? (
          <NavBar setLoginUser={setLoginUser} />
        ) : (
          ""
        )}
        {user && user._id ? (
          <LoadingBar
            color="#f11946"
            progress={progress}
            height={3}
          // onLoaderFinished={() => setProgress(0)}
          />
        ) : (
          " "
        )}
        <Routes>
          {user && user._id ? (
            <Route
              exact
              path="/"
              element={
                <News
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="general"
                  pageSize={pageSize}
                  country="in"
                  category="general"
                />
              }
            ></Route>
          ) : (
            <Route
              exact
              path="/"
              element={<Login setLoginUser={setLoginUser} />}
            ></Route>
          )}
          <Route
            exact
            path="/user"
            element={
              <User
                setLoginUser={setLoginUser}
                setProfile={setProfile}
                profile={profile}
                user={user}
              />
            }
          ></Route>
          <Route
            exact
            path="/changePassword"
            element={
              <ChangePassword
                setLoginUser={setLoginUser}
                setProfile={setProfile}
                profile={profile}
                user={user}
              />
            }
          ></Route>
          <Route
            exact
            path="/passwordForm"
            element={
              <PasswordForm
                setLoginUser={setLoginUser}
                setProfile={setProfile}
                profile={profile}
                user={user}
              />
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                pageSize={pageSize}
                country="in"
                category="business"
              />
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                category="entertainment"
              />
            }
          ></Route>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="home"
                pageSize={pageSize}
                country="in"
                category="home"
              />
            }
          ></Route>
          <Route
            exact
            path="/general"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
              />
            }
          ></Route>
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                pageSize={pageSize}
                country="in"
                category="science"
              />
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
              />
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pageSize={pageSize}
                country="in"
                category="technology"
              />
            }
          ></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            exact
            path="/"
            element={<Login setLoginUser={setLoginUser} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
