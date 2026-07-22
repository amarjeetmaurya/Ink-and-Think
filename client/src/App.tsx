import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import ChatBox from "./components/ChatBox";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        
        {/* Protected/Lobby routes using the shared AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="draw" element={<ChatBox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
