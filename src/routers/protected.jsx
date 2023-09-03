import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";
import About from "../pages/about";
import Home from "../pages/home";
import Footer from "../components/Footer";
import styles from "../style";
import Navbar from "../components/Navbar";
import GeneratorPage from "../pages/generator";
import CollectionPage from "../pages/collection";
import GArt from "../pages/GArt";

const ProtectedRoutes = () => (
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
              <Route key={id} exact path={path} element={<GeneratorPage />} />
            ))}
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path={"/about"} element={<About />} />
            <Route exact path={"/generator"} element={<GeneratorPage />} />
            <Route exact path={"/collection"} element={<CollectionPage />} />
            <Route exact path={"/art"} element={<GArt />} />
            <Route exact path={"/signin"} element={<SignInForm />} />
            <Route exact path={"/signup"} element={<SignUpForm />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  </div>
);

export default ProtectedRoutes;
