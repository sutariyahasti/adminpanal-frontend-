import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react';

function AuthOTP({handleSubmit,otpDialogOpen,setOtpDialogOpen,setOtpValue ,otpValue}) {
  return (
    <>
      <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="otp"
            label="OTP"
            type="text"
            fullWidth
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOtpDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AuthOTP;
