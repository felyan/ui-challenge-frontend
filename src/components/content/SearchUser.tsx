import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useState } from "react";

const SearchUser = () => {
    
    const [search, setSearch] = useState("");
  return (
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
          <Search>
              <InputBase
                placeholder="Search User"
                id='search'
                type="text"
                role='searchbox'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
          </Search>
      </form>
  )
}

export default SearchUser