import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Link as MaterialLink } from "@material-ui/core";

import logo from "assets/images/logo.png";
import menuItem from "./menuItems";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "white"
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  productLogo: {
    display: "inline-block",
    borderLeft: `1px solid ${theme.palette.grey.A100}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em"
    }
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  iconButton: {
    float: "right"
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto"
  }
}));

function Header({ noTabs }) {
  const classes = useStyles();
  const location = useLocation();

  const [value, setValue] = useState(0);
  const [menuDrawer, setMenuDrawer] = useState(false);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const mobileMenuOpen = () => {
    setMenuDrawer(true);
  };

  const mobileMenuClose = () => {
    setMenuDrawer(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const current = () => {
    if (location.pathname === "/home") {
      return 0;
    }
    if (location.pathname === "/dashboard") {
      return 1;
    }
    if (location.pathname === "/signup") {
      return 2;
    }
    if (location.pathname === "/wizard") {
      return 3;
    }
    if (location.pathname === "/cards") {
      return 4;
    }

    return 0;
  };

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={2} alignItems="baseline">
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <Link to="/" className={classes.link}>
                  <img width={20} src={logo} alt="" />
                  <span className={classes.tagline}>FUHCM.com</span>
                </Link>
              </Typography>
            </div>
            {!noTabs && (
              <>
                <div className={classes.productLogo}>
                  <Typography>v1.0.0</Typography>
                </div>
                <div className={classes.iconContainer}>
                  <IconButton
                    onClick={mobileMenuOpen}
                    className={classes.iconButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={classes.tabContainer}>
                  <SwipeableDrawer
                    anchor="right"
                    open={menuDrawer}
                    onClose={mobileMenuClose}
                    onOpen={mobileMenuOpen}
                  >
                    <AppBar title="Menu" />
                    <List>
                      {menuItem.map(item => (
                        <ListItem
                          component={item.external ? MaterialLink : Link}
                          href={item.external ? item.pathname : null}
                          to={
                            item.external
                              ? null
                              : {
                                  pathname: item.pathname,
                                  search: location.search
                                }
                          }
                          button
                          key={item.label}
                        >
                          <ListItemText primary={item.label} />
                        </ListItem>
                      ))}
                    </List>
                  </SwipeableDrawer>
                  <Tabs
                    value={current() || value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                  >
                    {menuItem.map((item, index) => (
                      <Tab
                        key={index}
                        component={item.external ? MaterialLink : Link}
                        href={item.external ? item.pathname : null}
                        to={
                          item.external
                            ? null
                            : {
                                pathname: item.pathname,
                                search: location.search
                              }
                        }
                        classes={{ root: classes.tabItem }}
                        label={item.label}
                      />
                    ))}
                  </Tabs>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  noTabs: PropTypes.bool
};

Header.defaultProps = {
  noTabs: false
};

export default Header;
