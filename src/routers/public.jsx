import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";
import About from "../pages/about";
import Navbar from "../components/Navbar";
import Home from "../pages/home";
import Footer from "../components/Footer";
import styles from "../style";

const PublicRoutes = () => (
  <div
    className="bg-primary w-full overflow-hidden"
    style={{
      backgroundImage: `url(${"https://www.theagilityeffect.com/app/uploads/2022/09/GettyImages-1341437690-1-scaled.jpg"})`,
    }}
  >
    <Router>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
          <Routes>
            {["/", "*"].map((path, id) => (
              <Route key={id} exact path={path} element={<Home />} />
            ))}
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path={"/about"} element={<About />} />
            <Route exact path={"/signin"} element={<SignInForm />} />
            <Route exact path={"/signup"} element={<SignUpForm />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  </div>
);

export default PublicRoutes;
