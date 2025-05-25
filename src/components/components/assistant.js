import React from 'react';
// import axios from 'axios';
import {
  Box,
  Fab,
  Drawer,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import UserContext from '../../allcontext';
export default function Assistant() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const {user} = useContext(UserContext);
const [ loading , setLoading] = React.useState(false);

const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = input.trim();
  setMessages([...messages, { from: 'user', text: userMessage }]);
  setInput('');

  setLoading(true); // Optional: if you want to show a spinner or disable input
  try {
    const response = await fetch('/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.access}`, // Make sure userToken is defined
      },
      body: JSON.stringify({ user_message: userMessage }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || JSON.stringify(errorData) || 'Unknown error'
      );
    }

    const data = await response.json();
    const aiResponse = data.assistant_response || 'No response from AI.';

    setMessages((prev) => [...prev, { from: 'ai', text: aiResponse }]);
  } catch (error) {
    console.error('AI chat error:', error);
    setMessages((prev) => [
      ...prev,
      { from: 'ai', text: 'Error fetching AI response: ' + error.message },
    ]);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      {/* Floating Chat Button */}
  <Box
  sx={{
    position: 'fixed',
    bottom: 16,    // 16px from bottom
    right: 24,
    zIndex: 1100,
  }}
>
  <Fab
    color="primary"
    onClick={() => setOpen(true)}
    sx={{ backgroundColor: '#3b82f6', '&:hover': { backgroundColor: '#2563eb' } }}
  >
    <ChatIcon />
  </Fab>
</Box>

      {/* Slide-in Chat Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 500, height: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, backgroundColor: '#3b82f6', color: 'white' }}>
            <Typography variant="h6">AI Assistant</Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          {/* Chat Area */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  mb: 1,
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.from === 'user' ? '#dbeafe' : '#f3f4f6',
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: '80%',
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            ))}
          </Box>

          {/* Input */}
          <Divider />
          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              fullWidth
              size="small"
              variant="outlined"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button variant="contained" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
