import React, { useState } from 'react';

export default function CreateForm({ fields, onCreate }) {
  // fields: [{ name: 'title', label:'Title' }, ...]
  const initial = Object.fromEntries(fields.map(f => [f.name, '']));
  const [form, setForm] = useState(initial);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError(null);
    try {
      await onCreate(form);
      setForm(initial);
    } catch (err) {
      setError(err.message || String(err));
    }
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      {fields.map(f => (
        <div key={f.name} style={{ marginBottom: 6 }}>
          <label style={{ display: 'block', fontSize: 12 }}>{f.label}</label>
          <input
            name={f.name}
            value={form[f.name]}
            onChange={handleChange}
            style={{ width: '100%', padding: 6 }}
          />
        </div>
      ))}
      <button type="submit">Create</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
