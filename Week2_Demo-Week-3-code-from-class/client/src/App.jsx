import React, { useEffect, useState } from 'react'

const API = 'http://localhost:3000'

// Generic form component for creating/editing items
function ItemForm({ initial = { name: '', description: '' }, onCancel, onSave }) {
  const [name, setName] = useState(initial.name)
  const [description, setDescription] = useState(initial.description)
  return (
    <div className="item-form">
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button onClick={() => onSave({ name, description })}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

// User form component
function UserForm({ onSave, onCancel }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  return (
    <div className="form">
      <input 
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <input 
        placeholder="Role" 
        value={role} 
        onChange={e => setRole(e.target.value)} 
      />
      <button onClick={() => onSave({ name, role })}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

// Category form component
function CategoryForm({ onSave, onCancel }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#000000')

  return (
    <div className="form">
      <input 
        placeholder="Name" 
        value={name} 
        onChange={e => setName(e.target.value)} 
      />
      <input 
        type="color" 
        value={color} 
        onChange={e => setColor(e.target.value)} 
      />
      <button onClick={() => onSave({ name, color })}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default function App() {
  // Items state
  const [items, setItems] = useState([])
  const [itemsVisible, setItemsVisible] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [creatingItem, setCreatingItem] = useState(false)

  // Users state
  const [users, setUsers] = useState([])
  const [usersVisible, setUsersVisible] = useState(false)
  const [creatingUser, setCreatingUser] = useState(false)

  // Categories state
  const [categories, setCategories] = useState([])
  const [categoriesVisible, setCategoriesVisible] = useState(false)
  const [creatingCategory, setCreatingCategory] = useState(false)

  // Items effects and handlers
  useEffect(() => {
    if (!itemsVisible) return
    fetch(API + '/items')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [itemsVisible])

  function refreshItems() {
    fetch(API + '/items')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }

  async function handleCreateItem(data) {
    await fetch(API + '/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    setCreatingItem(false)
    refreshItems()
  }

  // Users effects and handlers
  useEffect(() => {
    if (!usersVisible) return
    fetch(API + '/users')
      .then(r => r.json())
      .then(setUsers)
      .catch(() => setUsers([]))
  }, [usersVisible])

  function refreshUsers() {
    fetch(API + '/users')
      .then(r => r.json())
      .then(setUsers)
      .catch(() => setUsers([]))
  }

  async function handleCreateUser(data) {
    await fetch(API + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    setCreatingUser(false)
    refreshUsers()
  }

  // Categories effects and handlers
  useEffect(() => {
    if (!categoriesVisible) return
    fetch(API + '/categories')
      .then(r => r.json())
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [categoriesVisible])

  function refreshCategories() {
    fetch(API + '/categories')
      .then(r => r.json())
      .then(setCategories)
      .catch(() => setCategories([]))
  }

  async function handleCreateCategory(data) {
    await fetch(API + '/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    setCreatingCategory(false)
    refreshCategories()
  }

  async function handleUpdateItem(id, data) {
    await fetch(API + '/items/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    setEditingItem(null)
    refreshItems()
  }

  async function handleDeleteItem(id) {
    await fetch(API + '/items/' + id, { method: 'DELETE' })
    refreshItems()
  }

  return (
    <div className="app">
      <h1>Welcome to the React Client</h1>

      {/* Items Section */}
      <div className="section">
        <h2>Items</h2>
        <button onClick={() => setItemsVisible(v => !v)}>
          {itemsVisible ? 'Hide Items' : 'Show Items'}
        </button>

        {itemsVisible && (
          <div className="items">
            <div style={{marginTop: '0.5rem'}}>
              <button onClick={() => setCreatingItem(true)}>Create New Item</button>
              <button onClick={refreshItems} style={{marginLeft: '0.5rem'}}>
                Refresh
              </button>
            </div>

            {creatingItem && (
              <ItemForm 
                onCancel={() => setCreatingItem(false)} 
                onSave={handleCreateItem} 
              />
            )}

            <ul>
              {items.map(it => (
                <li key={it.id} style={{marginTop: '0.5rem'}}>
                  <strong>{it.name}</strong>: {it.description}
                  <div style={{marginTop: '0.25rem'}}>
                    <button onClick={() => setEditingItem(it)}>Edit</button>
                    <button onClick={() => handleDeleteItem(it.id)} style={{marginLeft: '0.5rem'}}>
                      Delete
                    </button>
                  </div>
                  {editingItem && editingItem.id === it.id && (
                    <ItemForm 
                      initial={editingItem} 
                      onCancel={() => setEditingItem(null)} 
                      onSave={(data) => handleUpdateItem(it.id, data)} 
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Users Section */}
      <div className="section">
        <h2>Users</h2>
        <button onClick={() => setUsersVisible(v => !v)}>
          {usersVisible ? 'Hide Users' : 'Show Users'}
        </button>

        {usersVisible && (
          <div className="users">
            <div style={{marginTop: '0.5rem'}}>
              <button onClick={() => setCreatingUser(true)}>Create New User</button>
              <button onClick={refreshUsers} style={{marginLeft: '0.5rem'}}>
                Refresh
              </button>
            </div>

            {creatingUser && (
              <UserForm 
                onCancel={() => setCreatingUser(false)} 
                onSave={handleCreateUser} 
              />
            )}

            <ul>
              {users.map(user => (
                <li key={user.id} style={{marginTop: '0.5rem'}}>
                  <strong>{user.name}</strong> - {user.role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="section">
        <h2>Categories</h2>
        <button onClick={() => setCategoriesVisible(v => !v)}>
          {categoriesVisible ? 'Hide Categories' : 'Show Categories'}
        </button>

        {categoriesVisible && (
          <div className="categories">
            <div style={{marginTop: '0.5rem'}}>
              <button onClick={() => setCreatingCategory(true)}>
                Create New Category
              </button>
              <button onClick={refreshCategories} style={{marginLeft: '0.5rem'}}>
                Refresh
              </button>
            </div>

            {creatingCategory && (
              <CategoryForm 
                onCancel={() => setCreatingCategory(false)} 
                onSave={handleCreateCategory} 
              />
            )}

            <ul>
              {categories.map(category => (
                <li key={category.id} style={{marginTop: '0.5rem'}}>
                  <span 
                    style={{
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      backgroundColor: category.color,
                      marginRight: '10px',
                      verticalAlign: 'middle'
                    }}
                  />
                  <strong>{category.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
