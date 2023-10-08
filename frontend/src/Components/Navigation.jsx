// Material UI Navigation Bar with CSV Template Download dropdown menu that downloads
// correctly formatted CSV templates for the user to fill out and upload to the database
// incorrectly formatted CSV files will not be accepted by the database as an example

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navigation() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  function handleDownload(templateType) {
    let data = "";
    switch (templateType) {
      case "Correct":
        data = `Model Number,Unit Price,Quantity
           Blueridge BMY917,15.99,5
           Blueridge BMY1817,20.49,3
           Blueridge BMY2417,25.00,10`;
        break;
      case "Incorrect Model Number":
        data = `Model Number,Unit Price,Quantity
           ---,15.99,5
           -,20.49,3
           ,25.00,10`;
        break;
      case "Incorrect Unit Price":
        data = `Model Number,Unit Price,Quantity
           Blueridge BMY917,fifteen,5
           Blueridge BMY1817,,3
           Blueridge BMY2417,twenty-five,10`;
        break;
      case "Incorrect Quantity":
        data = `Model Number,Unit Price,Quantity
           Blueridge BMY917,15.99,5.5
           Blueridge BMY1817,20.49,three
           Blueridge BMY1817,20.49,-1
           Blueridge BMY2417,25.00,`;
        break;
      default:
        console.error("Unknown template type:", templateType);
        return;
    }

    // Create a blob from the data and download it
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${templateType} Template.csv`;
    document.body.appendChild(a); // Required for Firefox
    a.click();
    a.remove(); // Remove the link after downloading
    handleMenuClose();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Purchase Orders
        </Typography>

        {/* CSV Template Download Dropdown */}
        <Button
          color="inherit"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleMenuClick}
        >
          Download CSV Template
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleDownload("Correct")}>
            Correct Template
          </MenuItem>
          <MenuItem onClick={() => handleDownload("Incorrect Model Number")}>
            Incorrect Model Number Template
          </MenuItem>
          <MenuItem onClick={() => handleDownload("Incorrect Unit Price")}>
            Incorrect Unit Price Template
          </MenuItem>
          <MenuItem onClick={() => handleDownload("Incorrect Quantity")}>
            Incorrect Quantity Template
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;