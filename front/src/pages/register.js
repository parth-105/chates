import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'

const Register = () => {
    
    const navigate = useNavigate()

    const [registerdata,setregisterdata] = useState ({
        username:'',
        password:''
    })

    const handelregisterchange = (e) =>{
        const {name,value} = e.target;
        setregisterdata((prevdata)=>({
            ...prevdata,
            [name]:value
        }))
    }

    const handelregistersubmit = async(e) =>{
        e.preventDefault();

        try{
            const responce = await axios.post('http://localhost:8000/register',registerdata);
            console.log(responce.data)
        }
        catch(error){
            console.log("register error")
        }

        console.log(registerdata)

        setregisterdata({
            username:'',
            password:''
        })
        navigate("/login")
    }

  return (
    <div>
        <FormContainer>
      <h1 className='h1'>register</h1>
      <form onSubmit={handelregistersubmit} >
            <input type='text' name='username' placeholder='USERNAME' required value={registerdata.username} onChange={handelregisterchange} />

            <input type='password' name='password' placeholder='PASSWORD' required value={registerdata.password} onChange={handelregisterchange} />

            <button type='submit' >register</button>
            <p>not register ? <Link to='/login'>login here</Link></p>
        </form>
        </FormContainer>
    </div>
  )
}

const FormContainer = styled.div`
 background-color:#131324;
 height:100vh;
 width:100vw;
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
 gap:1rem;

 .h1{
    color:white;
  }

 .brand{
  display:flex;
  align-items:center;
  gap:1rem;
  justify-content:center;
  img{
    height:5rem;
  }
  .h1{
    color:white;
  }
 }

 form{
  display:flex;
  flex-direction:column;
  gap:2rem;
  background-color:#00000076;
  border-radius:2rem;
  padding: 3rem 5rem;
 }

 input{
  background-color:transparent;
  padding:1rem;
  border:0.1rem inset #4e0eff;
  border-radius:0.4rem;
  color:white;
  width:100%;
  font-size:1.2rem;
  &:focus{
    border: 0.18rem outset #4e0eff;
    outline:none;
  }

 }

 button{
  background-color:#4e0eff;
  color:white;
  padding: 1rem 2rem;
  border:none;
  ${'' /* border: 0.1rem groove white; */}
  font-weight:bold;
  cursor:pointer; 
  border-radius:0.4rem;
  font-size:1rem;
  text-transform:uppercase;
  transition: 0.5s transform ease-in-out;
  &:hover{
      ${'' /* background-color:#541bf0d2; */}
      transform:scale(1.05);
  }
 }

 span{
  color:white;
  text-transform:uppercase;
  a{
  color:#4e0eff;
  text-decoration:none;
  font-weight:bold
 }

 

`;

export default Register
