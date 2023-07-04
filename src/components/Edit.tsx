import React, { useEffect, useState } from 'react'
import { Container, Flex, Box, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import axios from 'axios';
import authHeader from '../services/auth-header';
import { useNavigate, useParams } from 'react-router-dom';


export default function Edit() {
    const { id } = useParams();
    const nav = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState<any[]>([]);
  
    useEffect(() => {
      fetchNotes();
    }, []);
  
    const url = `http://localhost:3001/api/notes`;
  
    //GET Notes
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${url}`, { headers: authHeader() });
        if (res.data) {
          setNotes(res.data.notes);
        }
      } catch (error) {
        console.error("Error getting notes:", error);
      }
    };
  
    
    const inputHandler = (e:any) => {
      if (e.target.id === "title") {
        setTitle(e.target.value);
      } else {
        setContent(e.target.value);
      }
    };
  
    const editNoteHandler = async (e:any) => {
      e.preventDefault();
      if (title === "") {
        alert("title cannot be empty");
      } else if (content === "") {
        alert("content cannot be empty");
      } else {
        try {
         const res = await axios.patch(
            `${url}/${id}`,
            { title, content },
            { headers: authHeader() }
          );
          setNotes((prev) => [res.data.notes, ...prev]);
          alert(`Note successfully edited`);
          setTitle("");
          setContent("");
          fetchNotes();
          nav("/dashboard");
        } catch (error) {
          console.error("Error creating note:", error);
          alert(`Trouble creating note`);
        }
      }
    };
  
  return (
    <Container my={3}>
  <Flex justifyContent="center">
    <Box w="md">
      <form
        style={{
          border: "2px solid #ced4da",
          borderRadius: "10px",
          padding: "30px",
        }}
      >
        <FormControl mb={3}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={inputHandler}
            placeholder="Enter your title"
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            rows={3}
            value={content}
            onChange={inputHandler}
            placeholder="Enter About your description"
          />
        </FormControl>
        <Button
          onClick={editNoteHandler}
          type="submit"
          colorScheme="blue"
        >
          Edit Note
        </Button>
      </form>
    </Box>
  </Flex>
</Container>
  )
}
