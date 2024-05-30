import Icon from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export const SeeMoreIcon = (props) => (
  <Icon
    component={() => (
      <svg
        width="85"
        height="24"
        viewBox="0 0 95 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="11" width="80" height="2" fill="#525252" />
        <path
          d="M75 11V13H87L81.5 18.5L82.92 19.92L90.84 12L82.92 4.08002L81.5 5.50002L87 11H75Z"
          fill="#525252"
        />
      </svg>
    )}
    {...props}
  />
);

export const SearchIcon = (props) => {
  const location = useLocation();
  const [shadow, setShadow] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const path = document.querySelector("path");

    if (location.pathname === "/schoolbook") {
      path.setAttribute("stroke", scrollPosition > 0 ? "white" : "#B7B7B7");
    } else {
      path.setAttribute("stroke", "#B7B7B7");
    }

    setShadow(scrollPosition > 0);
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <Icon
      component={() => (
        <svg
          width="25"
          height="25"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.4167 28.4166L25.8334 25.8333M14.8542 27.125C16.4656 27.125 18.0613 26.8076 19.5501 26.1909C21.0388 25.5743 22.3915 24.6704 23.531 23.5309C24.6704 22.3915 25.5743 21.0388 26.191 19.55C26.8076 18.0612 27.125 16.4656 27.125 14.8541C27.125 13.2427 26.8076 11.6471 26.191 10.1583C25.5743 8.66954 24.6704 7.31681 23.531 6.17736C22.3915 5.0379 21.0388 4.13404 19.5501 3.51737C18.0613 2.90071 16.4656 2.58331 14.8542 2.58331C11.5998 2.58331 8.47865 3.87613 6.17742 6.17736C3.87619 8.47858 2.58337 11.5997 2.58337 14.8541C2.58337 18.1086 3.87619 21.2297 6.17742 23.5309C8.47865 25.8322 11.5998 27.125 14.8542 27.125Z"
            stroke={location.pathname === "/Schoolbook" ? "white" : "#B7B7B7"}
            onScroll={handleScroll}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {...props}
    />
  );
};

export const NextIcon = (props) => (
  <Icon
    component={() => (
      <svg
        width="32"
        height="32"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4113 25.8227C20.2661 25.8227 25.8227 20.2661 25.8227 13.4113C25.8227 6.55656 20.2661 1 13.4113 1C6.55656 1 1 6.55656 1 13.4113C1 20.2661 6.55656 25.8227 13.4113 25.8227Z"
          stroke="black"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.8474 17.7924L16.2162 13.4112L11.8474 9.03003"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
    {...props}
  />
);

export const OpenMenu = (props) => (
  <Icon
    component={() => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        data-aos="fade"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    )}
    {...props}
  />
);

export const ClosedMenu = (props) => (
  <Icon
    component={() => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        data-aos="fade"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    )}
    {...props}
  />
);
