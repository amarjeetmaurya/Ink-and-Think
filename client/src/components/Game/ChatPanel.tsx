import { type KeyboardEvent } from 'react';
import socket from '../../socket/socket';

interface ChatMessage {
  text: string;
  sender: string;
  time: string; // ISO string
}

interface ChatPanelProps {
  messages: ChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  sendMessage: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const ChatPanel = ({ messages, input, onInputChange, sendMessage, handleKeyDown }: ChatPanelProps) => {
  return (
    <div className="bg-[#fffdf7] border-sketch-sm shadow-sketch-lg w-full min-w-36 right h-full relative">
      {/* Tape sticker top center */}
      {/* <div
        className="tape-sticker tape-top-left"
        style={{ left: 'calc(50% - 45px)' }}
      /> */}

      {/* Notebook Title */}
      <div className="font-caveat font-extrabold text-lg text-indigo-950 text-center border-b-2 border-dashed border-indigo-950/30 pb-1 mb-1">
        💬 Live Chat & Guesses
      </div>

      {/* Messages Container with Ruled Paper lines */}
      <div className="bg-ruled-paper border-sketch-sm rounded-xl p-3 overflow-y-auto custom-scrollbar flex flex-col gap-2 mb-3 shadow-inner">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-indigo-900/40 font-kalam text-lg  italic text-center">
            ✏️ Type a message or guess the word...
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className="bg-[#fef9c3] border-sketch-sm p-2.5 rounded-xl shadow-sketch-sm text-indigo-950 font-kalam text-sm flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-[11px] text-indigo-800/60 font-bold border-b border-indigo-950/10 pb-0.5">
                <span>{msg.sender === socket.id ? 'You' : `Player (${msg.sender.slice(0, 4)})`}</span>
                <span>{new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="font-bold text-base mt-0.5 text-indigo-950">{msg.text}</div>
            </div>
          ))
        )}
      </div>

      {/* Input & Send Bar */}
      <div className="flex gap-2 flex-wrap overflow-hidden absolute bottom-0 w-full">
        <input
          className="flex-1 bg-[#fcf9f2] border-sketch-sm rounded-xl pl-3 text-indigo-950 font-kalam font-bold text-lg placeholder-indigo-900/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your guess..."
        />

        <button
          className="btn-sketch bg-indigo-600 hover:bg-indigo-500 text-white px-3 text-lg font-kalam font-bold shadow-sketch-indigo rounded-xl"
          onClick={sendMessage}>
          Send ✏️
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
