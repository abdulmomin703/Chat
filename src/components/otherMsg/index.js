import "./otherMsg.css";

function OtherMsg(props) {
  const { msg } = props;

  return <div className="other-msg-container">{msg}</div>;
}

export default OtherMsg;
