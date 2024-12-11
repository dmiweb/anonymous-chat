import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import createRequest from './createRequest';
import randomColor from './randomColor';
import Chat from './Chat';
import Message from './Message';
import FormAddMessage from './FormAddMessage';
import './App.css';

type Messages = {
  id: string,
  userId: string,
  content: string
}[]

function App(): JSX.Element {
  const [messages, setMessages] = useState<Messages | []>([]);

  const url = 'https://anonymous-chat-backend.vercel.app/messages';

  useEffect(() => {
    createRequest(url)
      .then(res => setMessages(res));

    if (!localStorage.anonymousChatUserId) {
      localStorage.setItem('anonymousChatUserId', uuidv4());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = messages[messages.length - 1]?.id || 0;

      createRequest(`${url}?from=${id}`)
        .then(message => {
          if (!message.length) return;

          setMessages(prevMessages => [...prevMessages, ...message])
        });
    }, 1000);

    return () => clearInterval(interval);
  })

  useEffect(() => {
    const chatList: Element | null = document.querySelector(".chat__list");

    if (chatList) chatList.scrollTop = chatList.scrollHeight;
  }, [messages])

  const onAddMessage = async (message: string): Promise<void> => {
    const userId = localStorage.getItem('anonymousChatUserId');

    const newMessage = {
      id: 0,
      userId: userId,
      content: message
    }

    await createRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    });
  }

  return (
    <>
      <h1 className='app-title'>Anonymous chat</h1>
      
      <div className='chat'>
        <Chat>
          {
            messages.map(m => localStorage.anonymousChatUserId === m.userId ?
              <Message key={m.id} className='message-aligin-right' id={m.id} message={m.content} color={null} />
              :
              <Message key={m.id} className={null} id={m.id} message={m.content} color={randomColor()} />)
          }
        </Chat>

        <FormAddMessage onAddMessage={onAddMessage} />
      </div>
    </>
  )
}

export default App;
