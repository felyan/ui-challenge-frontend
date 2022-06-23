import React, { useRef, useState, RefObject } from 'react';
import { FaPlus } from 'react-icons/fa';
import {
    Box,
    Stack,
    TextField,
    Button
} from '@mui/material';

const AddArticle = () => {
   const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState("")
  const [newArticle, setNewArticle] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!newArticle) return;
    // addArticle(newArticle);
    setNewArticle("");
  };

  return (
      <Box>
      <form className="addForm" onSubmit={handleSubmit}>
          <Stack direction='column' spacing={4} my={4}>
          <TextField
            label='Title'
            autoFocus
            ref={inputRef}
            id='addTitle'
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}              
          />
          <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={10}
          value={newArticle}
          onChange={(e) => setNewArticle(e.target.value)}
        />
          <Button
            variant='outlined'
            type='submit'
            aria-label='Add Articles'
            onClick={() => inputRef.current!.focus()}
          >
            <FaPlus />
          </Button>
          </Stack>
      </form>
      </Box>
  )
}

export default AddArticle