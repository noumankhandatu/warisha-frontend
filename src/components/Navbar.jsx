import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { close, menu } from "../assets";
import gif from "../assets/splash/image.jpg";
import { navLinks, navLinksToken } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate()
  const handleLogout=()=>{
    if(token){
      localStorage.removeItem("jwtToken");
      window.location.reload()
      navigate('*')
    }
 
  }
  return (
    <div style={{ marginBottom: "5px" }}>
      <nav
        className="w-full flex  justify-evenly items-center navbar "
        style={{
          backgroundColor: "black",
          paddingRight: "30px",
          position: "fixed",
          zIndex: 9999,
          left: "0px",
        }}
      >
        <Link to="/home">
          <img src={gif} alt="hoobank" className=" h-[72px] pl-4" />
        </Link>
        {token ? (
          <ul className="list-none sm:flex hidden justify-end items-center flex-1 pr-4">
            {navLinks.map((nav, index) => {
              return (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <Link to={`${nav.id}`}>{nav.title}</Link>
                </li>
              );
            })}
            <button onClick={handleLogout} style={{backgroundColor:"#27c3e3" ,marginLeft:"40px"}}  class=" hover:bg-blue-700 ml-3 text-white font-bold py-2 px-4 rounded-full">
              Logout
            </button>
          </ul>
        ) : (
          <ul className="list-none sm:flex hidden justify-end items-center flex-1 pr-4">
            {navLinksToken.map((nav, index) => {
              return (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[18px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <Link to={`${nav.id}`}>{nav.title}</Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <Link to={`${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
                <button onClick={handleLogout}  class="bg-blue-500 hover:bg-blue-700 ml-3 text-white font-bold py-2 px-4 rounded-full">
              Logout
            </button>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
