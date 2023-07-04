import axios from "axios";
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
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import authHeader from "../services/auth-header";
import Navbar from "./Navbar";
const url = `http://localhost:3001/api/notes`;

export default function Dashboard() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

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

  // console.log(notes)

  // Delete Notes
  const deleteNote = async (id: number) => {
    console.log(id);
    try {
      await axios.delete(`${url}/${id}`, { headers: authHeader() });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
//status Note
  const statusNote = async (id:any) => {
    console.log("Status",id);
    try {
     await axios.patch(`${url}/status/${id}`);
     fetchNotes();
    } catch (error) {
      console.error('Error toggling note:', error);
    }
  };

  const inputHandler = (e: any) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else {
      setContent(e.target.value);
    }
  };

  const addNotesHandler = async (e: any) => {
    e.preventDefault();
    if (title === "") {
      alert("title cannot be empty");
    } else if (content === "") {
      alert("content cannot be empty");
    } else {
      try {
        const res = await axios.post(
          `${url}`,
          { title, content },
          { headers: authHeader() }
        );
        console.log("res", res.data.notes);
        setNotes((prev) => [res.data.notes, ...prev]);
        alert(`Note successfully added`);
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Error creating note:", error);
        alert(`Trouble creating note`);
      }
    }
  };

  const removeHandler = (id: any) => {
    deleteNote(id);
  };

   const  toggleStatus=(id:any)=>{
    statusNote(id)
   }
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div>
       <Navbar/>
      <div>
        {/* notes add */}
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
                    placeholder="Enter your title"
                    value={title}
                    onChange={inputHandler}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    rows={3}
                    placeholder="Enter About your description"
                    value={content}
                    onChange={inputHandler}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  onClick={addNotesHandler}
                >
                  Add Notes
                </Button>
              </form>
            </Box>
          </Flex>
        </Container>

        {/* notes dashboard*/}
        {notes.length > 0 ? (
          notes.map((el) => (
            <div key={el.id}>
              <Box mb={3}>
                <Box p={3} textTransform="capitalize">
                  <Text as="h5" fontSize="xl" fontWeight="bold" mb={2}>
                    {el.title}
                  </Text>
                  <Text>{el.content}</Text>
                  <Box>
                    {el.done ? (
                      <Button
                        colorScheme="green"
                        mx={2}
                        onClick={() => {
                          removeHandler(el.id);
                        }}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        colorScheme="red"
                        mx={2}
                        onClick={() => {
                          toggleStatus(el.id);
                        }}
                      >
                        Not Done
                      </Button>
                    )}
                  </Box>

                  <Button
                    type="button"
                    colorScheme="blue"
                    onClick={()=>nav(`/dashboard/${el.id}`)}
                    // onClick={() => nav(`/dashboard/${id}`})}
                  >
                    Edit
                  </Button>
                  {
                    el.done? "": <Button
                    colorScheme="red"
                    mx={2}
                    onClick={() => {
                      removeHandler(el.id);
                    }}
                  >
                    Delete
                  </Button>
                  }
                 
                </Box>
              </Box>
            </div>
          ))
        ) : (
          <p>You currently dont have any tasks</p>
        )}
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
