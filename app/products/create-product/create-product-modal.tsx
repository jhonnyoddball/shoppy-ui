"use client";

import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState, CSSProperties } from "react";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import createProduct from "../actions/create-product";
import { CloudUpload } from "@mui/icons-material";

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const fileInputStyles: CSSProperties = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "1px",
};

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateProductModal({ open, handleClose }: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();
  const [fileName, setFileName] = useState<string>("");

  const onClose = () => {
    setResponse(undefined);
    handleClose();
    setFileName("");
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles}>
        <form className="w-full max-w-xs" action={async (formData) => {
          const response = await createProduct(formData);
          setResponse(response);
          if (!response?.error) {
            onClose();
          }
        }} >
          <Stack spacing={2}>
            <h2 className="text-lg font-bold mb-4">Create Product</h2>
            <TextField name="name" label="Product Name" variant="outlined" required fullWidth helperText={response?.error} error={!!response?.error} />
            <TextField name="description" label="Description" variant="outlined" required fullWidth multiline rows={4} helperText={response?.error} error={!!response?.error} />
            <TextField name="price" label="Price" variant="outlined" required fullWidth helperText={response?.error} error={!!response?.error} />
            <Button component="label" variant="outlined" color="primary" startIcon={<CloudUpload />} fullWidth>
              Upload File
              <input
                type="file"
                name="image"
                // hidden
                // accept="image/*"
                style={fileInputStyles}
                onChange={(e) => setFileName(e.target.files ? e.target.files[0].name : "")}
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              {fileName}
            </Typography>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
