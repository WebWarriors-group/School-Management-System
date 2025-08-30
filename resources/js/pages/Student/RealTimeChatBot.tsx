import { useState , useEffect , useRef } from 'react';
import { MessageSquare , Send ,Bot , User} from 'lucide-react';

// Define types for our refs and data
interface PusherInstance {
  new (key: string, options: any): any;
}

interface ChannelInstance {
  bind: (event: string, callback: (data: any) => void) => void;
  unbind_all: () => void;
  unsubscribe: () => void;
}

interface PusherConnection {
  bind: (event: string, callback: () => void) => void;
}

interface PusherWithConnection {
  connection: PusherConnection;
  subscribe: (channel: string) => ChannelInstance;
  disconnect: () => void;
}

const RealTimeChatBot = () => {
    const [messages, setMessages] = useState([
        {
            id:1,
            text: "Hello! I'm your AI assistant. How can I help you today?" ,
             sender: 'bot',
              timestamp: new Date() 
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] =useState(false);
    const [isConnected , setIsConnected] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pusherRef = useRef<PusherWithConnection | null>(null);
    const channelRef = useRef<ChannelInstance | null>(null);

    useEffect(() => {
        const initPusher = async () => {
            try{
            const Pusher = (await import('pusher-js')).default as PusherInstance;
            console.log('Initializing Pusher with key:', import.meta.env.VITE_REVERB_APP_KEY);

            pusherRef.current = new Pusher(import.meta.env.VITE_REVERB_APP_KEY,{
                wsHost: import.meta.env.VITE_REVERB_HOST ?? 80,
                wsPort: import.meta.env.VITE_REVERB_PORT ?? 443,
                forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
                enabledTransports:['ws', 'wss'],
                cluster: 'mtl',
            });
            if(pusherRef.current){
            console.log('Subscribing to channel: ai-chat');
            channelRef.current = pusherRef.current.subscribe('ai-chat');

            if(channelRef.current){
            console.log('Binding to event: message.sent');
            channelRef.current.bind('message.sent',(data:{
                message: string
            }) => {
                console.log('Received message from bot:', data);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: data.message,
                    sender: 'bot',
                    timestamp: new Date()
                }]);
                setIsLoading(false);
            });
        }
        if(pusherRef.current.connection){
            pusherRef.current.connection.bind('connected', () => {
                console.log('Pusher connected');
                setIsConnected(true);
            });

            pusherRef.current.connection.bind('disconnected', () => {
                console.log('Pusher disconnected');
                setIsConnected(false);
            });
            pusherRef.current.connection.bind('error', (err) => {
                console.error('Pusher connection error:', err);
            });
            
        }
    }
}catch(error){
    console.error('Error initializing Pusher:', error);
}
            return () => {
                if(channelRef.current){
                    channelRef.current.unbind_all();
                    channelRef.current.unsubscribe();
                }
                if(pusherRef.current){
                    pusherRef.current.disconnect();
                }
            };

        };
        initPusher();
    } , []);

    useEffect(() => {
        scrollToBottom();

    },[messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth'});

    };

    const handleSendMessage = async (e:React.FormEvent) => {
        e.preventDefault();
        if(!inputText.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await  fetch('/api/chat',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ message: inputText})

        });

        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        }
        catch(error){
            console.error('Error sending message:', error);
            setIsLoading(false);
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: "Sorry, I couldn't process your message at the moment. Please try again later.",
                sender: 'bot',
                timestamp: new Date()
            }]);
    }


};
 const formatTime = (date:Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 };

 return (
<div className="bg-white p-5 rounded-xl shadow-sm">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <MessageSquare className="mr-2 text-amber-600" size={20}/>AI Assistant
        </h2>
        <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>

            </div>
            <span className="text-xs text-gray-500">{isConnected ? 'Online': 'Offline'} </span>
        </div>
    </div>
<div className="h-64 overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
    {messages.map((message) => (
        <div key = {message.id} className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md rounded-xl px-4 py-2 ${message.sender === 'user' ? 'bg-amber-500 text-white rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none'}`}>
                <div className="flex items-start"> {message.sender == 'bot' && <Bot className="mr-2 mt-0.5 text-amber-500"/>}
                <div>
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-amber-100' : 'text-gray-500'}`}>{formatTime(message.timestamp)}</p>
            </div>
            {message.sender === 'user' && <User size={16} className="ml-2 mt-0.5 text-amber-100"/>}
                </div>
            </div>
        </div>
    ))}
    {isLoading && (
    <div className="flex justify-start mb-3">
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 rounded-bl-none max-w-xs">
            <div className="flex items-center">
<Bot size={16} className="mr-2 text-amber-500"/>
<div className="flex space-x-1">
    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
    
        <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
        <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0.4s' }}></div>
    
</div>
        </div>
        </div>
    </div>
    )}

<div ref={messagesEndRef}/>
</div>
<form className="flex" onSubmit={handleSendMessage}>
<input
type='text'
value={inputText}
className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
onChange={(e) => setInputText(e.target.value)}
placeholder="Type...." 
disabled={!isConnected}/>

<button type='submit'
className="bg-amber-500 text-white px-4 py-2 rounded-r-lg hover:bg-amber-600 transition-colors disabled:bg-amber-300"
disabled={!inputText.trim() || isLoading || !isConnected}>
    <Send size={18}/>

</button>
</form>
</div>
 );
};
export default RealTimeChatBot;