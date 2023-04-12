import { useState } from 'react';
import 'tailwindcss/tailwind.css';


function Dropdown() {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { name: 'Ethereum', logo: './eth.png' },
    { name: 'Bitcoin', logo: './btc.png' },
    { name: 'Solana', logo: './sol.png' },
    { name: 'Link', logo: './link.png' },
    { name: 'Matic', logo: './matic.png' },
    { name: 'Sand', logo: './sand.png' },
  ];

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mb-4">
        <h1>{selectedOption}</h1>
        <img src='./eth.png'></img>
        <label className="block text-white mb-2" htmlFor="cryptoSelect">
            Select a cryptocurrency:
        </label>
        <div className="relative">
            <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cryptoSelect"
            value={selectedOption}
            onChange={handleOptionSelect}
            >
            <option value="">Select an option</option>
            {options.map((option) => (
                <option key={option.name} value={option.name}>
                <img src={option.logo} alt={`${option.name} logo`} className="w-6 h-6 inline-block mr-2" />
                {option.name}
                </option>
            ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M14.707 7.293a1 1 0 00-1.414 0L10 10.586l-3.293-3.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"/></svg>
            </div>
        </div>
    </div>
  );
}

export default Dropdown;
