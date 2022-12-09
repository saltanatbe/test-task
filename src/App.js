import Registration from "./pages/Registration";
import { Route, Routes } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { initialize } from "./users/userSlice";
import { useEffect } from "react";

// import Profile from "./components/profile";

function App() {
  const users = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users.loading !== false) {
      dispatch(initialize());
    }
  });
  return (
    <div className="App">
      <Routes>
        <Route path="/registr" element={<Registration />} />
        <Route path="/auth" element={<Authorization />} />
        <Route
          path="/"
          element={users.loggedInUser === null ? <Authorization /> : <Home />}
        />
        <Route
          path="/user/:id"
          element={
            users.loggedInUser === null ? <Authorization /> : <UserPage />
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
