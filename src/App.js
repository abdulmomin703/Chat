import "./App.css";
import { useState } from "react";
import MyMsg from "./components/myMsg";
import OtherMsg from "./components/otherMsg";
import User from "./components/user";
import { LoginApi, GetUsersApi } from "./services/user.services";
import { socket, initSocket } from "./services/socket.service";

function App() {
  const [msgs, setMsgs] = useState([]);
  const [val, setVal] = useState("");
  const [user, setUser] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [userInput, setUserInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const onUserClicked = (name) => {
    setOtherUser(name);
  };

  socket.on("get-message", ({ sender, reciever, val }) => {
    let temp = [...msgs];
    temp.push({ sender, reciever, val });
    setMsgs(temp);
  });

  return (
    <div className="outer-main-container">
      {otherUser ? (
        <div className="main-container">
          <div className="text-container">
            <h2 className="name"> You: {user}</h2>
            <h2 className="name"> Other: {otherUser}</h2>

            <button
              className="logout-button"
              onClick={() => {
                //socket.emit("removeUser", { username: userInput });
                GetUsersApi().then((res) => {
                  setAllUsers(res.data.data);
                });
                setOtherUser("");
                //                setUserInput("");
                //                setUser("");
                //                setMsgs("");
              }}
            >
              Back
            </button>
          </div>
          <div className="msg-container">
            {msgs?.map((item, key) => {
              return (
                <>
                  {item.sender == otherUser || item.reciever == otherUser ? (
                    item.sender == user ? (
                      <MyMsg key={key} msg={item.val} />
                    ) : (
                      <OtherMsg key={key} msg={item.val} />
                    )
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </div>
          <form
            className="input-container"
            onSubmit={(e) => {
              e.preventDefault();
              if (val != "") {
                let temp = [...msgs];
                temp.push({ sender: user, reciever: otherUser, val: val });
                setMsgs(temp);
                socket.emit("send-message", {
                  sender: user,
                  reciever: otherUser,
                  val: val,
                });
                setVal("");
              }
            }}
          >
            <input
              className="input-style"
              placeholder="Enter the Message...."
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </form>
        </div>
      ) : allUsers.length > 0 ? (
        <div className="users-container">
          <h1 className="users-main-heading">All Users</h1>
          <div className="users-inner-container">
            {allUsers.map((item, key) => {
              return (
                <>
                  {user != item && (
                    <User index={key + 1} name={item} onClick={onUserClicked} />
                  )}
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="inner-main-container">
          <form
            className="login-container"
            onSubmit={(e) => {
              e.preventDefault();
              if (userInput != "") {
                LoginApi(userInput)
                  .then((res) => {
                    debugger;
                    console.log(res);
                    setAllUsers(res.data.data);
                    setUser(userInput);
                    initSocket();
                    socket.emit("addUser", { username: userInput });
                  })
                  .catch((err) => {
                    console.log(err);
                    setUserInput("");
                  });
              } else {
                window.alert("Empty Sedly");
              }
            }}
          >
            <h1 className="login-text">Login</h1>
            <input
              placeholder="Enter the Username...."
              className="login-input"
              id="inputID"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
            <button type="submit" className="login-button">
              Enter
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
