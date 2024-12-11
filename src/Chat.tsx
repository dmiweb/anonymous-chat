const Chat = ({children}: {children: JSX.Element | JSX.Element[]}): JSX.Element => {
  return (
    <div className='chat__list'>
      {children}
    </div>
  );
};

export default Chat;