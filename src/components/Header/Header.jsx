import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authReducer";
import { Box } from "@material-ui/core";
import classes from "./Header.module.scss";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout-icon.svg";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <Box className={classes.linkWrapper}>
          <NavLink
            className={(navData) =>
              navData.isActive
                ? `${classes.link} ${classes.active}`
                : classes.link
            }
            to={"/"}
            exact
          >
            Home
          </NavLink>
          {isAuth && (
            <button
              className={`${classes.link} ${classes.button}`}
              onClick={() => dispatch(logout())}
            >
              <LogoutIcon className={classes.buttonIcon} />
              <span>Logout</span>
            </button>
          )}
        </Box>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? `${classes.link} ${classes.active}`
              : classes.link
          }
          to={"/contacts"}
        >
          Contacts
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
