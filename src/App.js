import React ,{useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import DeviceForm from './components/form';
function App() {
  const [data, setData] = useState("");
  const getData = async()=>{
    let a = {
      title:"",
      brand:"",
      price:"",
      description:""
    }
    try {
      const response = await axios.post("http://localhost:4000/todo/add-todo",a)
      
      
    } catch (error) {
      console.log(error)
      
    }
    
  }
  useEffect(()=>{
    getData();
  },[])
  return (
    <div className='bg-blue-500'>
      <DeviceForm />
    </div>
  );
}

export default App;
