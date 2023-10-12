import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import {
  Header,
  Provider,
  Chat,
  ConversationList,
  ConversationItem,
  useClient,
  rootStore,
  Button,
  Avatar,
  Icon,
  MessageList,
  MessageEditor,
  TextMessage,
  CurrentConversation,
  useChatContext,
  useConversationContext,
} from "chatuim2";
import "chatuim2/style.css";

import "./index.css";
import AgoraChat from "agora-chat";
import { appKey, userId, token } from "../config";

const ChatApp = () => {
  const { setCurrentConversation } = useConversationContext();
  const { sendMessage } = useChatContext();
  // create a conversation
  const setCurrentCvs = () => {
    setCurrentConversation({
      chatType: "singleChat",
      conversationId: "jim",
      name: "Jim",
    });
  };

  // render custom text message
  const renderTxtMsg = (msg) => {
    return (
      <TextMessage
        bubbleStyle={{ background: "hsl(135.79deg 88.79% 36.46%)" }}
        shape="square"
        status={msg.status}
        avatar={<Avatar style={{ background: "pink" }}>A</Avatar>}
        textMessage={msg}
      ></TextMessage>
    );
  };
  const renderMessage = (msg) => {
    if (msg.type === "txt") {
      return renderTxtMsg(msg);
    } else if (msg.type === "custom") {
      return renderCustomMsg(msg);
    }
  };

  // add an icon to the message editor
  const CustomIcon = {
    visible: true,
    name: "CUSTOM",
    icon: (
      <Icon
        type="DOC"
        onClick={() => {
          sendCustomMessage();
          console.log("click custom icon");
        }}
      ></Icon>
    ),
  };

  // Implement Sending Custom Messages

  const sendCustomMessage = () => {
    const customMsg = AgoraChat.message.create({
      type: "custom",
      to: "jim", // Need to be the user ID of the current conversation
      chatType: "singleChat",
      customEvent: "CARD",
      customExts: {
        id: "userId3",
      },
    });
    sendMessage(customMsg).then(() => {
      console.log("send success");
    });
  };

  const renderCustomMsg = (msg) => {
    return (
      <div>
        <h1>Business Card </h1>
        <div>{msg.customExts.id}</div>
      </div>
    );
  };
  const actions = [...MessageEditor.defaultActions];
  actions.splice(2, 0, CustomIcon);
  return (
    <>
      <div style={{ width: "65%", borderLeft: "1px solid transparent" }}>
        <Chat
          renderMessageList={() => (
            <MessageList renderMessage={renderMessage} />
          )}
          renderMessageEditor={() => <MessageEditor actions={actions} />}
        ></Chat>
      </div>
      <Button onClick={setCurrentCvs}>setCurrentCvs</Button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("chatRoot") as Element).render(
  <div className="container">
    <Provider
      initConfig={{
        appKey,
        userId,
        token,
      }}
    >
      <ChatApp></ChatApp>
    </Provider>
  </div>
);
