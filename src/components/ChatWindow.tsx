import { useState } from "react";
import { X, Send, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  from: "customer" | "vendor";
  text: string;
  time: string;
  read: boolean;
}

interface ChatWindowProps {
  vendorName: string;
  onClose: () => void;
}

const sampleMessages: Message[] = [
  { id: 1, from: "customer", text: "Hi! I'm interested in your services for a wedding in June.", time: "10:30 AM", read: true },
  { id: 2, from: "vendor", text: "Thank you for reaching out! I'd love to help. What date are you looking at?", time: "10:32 AM", read: true },
  { id: 3, from: "customer", text: "June 15th. Do you have availability?", time: "10:35 AM", read: true },
  { id: 4, from: "vendor", text: "Yes, June 15th is open! Would you like to discuss packages?", time: "10:38 AM", read: false },
];

const ChatWindow = ({ vendorName, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMsg, setNewMsg] = useState("");

  const handleSend = () => {
    if (!newMsg.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        from: "customer",
        text: newMsg.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      },
    ]);
    setNewMsg("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-background border rounded-2xl shadow-2xl flex flex-col" style={{ height: "480px" }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-2xl">
        <div>
          <p className="font-semibold text-sm">{vendorName}</p>
          <p className="text-xs opacity-80">Contact securely through EventzHub</p>
        </div>
        <button onClick={onClose} className="hover:opacity-70"><X className="h-5 w-5" /></button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.from === "customer" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${msg.from === "customer" ? "bg-accent text-white" : "bg-muted"}`}>
              <p>{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs ${msg.from === "customer" ? "text-white/70 justify-end" : "text-muted-foreground"}`}>
                <span>{msg.time}</span>
                {msg.from === "customer" && <CheckCheck className={`h-3 w-3 ${msg.read ? "text-blue-300" : "text-white/50"}`} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <Input
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button size="icon" variant="accent" onClick={handleSend} className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
