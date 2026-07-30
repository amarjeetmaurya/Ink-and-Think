import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import socket from '../socket/socket.js';
import { useEffect } from 'react';
import Players from './Game/Players.js';
import Header from './Game/Header.js';
import ChatPanel from './Game/ChatPanel.js';

interface ChatMessage {
  text: string;
  sender: string;
  time: string; // ISO string
}

interface Point {
  x: number;
  y: number;
}

interface DrawBatchPayload {
  strokeId: string;
  points: Point[];
  color: string;
  width: number;
}

interface StrokeHistoryItem {
  points: Point[];
  color: string;
  width: number;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit('send-message', {
      text: input,
      sender: socket.id,
      time: new Date().toISOString()
    });
    setInput('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const lastPos = useRef<Point>({ x: 0, y: 0 });
  const strokeBuffer = useRef<Point[]>([]); // points collected for the current stroke
  const currentStrokeId = useRef<string | null>(null);

  const drawPoints = (points: Point[], color: string = 'black', width: number = 5) => {
    const canvas = canvasRef.current;
    if (!canvas || points.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  };

  useEffect(() => {
    // Listen for strokes from other users
    const handleDrawBatch = ({ points, color, width }: DrawBatchPayload) => {
      drawPoints(points, color, width);
    };

    // Late-join: server sends full history to sync up
    const handleCanvasHistory = (strokes: StrokeHistoryItem[]) => {
      strokes.forEach(({ points, color, width }) => drawPoints(points, color, width));
    };

    socket.on('draw-batch', handleDrawBatch);
    socket.on('canvas-history', handleCanvasHistory);

    return () => {
      socket.off('draw-batch', handleDrawBatch);
      socket.off('canvas-history', handleCanvasHistory);
    };
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    currentStrokeId.current = crypto.randomUUID();
    const pos: Point = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    lastPos.current = pos;
    strokeBuffer.current = [pos];
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const pos: Point = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // draw locally immediately (instant feedback)
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.stroke();

    strokeBuffer.current.push(pos);
    lastPos.current = pos;

    // batch-emit every N points instead of every mousemove
    if (strokeBuffer.current.length >= 8) {
      flushBuffer();
    }
  };

  const flushBuffer = () => {
    if (strokeBuffer.current.length < 2 || !currentStrokeId.current) return;
    const payload: DrawBatchPayload = {
      strokeId: currentStrokeId.current,
      points: strokeBuffer.current,
      color: 'black',
      width: 5
    };
    socket.emit('draw-batch', payload);
    // keep last point so the next batch connects seamlessly
    strokeBuffer.current = [strokeBuffer.current[strokeBuffer.current.length - 1]];
  };

  const handleMouseUp = () => {
    setDrawing(false);
    flushBuffer(); // send whatever's left in the buffer
  };

  useEffect(() => {
    socket.on('receive-message', (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-center items-center">
      {/* header  */}
      <Header />

      <div className="grid grid-cols-[0.6fr_2.3fr_0.7fr] w-full max-w-328 three-col-layout">
        {/* Left */}
        <Players />

        {/* Middle */}
        <div className="bg-[#fffdf7] aspect-4/3 w-full items-center flex justify-center middle">
          <div className="bg-[#fffdf7] h-full max-w-200 max-h-150">
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="w-full h-full border-sketch-sm border "
            />
          </div>
        </div>

        {/* Right */}
        <ChatPanel
          messages={messages}
          input={input}
          onInputChange={setInput}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
        />
      </div>

      {/* main  */}
      {/* <div className="grid grid-cols-[0.6fr_2.2fr_0.7fr]  gap-4 w-full max-w-328">
        <Players />

        <div className="bg-[#fffdf7] border-sketch-sm shadow-sketch-lg aspect-4/3 w-full max-w-200 p-2 relative font-patrick">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="w-full h-full border-sketch-sm border"
          />
        </div>
        <ChatPanel
          messages={messages}
          input={input}
          onInputChange={setInput}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
        />
      </div> */}
    </div>
  );
};

export default ChatBox;
