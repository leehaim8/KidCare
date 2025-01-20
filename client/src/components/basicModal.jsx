import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function BasicModal({ child }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen} className="responsive-button">
        Quick Info
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h3>Father: {child.contactInfo.father}</h3>
            <h3>Mother: {child.contactInfo.mother}</h3>
            <h3>Parents' Phone: {child.contactInfo.phone}</h3>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
