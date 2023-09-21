import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './routes/sign-in/sign-in.component';
import D2d from './routes/d2d/d2d.component';
import OrgWiz from './routes/org-wiz/org-wiz';

function App() {
  //App return
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />}></Route>
        <Route path="d2d" element={<D2d />}></Route>
        <Route path="org-wiz" element={<OrgWiz />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
