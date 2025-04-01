// import React, { useState } from 'react';

// interface AddressBarProps {
//   navigateTo: (url: string) => void;
// }

// const AddressBar: React.FC<AddressBarProps> = ({ navigateTo }) => {
//   const [url, setUrl] = useState('');

//   const handleNavigate = () => {
//     navigateTo(url.startsWith('http') ? url : `https://${url}`);
//   };

//   return (
//     <div className="address-bar">
//       <button onClick={() => window.history.back()}>←</button>
//       <button onClick={() => window.history.forward()}>→</button>
//       <input
//         type="text"
//         placeholder="Enter URL..."
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//       />
//       <button onClick={handleNavigate}>Go</button>
//     </div>
//   );
// };

// export default AddressBar;

import React, { useState } from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AddressBar: React.FC<{ navigateTo: (url: string) => void }> = ({ navigateTo }) => {
  const [url, setUrl] = useState('');

  const handleNavigate = () => navigateTo(url.startsWith('http') ? url : `https://${url}`);

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
        sx={{ marginLeft: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleNavigate}>
        Go
      </Button>
    </Box>
  );
};

export default AddressBar;
