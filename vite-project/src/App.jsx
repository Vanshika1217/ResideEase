import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import ExploreHotels from "./pages/ExploreHotels";
// import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/explore" element={<ExploreHotels />} />
        </Routes>
     
      </>
  );
}

export default App;
