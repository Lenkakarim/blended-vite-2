import { FiSearch } from 'react-icons/fi';
import s from './Form.module.css';
import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleChange = e => {
    setQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return alert('Can not be empty');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <button className={s.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={s.input}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};

export default Form;
