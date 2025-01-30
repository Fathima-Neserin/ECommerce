import React from "react";
import { useSearch } from "../../context/search.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${search.keyword}`
      );
      setSearch({ ...search, results: data?.results });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-1 me-3">
      <form
        className="position-relative w-100"
        role="search"
        onSubmit={handleSubmit}
      >
        <div className="input-group">
          <input
            className="form-control border-start-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          />
          <button className="input-group-text bg-white border-end-0">
            <CiSearch className="text-muted" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
