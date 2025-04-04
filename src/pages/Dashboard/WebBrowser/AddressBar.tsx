import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Box, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AddressBar: React.FC<{ navigateTo: (url: string) => void }> = ({ navigateTo }) => {
  const [url, setUrl] = useState('');

  const handleNavigate = () => {
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    fetchCookies(fullUrl); // Use full URL for fetching cookies
    navigateTo(fullUrl);
  };


  // const handleNavigate = async () => {
  //   const fullUrl = url.startsWith("http") ? url : `https://${url}`;
  //   try {
  //     await invoke("create_webview", { url: fullUrl });
  //     console.log(`Opened WebView with URL: ${fullUrl}`);
  //   } catch (error) {
  //     console.error("Error creating WebView:", error);
  //   }
  // };



  const fetchCookies = async (url: string) => {
    try {
        await invoke("fetch_url", { url });
    } catch (error) {
        console.error("Error fetching cookies:", error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      style={{
        height: '60px', // Adjust the height here
        padding: '10px', // Add spacing
        backgroundColor: '#f5f5f5', // Optional for visibility
      }}
    >
      <IconButton color="primary" onClick={() => window.history.back()}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton color="primary" onClick={() => window.history.forward()}>
        <ArrowForwardIcon />
      </IconButton>
      <TextField
        fullWidth
        size="small"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            fetchCookies(url); // Fetch cookies when the user presses Enter
            handleNavigate();  // Navigate to the URL
          }
        }}
        sx={{ marginLeft: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          fetchCookies(url);  // Fetch cookies when the "Go" button is clicked
          handleNavigate();   // Navigate to the URL
        }}
      >
        Go
      </Button>

    </Box>
  );
};

export default AddressBar;
