import React, {useState} from 'react'
import './Addkeeper.css'
import axios from 'axios';

const Addkeeper = ({setKeeperList}) => {

  const [keeperObj, setKeeperObj] = useState({
    title : "",
    description : ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setKeeperObj({
      ...keeperObj, [name] : value
    })
  }

  const add = () => {
    if(keeperObj.title) {
        axios.post("http://localhost:5000/api/addNew", keeperObj)
        .then(res => setKeeperList(res.data))
        setKeeperObj({
            title: "",
            description:""
        })
    }
    else{
      alert("Please add 'Title' to your note.")
    }
}

  return (
    <div className='Addkeeper'>
      <input type="text" className='inputBox titleInput' autoComplete='off' placeholder='Add Title' name='title' value={keeperObj.title} onChange={handleChange}/>

      <input type="text" className='inputBox description' autoComplete='off' placeholder='Add Description Here' name='description' value={keeperObj.description} onChange={handleChange}/>

      <div className="addButton" onClick={add}>Add</div>
    </div>
  )
}

export default Addkeeper
