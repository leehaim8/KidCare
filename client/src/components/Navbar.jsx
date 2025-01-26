import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Group as GroupIcon,
  BarChart as BarChartIcon,
  Autorenew as AutorenewIcon,
  LibraryBooks as LibraryBooksIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("birthdayModalShown");
    navigate("/login");
  };

  return (
    <div>
      {/* Icon Button to Open Menu */}
      <IconButton onClick={toggleMenu} color="inherit">
        <MenuIcon />
      </IconButton>

      {/* Drawer Component */}
      <Drawer anchor="left" open={isOpen} onClose={toggleMenu}>
        <div className="drawer-container">
          {/* Header Section with Close Button */}
          <div className="drawer-header">
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleMenu}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider className="menu-divider" />

          {/* Top Navigation Links */}
          <List>
            <ListItem
              button
              component={Link}
              to="/HomePage"
              onClick={toggleMenu}
              className="menu-link"
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="HomePage" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/attendence"
              onClick={toggleMenu}
              className="menu-link"
            >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Children's Attendance" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/WeeklyFeedback"
              onClick={toggleMenu}
              className="menu-link"
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Weekly Feedback" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/PeriodicFeedback"
              onClick={toggleMenu}
              className="menu-link"
            >
              <ListItemIcon>
                <AutorenewIcon />
              </ListItemIcon>
              <ListItemText primary="Periodic Feedback" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/ResourceLibrary"
              onClick={toggleMenu}
              className="menu-link"
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Resource Library" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/Experts"
              onClick={toggleMenu}
              className="menu-link"
            >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="External Professional Directory" />
            </ListItem>
          </List>

          <Divider className="menu-divider" />

          {/* Bottom Links */}
          <List>
            <ListItem
              button
              onClick={handleLogout}
              className="menu-link"
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log-out" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="#"
              onClick={toggleMenu}
              className="menu-link"
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default HamburgerMenu;
