import React from 'react';

export default function ListView({ title, items, renderItem }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p><em>No items.</em></p>
      ) : (
        <ul>
          {items.map(it => (
            <li key={it.id}>
              {renderItem ? renderItem(it) : JSON.stringify(it)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
