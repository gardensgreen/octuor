import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getSearchResults, removeSearchResults } from "../../store/search";

const SearchBarContainer = styled.div`
    padding: 30px;
    display: flex;
    margin-top: 5px;
    margin-bottom: -30px;
    aligh-items: center;
    jutify-content: center;
    grid-area: search;
    z-index: 2;
`;
const SearchBar = styled.input`
    padding: 10px 30px;
    width: 400px;
    background-color: #52606d;
    border: 0.5px solid #616e7c;
    height: 33.33px;
    border-radius: 200px;
    color: #f5f7f9;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export default function Search() {
    const [term, setTerm] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const setSearchResults = async () => {
            if (term !== "") {
                await dispatch(getSearchResults(term));
            } else {
                dispatch(removeSearchResults());
            }
        };

        setSearchResults();

        return () => {
            dispatch(removeSearchResults());
        };
    }, [term]);

    const handleChange = (e) => {
        setTerm(e.target.value);
    };

    return (
        <SearchBarContainer>
            <SearchBar
                type="text"
                value={term}
                onChange={handleChange}
                placeholder="Search for anything..."
                required
            />
        </SearchBarContainer>
    );
}
