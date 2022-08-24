import "./user.css";

function User(props) {
  const { index, name, onClick } = props;

  return (
    <div
      className="user-container"
      onClick={() => onClick(name)}
    >{`${index}-  ${name}`}</div>
  );
}

export default User;
