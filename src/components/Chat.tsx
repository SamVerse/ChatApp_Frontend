import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { ArrowBack, Add, Send } from "@mui/icons-material";
import { sendMessage, receiveMessage } from "../store/chatSlice";
import { RootState } from "../store/store";

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      dispatch(sendMessage({ text: input }));
      setInput("");
      simulateReceiveMessage();
    }
  };

  const simulateReceiveMessage = () => {
    setTimeout(() => {
      dispatch(
        receiveMessage({
          text: "This is a simulated response!",
          sender: "Darrell Beck",
        })
      );
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "414px",
        margin: "auto",
        bgcolor: "#f3e5f5",
        position: "relative",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "white",
        }}
      >
        <IconButton edge="start" color="inherit" aria-label="back">
          <ArrowBack />
        </IconButton>
        <Avatar sx={{ ml: 1, mr: 2 }}>DB</Avatar>
        <Typography variant="h6">Darrell Beck</Typography>
      </Paper>

      <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              justifyContent:
                message.sender === "User" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 1,
                maxWidth: "70%",
                borderRadius: 4,
                bgcolor: message.sender === "User" ? "#9c27b0" : "white",
                color: message.sender === "User" ? "white" : "inherit",
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Paper
        component="form"
        onSubmit={handleSend}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 50,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="add">
          <Add />
        </IconButton>
        <TextField
          fullWidth
          variant="standard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message"
          InputProps={{ disableUnderline: true }}
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="send">
          <Send />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default Chat;