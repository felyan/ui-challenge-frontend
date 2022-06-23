import { Search } from "@mui/icons-material"
import { InputBase } from "@mui/material"


const SearchArticle = ({search,setSearch}:{search:string,setSearch:(value: string) => void}) => {
    
    
  return (
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
          <Search>
              <InputBase
                placeholder="Search Expression"
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

export default SearchArticle