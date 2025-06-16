import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addContact } from '../../redux/contactsOps';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        value={number}
        placeholder="Phone"
        onChange={e => setNumber(e.target.value)}
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
}
