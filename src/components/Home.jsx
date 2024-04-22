import React, { useEffect } from "react";

import { ChatContainer } from "..";
function Home() {
  return (
    <div className="home displayCenter">
      <ChatContainer />
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}

export default Home;
