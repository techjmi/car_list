import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SearchComponent = ({ cars }) => {
  const [query, setQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length >= 3) {
      const matches = cars.filter((car) =>
        car.title.toLowerCase().includes(value.toLowerCase()) || 
        car.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCars(matches);
    } else {
      setFilteredCars([]);
    }
  };

  return (
    <div className="relative">
  <input
    type="text"
    value={query}
    onChange={handleSearch}
    placeholder="Enter 3 Char...."
    className="bg-gray-700 text-white py-1 md:py-2 pl-8 pr-3 md:pl-10 md:pr-4 rounded-md md:rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-gray-500"
  />
  <AiOutlineSearch className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base" />

  {filteredCars.length > 0 && (
    <div className="absolute z-10 bg-gray-800 mt-1 md:mt-2 w-full rounded-md md:rounded-lg shadow-lg max-h-40 overflow-y-auto">
      {filteredCars.map((car, index) => (
        <Link to={`/car-details/${car._id}`} key={index} className="block">
          <div className="p-2 hover:bg-gray-700 cursor-pointer text-sm md:text-base">
            {car.title}
          </div>
        </Link>
      ))}
    </div>
  )}
</div>

  );
};

export default SearchComponent;
