import SearchArticle from "./SearchArticle";
import ArticleList from './ArticleList';
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const Content = () => {
    const API_URL = "http://localhost:3500/items";

    const [articles, setArticles] = useState([]);
    const [fetchError, setFetchError] = useState(null); 
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error("Did not recive expected data");
                const listItems = await response.json();
                setArticles(listItems);
                setFetchError(null);
            } catch (err: any) {
                err && err.message && setFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
    };
        setTimeout(() => {
            (async () => await fetchItems())();
            }, 2000);
        }, []);
        
    return (
        <>
            
            <SearchArticle search={search} setSearch={setSearch} />

            {isLoading && <Typography variant="body1">Loading Articles...</Typography>}
            {fetchError && <Typography variant="body1" style={{ color: "red" }}>{`Error: ${fetchError}`}</Typography>}
            {!fetchError && articles.length ? (
                <ArticleList
                    articles={articles}
                />
            ) : (
                <Typography variant="body1" style={{ marginTop: '2rem' }}>Your list is empty.</Typography>
            )}

            
        </>
    )

}

export default Content