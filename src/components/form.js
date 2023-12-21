import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
const DeviceForm = () => {
    useEffect(() => {
        AOS.init({

        });
      }, []);
  const [formData, setFormData] = useState([]);
  const [title,setTitle]=useState("");
  const [brand,setBrand]=useState("");
  const [price,setPrice]=useState();
  const [description,setDescription]=useState("")
  const [flag,setFlag]=useState(false);
  const [indexing,setIndexing]=useState("")
  const [isEdit, setIsEdit] = useState(false);
  const [updateflag,setUpdateflag]=useState(false)
 
  const [submitMessage, setSubmitMessage] = useState('');
  
  useEffect(()=>{
    getTodo();
    
  },[])
  const getTodo = async() =>{
    try {
        let a = await axios.get("https://backend-todo-eight.vercel.app/todo/get-todo");
        setFormData(a.data.Todo)
        
    } catch (error) {
        console.log(error)
    }
  }

  

  const onAddHandler = async(e) => {
    e.preventDefault();
    if(!isEdit){
      let a = {
        title:title,
        description:description,
        price:price,
        brand:brand,
    }
    try {
        setFlag(true)
        let b = await axios.post("https://backend-todo-eight.vercel.app/todo/add-todo",a);
        setFormData([...formData,a])
            setFlag(false)
            setBrand("")
            setDescription("")
            setPrice("")
            setTitle("")   
              
         } catch (error) {
             console.log(error)   
        }
    }else{
      const updatedObj = {
        title,price,brand,description, id:indexing
      }
      console.log(indexing)
      fetch("https://crudbackend-iota.vercel.app/todo/update-todo", {
        method: "POST",
        body: JSON.stringify(updatedObj)
      }).then(updated => updated.json()).then(final => console.log(final)).catch(err => console.log(err))
     
    }
   

  };

  const onDeleteHandler = async(iding) =>{
    try {
        let b= await axios.delete(`https://backend-todo-eight.vercel.app/todo/delete-todo/${iding}`);
       
        let a = formData.filter((value,index)=>{
            if(value._id!==iding){
                return value;
            }
        })
        setFormData(a)
        
    } catch (error) {
        console.log(error)
        
    }

  }
  const onTitleHandler = (e) =>{
    setTitle(e.target.value)

  }
  const onEditHandler = async (value, index) => {
   
setUpdateflag(true)
      setIndexing(index);
      setBrand(value.brand);
      setTitle(value.title);
      setDescription(value.description);
      setPrice(value.price);
      
     
  
  };

  const onBrandHandler=(e)=>{
    setBrand(e.target.value)
  }
  const onPriceHandler=(e)=>{
    setPrice(e.target.value)
  }
  const onDescriptonHandler=(e)=>{
    setDescription(e.target.value)
  }
  const onUpdateHandler = async() =>{

    let a = {
      title:title,
      description:description,
      price:price,
      brand:brand,
  }
  try {
    let b= await axios.put(`https://backend-todo-eight.vercel.app/todo/update-todo/${indexing}`,a);
    console.log("sdafdfsdfsdf",b)
    let c = formData.map((value,index)=>{
    
      if(value._id===indexing){
        return a
      }
      else{
        return value
      }
  
    })
    setFormData(c)
    setUpdateflag(false)
    setTitle("")
    setBrand("")
    setDescription("")
    setPrice("")
    
  } catch (error) {
    
  }
  
}

  return (
    <div>
    <div className="flex items-center justify-center ">
      <div data-aos="zoom-in"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-6 mb-4 w-96"
       >
         <div  className="mb-4 text-xl font-bold">
            Enter your device details
         </div>
        <div className="mb-4">
          <label data-aos="slide-left" className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input data-aos="rotate-up-left" value={title}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            name="title"
            
            onChange={onTitleHandler}
            required
          />
        </div>
        <div className="mb-4">
          <label data-aos="slide-right" className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
            Brand
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="brand"
            type="text"
            placeholder="Enter brand"
            name="brand"
            value={brand}
            onChange={onBrandHandler}
            required
          />
        </div>
        <div className="mb-4">
          <label data-aos="slide-left" className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Enter price"
            name="price"
            value={price}
            onChange={onPriceHandler}
            required
          />
        </div>
        <div className="mb-4">
          <label data-aos="slide-right" className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={onDescriptonHandler}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          {updateflag?<button disabled={flag} onClick={onUpdateHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
        {flag?"Updating" : "Update"}
          </button>:
          
          <button disabled={flag} onClick={onAddHandler}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
        {flag?"Submitting" : "Submit"}
          </button>
}
        </div>

        {submitMessage && (
          <div className="mt-4 text-green-600 text-sm">{submitMessage}</div>
        )}
      </div>

    </div>
   
    <div class="relative overflow-x-auto flex items-center justify-center">
    {
      formData.length>0?
    
  <table class="w-96 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr className='font-extrabold text-lg'>
        <th scope="col" class="px-6 py-3">
          Id
        </th>
        <th scope="col" class="px-6 py-3">
          Title
        </th>
        <th scope="col" class="px-6 py-3">
          Brand
        </th>
        <th scope="col" class="px-6 py-3">
          Price
        </th>
        <th scope="col" class="px-6 py-3">
          Description
        </th>
        <th scope="col" class="px-6 py-3">
          Delete
        </th>
        <th scope="col" class="px-6 py-3">
          Update
        </th>
      </tr>
    </thead>
    {formData.map((value, index) => {
      return (
        <tbody key={index}>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
            >
              {index + 1}
            </th>
            <td class="px-6 py-4 items-center justify-center text-center">
              {value.title}
            </td>
            <td class="px-6 py-4 items-center text-center">
              {value.brand}
            </td>
            <td class="px-6 py-4 text-center">
              {value.price}
            </td>
            <td class="px-6 py-4 text-center">
              {value.description}
            </td>
            <td class="text-center">
              <button onClick={() => onDeleteHandler(value._id)} class="bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Delete
              </button>
            </td>
            <td class="text-center">
              <button onClick={() => onEditHandler(value, value._id)} class="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Update
              </button>
            </td>
          </tr>
        </tbody>
      );
    })}
  </table>
:""
}
</div>

    </div>
  );
};

export default DeviceForm;
