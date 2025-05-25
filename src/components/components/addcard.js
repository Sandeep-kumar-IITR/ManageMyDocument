
import React, { useState } from 'react';
import {
  Box,
  Fab,
  Drawer,
  Typography,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import UserContext from '../../allcontext';

export default function AddCard() {
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(UserContext);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPdfFile, setFormPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {  setCreatedoc } = useContext(UserContext);

  const userToken = user.access;
  const handleFormSubmit = async () => {
    if (!formTitle || !formPdfFile) {
      alert('Please fill the title and upload a PDF.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('Title', formTitle);
    formData.append('discription', formDescription);
    formData.append('pdf_file', formPdfFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/ap/create/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          // NOTE: Do NOT set Content-Type header; browser will set it for FormData
        },
        body: formData,
      });

      setCreatedoc((prev) => prev + 1); // Increment createdoc count
      setOpenForm(false)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || JSON.stringify(errorData) || 'Unknown error'
        );
      }


    } catch (error) {
      setMessage('Error creating document: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Add DocCard Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 24,
          zIndex: 1100,
        }}
      >
        <Fab
          color="info"
          onClick={() => setOpenForm(true)}
          aria-label="Add Document"
          sx={{ backgroundColor: '#14b8a6', '&:hover': { backgroundColor: '#0f766e' } }}
        >
          <LibraryAddIcon />
        </Fab>
      </Box>

      {/* Add Document Form Drawer */}
      <Drawer anchor="right" open={openForm} onClose={() => setOpenForm(false)}>
        <Box sx={{ width: 360, p: 3, height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Add New Document</Typography>
            <IconButton onClick={() => setOpenForm(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Upload PDF
            <input
              hidden
              accept="application/pdf"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFormPdfFile(e.target.files[0]);
                }
              }}
            />
          </Button>
          {formPdfFile && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Selected file: {formPdfFile.name}
            </Typography>
          )}

          {message && (
            <Typography
              variant="body2"
              color={message.startsWith('Error') ? 'error' : 'primary'}
              sx={{ mb: 2 }}
            >
              {message}
            </Typography>
          )}

          <Box sx={{ mt: 'auto' }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleFormSubmit}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
