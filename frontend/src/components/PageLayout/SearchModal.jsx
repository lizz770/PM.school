import React from "react";
import styles from "./SearchModal.module.scss";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { useWhoami } from "../../queries/authQueries";
import ResultsTutor from "./ResultsTutor.json";
import ResultStudent from "./ResultsStudent.json";
import { BsArrowRepeat } from "react-icons/bs";

const SearchModal = ({ setIsVisible, isVisible }) => {
  const { data: me } = useWhoami();
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState([]);

  const searchResults = (input) => {
    if (input.length > 0) {
      let results;
      if (me?.user?.userRole === "TUTOR") {
        results = ResultsTutor.filter((result) => {
          return result.text.toLowerCase().includes(input.toLowerCase());
        });
      } else {
        results = ResultStudent.filter((result) => {
          return result.text.toLowerCase().includes(input.toLowerCase());
        });
      }
      return results;
    }
  };

  React.useEffect(() => {
    setResults(searchResults(input));
  }, [input]);

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={setIsVisible}
      overlayClassName={styles.overlay}
      className={styles.modal}
      contentLabel='Search Modal'
    >
      <div
        className={styles.searchModalInner}
        style={
          results?.length > 0 ? { borderRadius: "12px 12px 0 0" } : undefined
        }
      >
        <button
          type='button'
          className={styles.searchButton}
          aria-label='Search'
        >
          <FaSearch title='Search' aria-label='Search' />
        </button>
        <label
          id='searchModalLabel'
          className={styles.searchModalLabel}
          htmlFor='searchInputMobile'
        >
          Поиск
        </label>
        <input
          id='searchInputMobile'
          type='text'
          placeholder='Search...'
          className={styles.topSearchbar}
          aria-label='Search'
          aria-describedby='searchModalLabel'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type='button'
          className={styles.closeButton}
          aria-label='Close modal'
          onClick={() => setIsVisible(false)}
        >
          <FaTimes />
        </button>
      </div>
      <ul className={styles.searchResults}>
        {results?.length > 0 ? (
          <div className={styles.searches}>
            <span className={styles.resultSpan}>Results</span>
            <ul>
              {results.map((result, index) => {
                return (
                  <li onClick={() => setIsVisible(false)}>
                    <Link to={result.link} key={index}>
                      <BsArrowRepeat />
                      {result.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultBg}>
              <BsArrowRepeat />
            </div>
            {input === "" ? (
              <span>Найти что-нибудь...</span>
            ) : (
              <span>Нет результата</span>
            )}
          </div>
        )}
      </ul>
    </Modal>
  );
};

export default SearchModal;
