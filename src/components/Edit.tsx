import  { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authHeader from "../services/auth-header";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();

  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    fetchNotesbyId(id);
  }, []);

  const url = `http://localhost:3001/api/notes`;

  //GET Notes
  const fetchNotesbyId = async (id: any) => {
    try {
      const res = await axios.get(`${url}/${id}`, { headers: authHeader() });
      setTitle(res.data.note.title);
      setContent(res.data.note.content);
    } catch (error) {
      console.error("Error getting notes:", error);
    }
  };

  const inputHandler = (e: any) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else {
      setContent(e.target.value);
    }
  };

  const editNoteHandler = async (e: any) => {
    e.preventDefault();
    if (title === "") {
      toast.success(`title cannot be empty`, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } else if (content === "") {
      toast.success(`content cannot be empty`, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } else {
      try {
        const res = await axios.patch(
          `${url}/${id}`,
          { title, content },
          { headers: authHeader() }
        );
        setNotes((prev) => [res.data.notes, ...prev]);
        toast.success(`Note successfully edited`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
        setTitle("");
        setContent("");
          setTimeout(()=>{
             nav("/dashboard");
          },1000)
        
      } catch (error) {
        console.error("Error creating note:", error);
        toast.error(`Trouble creating note`, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
    }
  };

  return (
    <Container my={3}>
      <ToastContainer />
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
            <Button onClick={editNoteHandler} type="submit" colorScheme="blue">
              Edit Note
            </Button>
          </form>
        </Box>
      </Flex>
    </Container>
  );
}
