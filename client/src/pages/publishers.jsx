import React, { useEffect, useState } from 'react';
import ListView from '../components/ListView';
import CreateForm from '../components/CreateForm';
import { get, post } from '../api';

//This is how the App displays the publishers component from the div in App.jsx (see line 20 of App.jsx)
export default function Publishers() {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    (async () => {
      setPublishers(await get('/publishers'));
    })();
  }, []);

  async function handleCreate(data) {
    const created = await post('/publishers', { name: data.name });
    setPublishers(prev => [...prev, created]);
  }

  return (
    <div>
      <ListView title="Publishers" items={publishers} renderItem={p => `${p.id}: ${p.name}`} />
      <h4>Create publisher</h4>
      <CreateForm fields={[{ name: 'name', label: 'Name' }]} onCreate={handleCreate} />
    </div>
  );
}
