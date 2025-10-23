import React, { useEffect, useState } from 'react';
import ListView from '../components/ListView';
import CreateForm from '../components/CreateForm';
import { get, post } from '../api';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [selected, setSelected] = useState(null);

  // load lists
  useEffect(() => {
    (async () => {
      try {
        setBooks(await get('/books'));
        setAuthors(await get('/authors'));
        setPublishers(await get('/publishers'));
      } catch (err) {
        console.error('Failed to load', err);
      }
    })();
  }, []);

  async function handleCreate(data) {
    // convert authorId/publisherId to numbers if present
    const payload = {
      title: data.title,
      authorId: data.authorId ? Number(data.authorId) : undefined,
      publisherId: data.publisherId ? Number(data.publisherId) : undefined
    };
    const created = await post('/books', payload);
    setBooks(prev => [...prev, created]);
  }

  return (
    <div>
      <ListView
        title="Books"
        items={books}
        renderItem={b => (
          <span>
            <strong>{b.title}</strong>{' '}
            <button onClick={() => setSelected(b.id)}>view</button>
          </span>
        )}
      />

      {selected && (
        <div style={{ border: '1px solid #ccc', padding: 8, marginBottom: 12 }}>
          <h3>Book Detail</h3>
          {books.find(b => b.id === selected) ? (
            <pre>{JSON.stringify(books.find(b => b.id === selected), null, 2)}</pre>
          ) : (
            <div>Not found</div>
          )}
          <button onClick={() => setSelected(null)}>close</button>
        </div>
      )}

      <h3>Create book</h3>
      <CreateForm
        fields={[
          { name: 'title', label: 'Title' },
          { name: 'authorId', label: 'Author ID (number)' },
          { name: 'publisherId', label: 'Publisher ID (number)' }
        ]}
        onCreate={handleCreate}
      />

      <div>
        <h4>Authors (ids)</h4>
        <ul>
          {authors.map(a => <li key={a.id}>{a.id}: {a.name}</li>)}
        </ul>

        <h4>Publishers (ids)</h4>
        <ul>
          {publishers.map(p => <li key={p.id}>{p.id}: {p.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
