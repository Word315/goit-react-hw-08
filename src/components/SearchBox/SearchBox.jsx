import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import './SearchBox.module.css';
export default function SearchBox() {
  const dispatch = useDispatch();
  const value = useSelector(state => state.filters.name);

  return (
    <div>
      <label>
        Find contacts by name
        <input 
          type="text"
          value={value}
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </label>
    </div>
  );
}