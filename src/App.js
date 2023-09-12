import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Home2 from './routes/home/home2.component';
import SignIn from './routes/sign-in/sign-in.component';
import D2d from './routes/d2d/d2d.component';

function App() {
  //App return
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="home2" element={<Home2></Home2>}></Route>
        <Route path="d2d" element={<D2d />}></Route>
        <Route path="sign-in" element={<SignIn />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
