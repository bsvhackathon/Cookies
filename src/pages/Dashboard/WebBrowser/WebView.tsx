import React, { useEffect } from 'react';
// import { WebView } from '@tauri-apps/api';

interface WebViewProps {
  url: string;
}

const BrowserWebView: React.FC<WebViewProps> = ({ url }) => {
  return (
    <iframe
      src={url}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Browser View"
    />
  );
};

export default BrowserWebView;

