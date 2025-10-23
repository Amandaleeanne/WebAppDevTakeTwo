import React, { useEffect, useState } from 'react';
import ListView from '../components/ListView';
import CreateForm from '../components/CreateForm';
import { get, post } from '../api';

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      setAuthors(await get('/authors'));
    })();
  }, []);

  async function handleCreate(data) {
    const created = await post('/authors', { name: data.name });
    setAuthors(prev => [...prev, created]);
  }

  return (
    <div>
      <ListView title="Authors" items={authors} renderItem={a => `${a.id}: ${a.name}`} />
      <h4>Create author</h4>
      <CreateForm fields={[{ name: 'name', label: 'Name' }]} onCreate={handleCreate} />
    </div>
  );
}
