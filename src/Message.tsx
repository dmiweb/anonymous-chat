type MessageProps = {
  className: string | null,
  id: string,
  message: string,
  color: string | null
}

const Message = ({ className, id, message, color }: MessageProps): JSX.Element => {
  return (
    <li id={id} className={`chat__message ${className}`} style={{color: `${color}`}}>
      {message}
    </li>
  );
};

export default Message;