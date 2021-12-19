import { useEffect, useState } from 'react';
import Login from './Login';

function App() {

  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("[App] useEffect");
    // TODO: to find a way to return access_token back here and set it to frontend so that i can init the Web player
  }, [])

  return (
    <>
    { (token === '') ? <Login/> : <WebPlayback token={token} /> }
    </>
  )
}

export default App;
