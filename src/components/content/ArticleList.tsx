import { List } from '@mui/material';
import SingleArticle from './SingleArticle';

const ArticleList = ({ articles }: { articles: { id: any, article: any }[] },
{ titles }: { titles: { id: any, title: any }[]}) => {
  return (
    <List>
        {articles.map((article) => (
            <SingleArticle
              key={article.id}
              title={titles}
              article={article}
            />
        ))}
    </List>
  )
}

export default ArticleList