import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MessageSquarePlus, MessageCircle, LogOut, Settings, Trash2 } from 'lucide-react';

export default function Sidebar({ chats, currentChatId, loadChat, createNewChat, deleteChat }) {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="w-72 bg-surface border-r border-surfaceLight flex flex-col h-full shrink-0">
      <div className="p-4">
        <button 
          onClick={createNewChat}
          className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-purple-600 text-white p-3 rounded-xl transition-colors shadow-lg shadow-primary/20 font-medium"
        >
          <MessageSquarePlus className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        <h3 className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-3 px-2">Recent History</h3>
        {chats.map(chat => (
          <div 
            key={chat._id}
            className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${currentChatId === chat._id ? 'bg-surfaceLight border border-primary/30' : 'hover:bg-surfaceLight border border-transparent'}`}
            onClick={() => loadChat(chat._id)}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <MessageCircle className="w-5 h-5 text-textMuted flex-shrink-0" />
              <span className="text-sm truncate text-textMain">{chat.title || 'New Chat'}</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); deleteChat(chat._id); }}
              className="opacity-0 group-hover:opacity-100 p-1 text-textMuted hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-surfaceLight">
        <div className="flex items-center space-x-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm font-medium truncate">{user?.name}</div>
        </div>
        
        <button className="w-full flex items-center space-x-3 text-textMuted hover:text-white p-2 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button onClick={logout} className="w-full flex items-center space-x-3 text-textMuted hover:text-red-400 p-2 rounded-lg transition-colors mt-1">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
