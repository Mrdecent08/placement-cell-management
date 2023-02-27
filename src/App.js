import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AddDrive } from './components/AddDrive';
import { DriveResults } from './components/DriveResults';
import { Drives } from './components/Drives';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ViewStudents } from './components/ViewStudents';
import { UpdateStudent } from './components/UpdateStudent';
import { AddResult } from './components/AddResult';
import { AddAdmin } from './components/AddAdmin';
import ContactUs from './components/ContactUs';
import { Statistic } from './components/Statistic';
import AddStats from './components/AddStats';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/statistics" element={<Statistic />}></Route>
        <Route path="/addstats" element={<AddStats />}></Route>
        <Route path="/addDrive" element={<AddDrive />}></Route>
        <Route path="/addResult" element={<AddResult />}></Route>
        <Route path="/driveResults" element={<DriveResults />}></Route>
        <Route path="/drives" element={<Drives />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/viewStudents" element={<ViewStudents />}></Route>
        <Route path="/update" element={<UpdateStudent />}></Route>
        <Route path="/addAdmin" element={<AddAdmin />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
      </Routes>
    </div>
  );
}

export default App;
