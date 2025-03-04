
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  // console.log(messages);
  const lastMessage = useRef();
  useEffect(() => {
    setTimeout(() =>{
      lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    })
    // lastMessage.current?.scrollIntoView({behavior:'smooth'})
  }, [messages])
  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}
          ref={lastMessage}
          >
            <Message  message={message} />
          </div>

        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className='text-center text-black'>Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages