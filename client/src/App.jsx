import React from 'react';
import Books from './pages/books';
import Authors from './pages/authors';
import Publishers from './pages/publishers';

//This is the entry point for the React application
export default function App() {
  return (
    //can only return one parent element
    // but multiple children
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Mini Library</h1>
      <div style={{ display: 'flex', gap: 40 }}>
        <div style={{ flex: 1 }}>
          <Books />
        </div>
        <div style={{ flex: 1 }}>
          <Authors />
          <hr />
          <Publishers />
        </div>
      </div>
    </div>
  );
}
