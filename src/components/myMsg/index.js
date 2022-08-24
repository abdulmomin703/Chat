import "./myMsg.css";

function MyMsg(props) {
  const { msg } = props;

  return <div className="my-msg-container">{msg}</div>;
}

export default MyMsg;
