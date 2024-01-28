import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

interface IMenu {
  title: string;
  action: () => void;
}

interface KebakProps {
  menu: IMenu[];
}

export default function KebabMenu({ menu }: KebakProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            borderRadius: 15,
          },
        }}
      >
        {menu.map((option: IMenu) => (
          <MenuItem
            key={option.title}
            // selected={option.title === "Pyxis"}
            onClick={() => {
              option.action();
              handleClose();
            }}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
