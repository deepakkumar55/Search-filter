import React, { useState, useEffect } from 'react';

const ItemList = ({ items }) => {
  return (
    <>
      {items.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.firstName}</li>
          ))}
        </ul>
      )}
    </>
  );
};

const App = () => {
  const [searchItem, setSearchItem] = useState('');
  const [apiUsers, setApiUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(response => response.json())
      .then(data => {
        setApiUsers(data.users);
        setFilteredUsers(data.users);
      })
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchItem(searchTerm);

    const filteredItems = apiUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };

  return (
    <div>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Type to search"
      />
      <ItemList items={filteredUsers} />
    </div>
  );
};

export default App;
