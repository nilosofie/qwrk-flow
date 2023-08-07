import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import D2d from './routes/d2d/d2d.component';

function App() {
  //App return
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<D2d />} />
        <Route path="sign-in" element={<SignIn />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
