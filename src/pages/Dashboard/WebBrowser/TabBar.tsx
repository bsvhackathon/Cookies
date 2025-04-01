import React, { useState } from 'react';

// Define the interface at the top of the file, before the component function
interface TabBarProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  onAddTab: () => void;
  onCloseTab: (index: number) => void;
}

// Define the TabBar component using the TabBarProps interface
const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange, onAddTab, onCloseTab }) => {
  return (
    <div
      className="tab-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '5px',
      }}
    >
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => onTabChange(index)}
          style={{
            padding: '10px',
            marginRight: '5px',
            cursor: 'pointer',
            backgroundColor: index === activeTab ? '#6200ea' : '#e0e0e0',
            color: index === activeTab ? '#ffffff' : '#000000',
            borderRadius: '5px',
          }}
        >
          {tab || 'New Tab'}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering tab click
              onCloseTab(index);
            }}
            style={{
              marginLeft: '5px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ff0000',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={onAddTab}
        style={{
          padding: '10px',
          backgroundColor: '#03dac6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        +
      </button>
    </div>
  );
};

export default TabBar;
