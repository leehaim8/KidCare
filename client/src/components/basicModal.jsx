import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



export default function BasicModal(child) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div >
      <Button onClick={handleOpen}>Quick Info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h3>father: {child.child.contactInfo.father}</h3>
            <h3>mother: {child.child.contactInfo.mother}</h3>
            <h3>parents phone: {child.child.contactInfo.phone}</h3>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
