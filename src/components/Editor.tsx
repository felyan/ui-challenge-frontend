import { useState } from "react"
import AddArticle from "./content/AddArticles"
import ArticleList from "./content/ArticleList"
import SearchArticle from "./content/SearchArticle"
import { Typography } from "@mui/material"
import NavBar from "./content/NavBar"
import Footer from "./content/Footer"



const Editor = () => {
    const [search, setSearch] = useState();
    const [articles, setArticles] = useState([]);
    
    return (
        <section>
            <NavBar />
            <Typography variant="h1">Editors Page</Typography>
            <br />
            <AddArticle />
            <SearchArticle search={search} setSearch={setSearch} />
            <ArticleList articles={articles} setArticles={setArticles} />
            <Footer />
        </section>
    )
}

export default Editor