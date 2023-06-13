import { createContext, useState, useEffect, useContext } from "react";

const PageFiltersContext = createContext({
  personSelected: null,
  setPersonSelected: () => {},
});

const PagesFiltersProvider = ({ children, userRole }) => {
  const [personSelected, setPersonSelected] = useState(null);
  const val = { personSelected, setPersonSelected };
  return (
    <PageFiltersContext.Provider value={val}>
      {children}
    </PageFiltersContext.Provider>
  );
};

const usePageFilters = () => useContext(PageFiltersContext);

export { PageFiltersContext, PagesFiltersProvider, usePageFilters };
