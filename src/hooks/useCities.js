import {useEffect, useState} from 'react';
import fetchCitiesApi from '../../server/src/helpers/citiesApi';

const useCities = () => {
  const [cities, setCities] = useState([]);

  const fetchCitiesDropdown = async () => {
    const data = await fetchCitiesApi();
    const cityNames = data.results.map(city => city.asciiname);
    const citiesData = cityNames.map((ele, index) => ({
      label: ele,
      value: String(index + 1),
    }));
    setCities(citiesData);
  };

  useEffect(() => {
    fetchCitiesDropdown();
  }, []);

  return cities;
};

export default useCities;
