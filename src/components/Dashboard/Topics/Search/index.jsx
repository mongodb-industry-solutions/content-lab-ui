"use client";

import SearchBar from "./SearchBar";
import RecQueries from "./RecQueries";
import styles from "./Search.module.css";

const Search = () => {
  const handleFilterChange = (filterValue) => {
    console.log('Filter changed to:', filterValue);
    // filter logic
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // search logic
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.container}>
        <SearchBar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
        <RecQueries />
      </div>
    </section>
  );
};

export default Search;
