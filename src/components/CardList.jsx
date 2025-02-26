import Card from "./Card";
import Button from "./Button";
// Import the useState and useEffect hook
import React, { useState, useEffect } from "react";
import Search from "./Search";


const CardList = ({data}) => {

  // define the limit state variable and set it to 10
const limit = 10;
// Define the default dataset, using slice to get the first 10 products
const defaultDataset = data.slice(0, limit);

// Define the offset state variable and set it to 0
const [offset, setOffset] = useState(0);
// Define the products state variable and set it to the default dataset
const [products, setProducts] = useState(defaultDataset);

// Function to handle search filtering
const filterTags = (searchTerm) => {
  const filtered = data.filter(product => 
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  setFilteredData(filtered);
  setOffset(0);
  setProducts(filtered.slice(0, limit));
};

// Unified pagination handler
const handlePagination = (direction) => {
  const newOffset = offset + direction * limit;
  if (newOffset >= 0 && newOffset < filteredData.length) {
    setOffset(newOffset);
  }
};

useEffect(() => {
  setProducts(filteredData.slice(offset, offset + limit));
}, [offset, filteredData]);

return (
  <div className="cf pa2">
    <Search handleSearch={filterTags} />
    <div className="mt2 mb2">
      {products.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
    <div className="flex items-center justify-center pa4">   
      <Button text="Previous" handleClick={() => handlePagination(-1)} disabled={offset === 0} />
      <Button text="Next" handleClick={() => handlePagination(1)} disabled={offset + limit >= filteredData.length} />
    </div>
  </div>
);
};

export default CardList;