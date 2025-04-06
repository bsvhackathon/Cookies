import React, { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Box, TextField, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { WalletClient, Transaction, SHIPBroadcasterConfig, SHIPBroadcaster } from '@bsv/sdk';
import { Addr, toByteString } from 'scrypt-ts';
import { CookieContract } from '../../../contracts/cookieContract';
import cookieArtifacts from '../../../../artifacts/cookieContract.json';
CookieContract.loadArtifact(cookieArtifacts)




const AddressBar: React.FC<{ navigateTo: (url: string) => void }> = ({ navigateTo }) => {
  const [url, setUrl] = useState('');

  const handleNavigate = async () => {
    window.parent.postMessage({ type: "messageType", data: "Your data here" }, "*");

    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    fetchCookies(fullUrl); // Use full URL for fetching cookies
    navigateTo(fullUrl);

    // Call getPublicKey and handle its result
    const wallet = new WalletClient()
    const pubKey = await wallet.getPublicKey({ identityKey: true });
    console.log("Fetched Public Key:", pubKey);

    // const metaNetAddress = PublicKey.fromString(pubKey.publicKey).toAddress()

    const metaNetAddress = Addr(toByteString(pubKey.publicKey));
    console.log("MetaNet Address:", metaNetAddress);

    const cookie = new CookieContract(metaNetAddress, 300n);
    console.log("CookieContract initialized:", cookie);

    const lockingScript = cookie.lockingScript.toHex()

    console.log("lockingScript: ", lockingScript)
    const cookieEnvelope = await wallet.createAction({
      description: 'Create a meter',
      outputs: [
        {
          basket: 'cookie tokens',
          lockingScript,
          satoshis: 1,
          outputDescription: 'Cookie output'
        }
      ],
      options: { randomizeOutputs: false }
    })

    if (!cookieEnvelope.tx) {
      throw new Error('Transaction is undefined')
    }

    const transaction = Transaction.fromAtomicBEEF(cookieEnvelope.tx)
    const txid = transaction.id('hex')
    console.log("Transaction ID: ", txid)

    const args: SHIPBroadcasterConfig = {
      networkPreset: 'local'
    }
    const broadcaster = new SHIPBroadcaster(['tm_cookies'], args)
    const broadcasterResult = await broadcaster.broadcast(transaction)
    console.log('broadcasterResult:', broadcasterResult)
    if (broadcasterResult.status === 'error') {
      throw new Error('Transaction failed to broadcast')
    }


  };


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
