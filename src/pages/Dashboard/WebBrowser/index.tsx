import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles'; // Import your theme
import AddressBar from './AddressBar';
import TabBar from './TabBar';
import BrowserWebView from './WebView';

const WebBrowser: React.FC = () => {
  // const [currentUrl, setCurrentUrl] = useState('https://coingeek.com');
  const [tabs, setTabs] = useState<string[]>(['https://coingeek.com']);
  const [activeTab, setActiveTab] = useState(0);

  const handleAddTab = () => {
    setTabs([...tabs, '']); // Add a new, empty tab
    setActiveTab(tabs.length); // Switch to the new tab
  };

  const handleCloseTab = (index: number) => {
    if (tabs.length > 1) {
      const updatedTabs = tabs.filter((_, i) => i !== index);
      setTabs(updatedTabs);
      setActiveTab((prev) => (prev === index ? 0 : Math.min(prev, updatedTabs.length - 1)));
    }
  };

  const handleNavigate = (url: string) => {
    const updatedTabs = [...tabs];
    updatedTabs[activeTab] = url; // Update the active tab's URL
    setTabs(updatedTabs);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {/* TabBar */}
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddTab={handleAddTab}
          onCloseTab={handleCloseTab}
        />
        <AddressBar navigateTo={handleNavigate} />
        <div style={{ flexGrow: 1 }}>
          <BrowserWebView url={tabs[activeTab] || 'https://coingeek.com'} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default WebBrowser;
