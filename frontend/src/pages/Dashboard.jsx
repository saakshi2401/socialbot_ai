import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import RightPanel from '../components/RightPanel';

export default function Dashboard() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [platform, setPlatform] = useState('Instagram');
  const [tone, setTone] = useState('Professional');
  const [feature, setFeature] = useState('Caption Generator');

  const fetchChats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/chat');
      setChats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadChat = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/${id}`);
      setMessages(res.data.messages);
      setCurrentChatId(res.data._id);
      if (res.data.platform) setPlatform(res.data.platform);
    } catch (err) {
      console.error(err);
    }
  };

  const createNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  const deleteChat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/chat/${id}`);
      if (currentChatId === id) createNewChat();
      fetchChats();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        chats={chats} 
        currentChatId={currentChatId} 
        loadChat={loadChat} 
        createNewChat={createNewChat} 
        deleteChat={deleteChat} 
      />
      
      <ChatArea 
        messages={messages} 
        setMessages={setMessages} 
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        platform={platform}
        tone={tone}
        feature={feature}
        refreshChats={fetchChats}
      />
      
      <RightPanel 
        platform={platform} 
        setPlatform={setPlatform}
        tone={tone}
        setTone={setTone}
        feature={feature}
        setFeature={setFeature}
      />
    </div>
  );
}
