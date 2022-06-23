import { Favorite, Share } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography
} from '@mui/material';
import React from 'react';

const SingleArticle = (
  { article }: { article: { article: string } },
{ title }: { title: { title: string } }) => {
  

  return ( 

    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {article.article}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default SingleArticle