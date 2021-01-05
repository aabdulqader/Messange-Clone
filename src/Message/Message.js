import React, { forwardRef } from "react";
import "./Message.css";
import { Card, Typography, CardContent } from "@material-ui/core";

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;
  return (
    <div className="message__body">
      {/* <Card className={`message ${isUser && "message__user"}`}> */}
      <Card ref={ref} className={isUser ? "message__user" : "message"}>
        <CardContent>
          <Typography variant="h6">
            {!isUser && `${message.username || "Unknown User"} : `}{" "}
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
