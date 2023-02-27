import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import StarContext from './StarContext';

function Provider({ children }) {
  const [state, setState] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://swapi.dev/api/planets');
      const json = await data.json();
      json.results.forEach((planet) => (delete planet.residents));
      setState(json);
    };

    fetchData();
  }, []);

  const values = useMemo(() => ({
    state, setState, search, setSearch,
  }), [state, setState, search, setSearch]);

  return (
    <StarContext.Provider value={ values }>
      {children}
    </StarContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes,
}.isRequired;

export default Provider;
