"use client";

/**
 * Search component for the topics component
 * Contains the search bar, dropdown and recommended queries
 */

import SearchBar from "./SearchBar";
import RecQueries from "./RecQueries";
import styles from "./Search.module.css";

const Search = ({ 
  onSearchSubmit, 
  onLabelChange, 
  searchQuery, 
  selectedLabel 
}) => {
  const handleFilterChange = (filterValue) => {
    if (onLabelChange) {
      onLabelChange(filterValue);
    }
  };

  const handleSearch = (query) => {
    if (onSearchSubmit) {
      onSearchSubmit(query);
    }
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.container}>
        <SearchBar 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          selectedLabel={selectedLabel}
        />
        <RecQueries onQuerySelect={handleSearch} />
      </div>
    </section>
  );
};

export default Search;
