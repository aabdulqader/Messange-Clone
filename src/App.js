import React, { useEffect, useState } from "react";
import "./App.css";
import { Input, FormControl, InputLabel, IconButton } from "@material-ui/core";
import Message from "./Message/Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import image from "./messanger.png";

function App() {
  // dammy data
  /*const msg = [
    {
      username: "Shimul",
      message: "hello",
    },
    {
      username: "Chapa",
      message: "hi",
    },
    {
      username: "Shimul",
      message: "What's up",
    },
  ];*/

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // get messages from firebase
  useEffect(() => {
    db.collection("messags")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt(">>> Please enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // send message
    db.collection("messags").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //dammy data
    // setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <img src={image} alt="Messanger" />
      {username ? (
        <h3 className="welcome">
          Hey! Welcome <strong>{username}</strong>
        </h3>
      ) : (
        <h3 className="welcome">No Username</h3>
      )}
      <form className="form-control">
        <FormControl className="form">
          <div className="input">
            <InputLabel>Send a message...</InputLabel>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
          </div>

          <IconButton
            className="btn"
            variant="contained"
            color="primary"
            disabled={!input}
            onClick={sendMessage}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      {/* messages themselves */}
      <FlipMove>
        {messages.map(({ message, id }) => (
          <Message key={id} message={message} username={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
