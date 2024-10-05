'use client'

import { useState } from 'react';
import { createCommunity } from '@/app/actions/communities';

export default function CreateCommunityForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const result = await createCommunity(name, description);
    if (result.success) {
      setSuccess(true);
      setName('');
      setDescription('');
    } else {
      setError(result.error || 'An unknown error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className=''>
        <label htmlFor="name">Community Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='border'
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border'
        />
      </div>
      <button type="submit" className='border p-4 rounded-md'>Create Community</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Community created successfully!</p>}
    </form>
  );
}