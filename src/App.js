import { useSelector } from "react-redux";
import Registration from "./pages/Registration";
import { Route, Routes } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

// import Profile from "./components/profile";

function App() {
  const users = useSelector((state) => state.userData);

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/registr" element={<Registration />} />
        <Route path="/auth" element={<Authorization />} />
        <Route
          path="/"
          element={users.loggedInUser === null ? <Authorization /> : <Home />}
        />
        <Route
          path="/user"
          element={
            users.loggedInUser === null ? <Authorization /> : <UserPage />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
