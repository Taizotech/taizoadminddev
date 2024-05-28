/* eslint-disable react/jsx-no-target-blank */
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import style from "./sidenavbar.module.scss";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // useEffect(() => {
  //   const isActiveSubRoute = route.subRoutes.some(
  //     (subRoute) => location.pathname === subRoute.path
  //   );
  //   setIsMenuOpen(isActiveSubRoute);
  // }, [location.pathname, route.subRoutes]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <div className={`${style.menu}`} onClick={toggleMenu}>
        <div className={`${style.menu_item}`}>
          <div className={`${style.icon}`}>{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className={`${style.link_text}`}
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -180,
                  }
                : { rotate: 0 }
            }
            style={{ cursor: "pointer" }}
          >
            <FaAngleDown />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className={`${style.menu_container}`}
          >
            {route.subRoutes.map((subRoute, i) => (
              <div key={i + "key"}>
                <motion.div variants={menuItemAnimation} custom={i}>
                  {subRoute.path && (
                    <NavLink to={subRoute.path} className={`${style.link}`}>
                      <div className={` ms-4 ${style.icon}`}>
                        {subRoute.icon}
                      </div>
                      <motion.div className={`${style.link_text}`}>
                        {subRoute.name}
                      </motion.div>
                    </NavLink>
                  )}

                  {subRoute.externalLink && (
                    <>
                      <a
                        href={subRoute.externalLink}
                        target="_blank"
                        className={`${style.link}`}
                      >
                        <div className={`${style.icon}`}>{subRoute.icon}</div>
                        <motion.div className={`${style.link_text}`}>
                          {subRoute.name}
                        </motion.div>
                      </a>
                    </>
                  )}
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
