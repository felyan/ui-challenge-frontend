import { useState } from "react"
import Content from "./content/Content"
import apiRequest from "./content/ApiRequest"
import {API_URL} from "../api/axios";
import ArticleList from "./content/ArticleList";
import { Link } from "react-router-dom";

const Lounge = () => {
    const [articles, setArticles] = useState<{ id: any }[]>([]);
    const [search, setSearch] = useState("");
    const [fetchError, setFetchError] = useState(null);

   const handleDelete = async (id: number) => {
        const listArticles = articles.filter(article => article.id !== id);
        setArticles(listArticles);
        localStorage.setItem("shoppinglist", JSON.stringify(listArticles));

        const deleteOptions = { method: "DELETE" };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) setFetchError(result);
    };
    
    return (
        <section>
            <h1>The Lounge</h1>
            <br />
            <Content />
      <br />
      <br />
      <ArticleList
        articles={articles.filter(item => articles.user.toLowerCase().includes(search.toLocaleLowerCase()))}
        handleDelete={handleDelete}
      />
      <br />  
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
        </section>
    )
}

export default Lounge