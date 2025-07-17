import './App.css'
import Navbar from '../components/Navbar'
import PeriodSelector from '../components/PeriodSelector'
import LeaderBoard from "../components/LeaderBoard"
import { useState } from 'react';
function App() {
  const [period, setPeriod] = useState<string>('all');
  return (
    <>
     <div className='w-full h-full flex-col items-center'>
      <Navbar/>
      <PeriodSelector period={period} setPeriod={setPeriod}/>
      <LeaderBoard period ={period}/>
     </div>
    </>
  )
}

export default App
