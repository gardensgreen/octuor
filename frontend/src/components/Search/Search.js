import { useEffect, useState } from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
    padding: 10px;
    display: flex;
    aligh-items: center;
    jutify-content: center;
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

    return (
        <SearchBarContainer>
            <SearchBar
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search for anything..."
                required
            />
        </SearchBarContainer>
    );
}
