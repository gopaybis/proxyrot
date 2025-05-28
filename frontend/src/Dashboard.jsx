import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ token, logout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    if (!newUser.username || !newUser.password) return;
    try {
      await axios.post(
        'http://localhost:4000/api/users',
        newUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch {
      setError('Failed to add user');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch {
      setError('Failed to delete user');
    }
  };

  const rotateProxy = async () => {
    try {
      await axios.post(
        'http://localhost:4000/api/rotate',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Proxy rotated');
    } catch {
      alert('Failed to rotate proxy');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Proxy Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={rotateProxy}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Rotate Proxy Now
        </button>
      </div>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Proxy User</h2>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border p-2 mr-2 rounded"
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">ID</th>
              <th className="border border-gray-300 p-2 text-left">Username</th>
              <th className="border border-gray-300 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="border border-gray-300 p-2">{u.id}</td>
                <td className="border border-gray-300 p-2">{u.username}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
