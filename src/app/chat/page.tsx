
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Search, MessageSquare, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for prototype since we're simulating the flow
const MOCK_CHATS = [
  { id: 'chat1', name: 'AiBaby Store', lastMessage: 'Yes, it is in stock!', time: '10:30 AM', unread: 2 },
  { id: 'chat2', name: 'Sara Enterprise', lastMessage: 'Thank you for your order.', time: 'Yesterday', unread: 0 },
];

export default function ChatPage() {
  const searchParams = useSearchParams();
  const sellerId = searchParams.get('sellerId');
  const [activeChat, setActiveChat] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('techshop_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    if (sellerId) {
      setActiveChat({ id: 'new', name: sellerId, isNew: true });
    }
  }, [sellerId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: user?.email || 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate response
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: "Thanks for reaching out! One of our agents will assist you shortly.",
        sender: activeChat?.name || 'Seller',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-[#eff0f5]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-0 sm:px-4 py-0 sm:py-6 overflow-hidden">
        <div className="bg-white h-full sm:h-[calc(100vh-160px)] rounded-none sm:rounded-sm shadow-sm flex overflow-hidden border">
          
          {/* Sidebar: Conversations */}
          <div className={`w-full sm:w-80 border-r flex flex-col ${activeChat ? 'hidden sm:flex' : 'flex'}`}>
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Messages
              </h2>
            </div>
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search chats..." className="pl-9 rounded-full bg-gray-50 border-none h-9 text-sm" />
              </div>
            </div>
            <ScrollArea className="flex-1">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors border-b last:border-none ${activeChat?.id === chat.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                >
                  <Avatar className="w-12 h-12 border">
                    <AvatarImage src={`https://picsum.photos/seed/${chat.id}/100/100`} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-sm truncate">{chat.name}</h4>
                      <span className="text-[10px] text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Main: Chat Window */}
          <div className={`flex-1 flex flex-col bg-[#f4f7f9] ${!activeChat ? 'hidden sm:flex' : 'flex'}`}>
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-3 bg-white border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setActiveChat(null)}>
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Avatar className="w-10 h-10 border border-primary/20">
                      <AvatarImage src={`https://picsum.photos/seed/${activeChat.id}/100/100`} />
                      <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">{activeChat.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Online</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400"><User className="w-5 h-5" /></Button>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <span className="text-[10px] bg-gray-200 text-gray-500 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Today</span>
                    </div>
                    
                    {messages.length === 0 && (
                      <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100 max-w-sm mx-auto">
                        <p className="text-xs text-blue-600">Start a conversation with <b>{activeChat.name}</b>. Inquiries are usually answered within minutes.</p>
                      </div>
                    )}

                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === user.email ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] space-y-1 ${msg.sender === user.email ? 'items-end' : 'items-start'}`}>
                          <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                            msg.sender === user.email 
                            ? 'bg-primary text-white rounded-tr-none' 
                            : 'bg-white text-gray-700 rounded-tl-none border'
                          }`}>
                            {msg.text}
                          </div>
                          <p className="text-[10px] text-gray-400 px-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 bg-white border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..." 
                      className="flex-1 rounded-full border-gray-200 bg-gray-50 focus-visible:ring-primary h-11"
                    />
                    <Button type="submit" size="icon" className="rounded-full w-11 h-11 bg-primary hover:brightness-110 shrink-0">
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary/20">
                  <MessageSquare className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Your Conversations</h3>
                  <p className="text-sm text-gray-400 max-w-xs mx-auto">Select a chat to start messaging or contact a seller from a product page.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
