import React from 'react';
import ChatInterface from './components/ChatInterface';
import VirtualInfluencer from './components/VirtualInfluencer';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <h1>AI Virtual Influencer</h1>
      <VirtualInfluencer />
      <ChatInterface />
    </div>
  );
}
