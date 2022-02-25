import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FetchWithAuth, API_URL } from "../../Constants";
import UserCard from "./UserCard";
import styled from "styled-components";
import PopupCard from "./PopupCard";

const SearchInput = styled.input`
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  padding: 5px 10px;
  background-color: #fafafa;
  width: 200px;
  text-align: center;
  color: #999;
`;

const style = {
  width: "250px",
  maxHeight: "30rem",
  overflowY: "auto",
  left: "50%",
  transform: "translate(-50%, 0)",
};

const SearchBar = ({ hide }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (result.length > 0 && setResult) {
      setResult(result);
    }
  }, [result, setResult]);
  useEffect(() => {
    if (query) {
      fetch(`${API_URL}/search-users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ query }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          console.log(res);
          setResult(res.result);
          setFetching(false);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [query]);

  return (
    <div>
      <form className="search-box" onSubmit={(event) => event.preventDefault()}>
        <SearchInput
          onChange={(event) => {
            setQuery(event.target.value);
            //event.target.value && setFetching(true);
          }}
          //onClick={onClick}
          value={query}
          placeholder="Search"
        />
        {/* <span className="search-box__placeholder">
          <Icon icon="search" className="icon--tiny color-grey" />
          {fetching && <Loader />}
        </span> */}
      </form>
      {query && !fetching && result && (
        <PopupCard hideModal={() => setQuery("")} style={style}>
          <div>
            {result.length === 0 && !fetching ? (
              <h3 style={{ padding: "1rem 0" }}>No results found.</h3>
            ) : (
              result &&
              result.map((user, idx) => (
                <div key={user._id}>
                  <UserCard
                    avatar={user?.photo}
                    userName={user.userName}
                    subText={user.fullName}
                    onClick={() => {
                      navigate(`/${user.userName}`);
                      setQuery("");
                    }}
                  />
                  {result.length !== idx + 1 && <p />}
                </div>
              ))
            )}
          </div>
        </PopupCard>
      )}
    </div>
  );
};

export default SearchBar;
