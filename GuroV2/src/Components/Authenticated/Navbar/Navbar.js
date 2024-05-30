import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { ClosedMenu, OpenMenu } from "../../../assets/icons/Icons";
import eguro_logo from "../../../assets/img/eguro_logo.png";
import { callSubjects } from "../../../store/slices/subjectSlice";
import "../../../ui/Navbar.css";
import useOnClickOutside from "./useOnClickOutside";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const [showImage] = useState(true);

  useEffect(() => {
    dispatch(callSubjects());
  }, [dispatch]);

  const ref = useRef();

  const [isNavOpen, setNavOpen] = useState(false);

  const handleClose = () => setNavOpen(false);
  useOnClickOutside(ref, () => setNavOpen(false));
  useOnClickOutside(ref, () => setNavOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={` bg-[#F7F0E7] z-50 px-4 transition-all duration-300 fixed w-full top-0  ease-in-out ${
        visible ? "opacity-100" : "opacity-0 -translate-y-full"
      } ${
        location.pathname === "/Schoolbook"
          ? "bg-transparent text-white"
          : "drop-shadow-md text-[#B7B7B7]"
      }`}
    >
      <nav className="hidden sm:block">
        <div className="flex items-center justify-between">
          <NavLink to="/">
            <img
              src={eguro_logo}
              className="w-20 cursor-pointer"
              alt=""
              data-aos="fade-down"
              data-aos-duration="500"
            />
          </NavLink>
          <ul
            data-aos="fade-down"
            data-aos-duration="800"
            className="list-none my-7 mb-0 px-6 py-2.5 font-semibold  md:flex space-x-8 tracking-light text-sm items-center"
          >
            <NavLink
              to="/"
              duration={300}
              id="navlink"
              activeclassname="active"
            >
              Guro Platform
            </NavLink>
            <NavLink
              to="/Schoolbook"
              duration={300}
              id="navlink"
              activeclassname="active"
            >
              Schoolbook
            </NavLink>
            <NavLink
              to="/about"
              duration={300}
              id="navlink"
              activeclassname="active"
            >
              About
            </NavLink>
          </ul>
        </div>
      </nav>
      <nav className="my-5">
        <div ref={ref}>
          <div className="flex justify-between md:hidden">
            <div className=""></div>
            <div className="block sm:hidden">
              {location.pathname !== "/Schoolbook" || !showImage ? (
                <div>
                  <NavLink to="/">
                    <img
                      src={eguro_logo}
                      className="w-16 cursor-pointer"
                      alt=""
                      data-aos="fade-down"
                      data-aos-duration="500"
                    />
                  </NavLink>
                </div>
              ) : null}
            </div>

            <div
              onClick={() => setNavOpen(!isNavOpen)}
              className="sm:hidden block "
            >
              {isNavOpen ? <OpenMenu /> : <ClosedMenu />}
            </div>
          </div>
          <div
            className={`md:hidden md:items-center md:pb-0 pb-12 py-10 absolute md:static bg-background shadow-md md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-1 transition-all duration-500 ease-in ${
              isNavOpen ? "top-0" : "top-[-490px]"
            }`}
          >
            <div className="pl-8 text-sm text-left">
              <ul className="uppercase font-semibold text-gray-600 my-5 mb-0">
                <li href="#" className="p-4">
                  <NavLink to="" onClick={handleClose}>
                    Guro
                  </NavLink>
                </li>
                <li href="#" className="p-4">
                  <NavLink to="Schoolbook" onClick={handleClose}>
                    Schoolbook
                  </NavLink>
                </li>
                <li href="#" className="p-4">
                  <NavLink to="about" onClick={handleClose}>
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
