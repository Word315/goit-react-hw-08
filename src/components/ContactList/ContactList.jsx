// src/components/ContactList/ContactList.jsx
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { selectFilteredContacts, selectLoading } from '../../redux/contactsSlice';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);

  return (
    <ul className={css.list}>
      {loading && <p>Loading...</p>}
      {contacts.map(({ id, name, number }) => (
  <li key={id} className={css.item}>
    {name}: {number.split('x')[0].trim()}
    <button className={css.delete} onClick={() => dispatch(deleteContact(id))}>Delete</button>
  </li>
))}

    </ul>
  );
}
