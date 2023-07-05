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
import "./Dashboard.css";
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

// PAGINATION
  const[todosPerPage,setTodosPerPage] =useState(3)
  const numoftotalPages= Math.ceil(notes.length/todosPerPage);
  const pages= [...Array(numoftotalPages+1).keys()].slice(1)
  const[currentP,setCurrentP]= useState(1);
  const lastInd = currentP * todosPerPage;
  const firstInd = lastInd - todosPerPage;
  const visibleNotes = notes.slice(firstInd, lastInd  );


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
  const statusNote = async (id: any) => {
    console.log("Status", id);
    try {
      await axios.patch(`${url}/status/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error toggling note:", error);
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

  const toggleStatus = (id: any) => {
    statusNote(id);
  };

  const prevHandle=()=>{
    if (currentP !== 1) {
      setCurrentP(currentP - 1);
    }
  }

  const nextHandle=()=>{
    if (currentP !== numoftotalPages) {
      setCurrentP(currentP + 1);
    }
  }

  return (
    <div>
      <Navbar />
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
                  bgColor="#d2ffdc"
                  onClick={addNotesHandler}
                >
                  Add Notes
                </Button>
              </form>
            </Box>
          </Flex>
        </Container>

        {/* notes dashboard*/}
        {visibleNotes.length > 0 ? (
          visibleNotes.map((el) => (
            <Box key={el.id} my={3} mx={5}>
              <Box
                p={3}
                boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
                textTransform="capitalize"
              >
                <Text as="h5" fontSize="xl" fontWeight="bold" mb={2}>
                  {el.title}
                </Text>
                <Text fontSize="lg" mb={2}>
                  {el.content}
                </Text>

                <Flex>
                  {!el.done ? (
                    <Button
                      type="button"
                      bgColor="#e0e091"
                      onClick={() => nav(`/dashboard/${el.id}`)}
                    >
                      Edit
                    </Button>
                  ) : (
                    ""
                  )}
                  {el.done ? (
                    <Button
                      bgColor="#74d474"
                      mx={2}
                    >
                      Done
                    </Button>
                  ) : (
                    <Button
                      bgColor="tomato"
                      mx={2}
                      onClick={() => {
                        toggleStatus(el.id);
                      }}
                    >
                      Not Done
                    </Button>
                  )}
                  {el.done ? (
                    ""
                  ) : (
                    <Button
                      bgColor='red.500'
                      mx={2}
                      onClick={() => {
                        removeHandler(el.id);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
              </Box>
            </Box>
          ))
        ) : (
          <Text>You currently dont have any tasks</Text>
        )}
        <nav>
             <button className="prev" onClick={prevHandle}>Prev</button>
        <p>
         {
        pages.map((page) =>(
          <button  key={page} className={`${currentP===page? "active":"pages"}`} onClick={()=>setCurrentP(page)}>{page}</button>
        ))
       } 
        </p>
        <span  className="next" onClick={nextHandle}>Next</span> 
        </nav>
    
      </div>

    </div>
  );
}
