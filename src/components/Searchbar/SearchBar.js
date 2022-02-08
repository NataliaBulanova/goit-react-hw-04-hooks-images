import PropTypes from "prop-types";
import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../images/search.svg";
import { toast } from "react-toastify";
import {
  SearchContainer,
  SearchForm,
  SearchButton,
  ButtonInput,
} from "./Searchbar.styled";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const HandleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    query.trim() ? onSubmit(query) : toast("Enter the word");
    reset();
  };

  const reset = () => {
    setQuery("");
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchIcon width="30" height="30" fill="fff" />
        </SearchButton>

        <ButtonInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={HandleChange}
          value={query}
        />
      </SearchForm>
    </SearchContainer>
  );
};

SearchBar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
