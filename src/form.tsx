import React, { useState } from 'react';

interface FormProps {
  onSubmit: (type: 'user' | 'repo', value: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [type, setType] = useState<'user' | 'repo'>('user');
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(type, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value as 'user' | 'repo')}>
        <option value="user">User</option>
        <option value="repo">Repo</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;