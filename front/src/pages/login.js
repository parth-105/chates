import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate();

    const [logindata,setlogindata] =useState({
        username:'',
        password:''
    })

    const handeleloginchange=(e)=>{
            const {name,value} = e.target;
            setlogindata((prevdata)=>({
                ...prevdata,
                [name]:value
            }))

    }

    const handelloginsubmit = async(e)=>{
        e.preventDefault();

        try{
          //  const responce = await axios.post('http://localhost:8000/login',logindata) ;
          const responce = await axios.post('http://192.168.243.88:8000/login',logindata) ;
           const {success,message} = responce.data;

         if(responce.statusText === "OK") 
         {
            const {user} = responce.data
            console.log(user)
            localStorage.setItem('chat-app',JSON.stringify(user))
            navigate("/setavtar")
         }

       //  console.log(responce.statusText)

           if(success){
            console.log("login is done")
           
           }
           else{
            console.log(message)
           }

        }
        catch(error){
           console.log("login error")
          
        }
        setlogindata({
            username:'',
            password:''
        })
    }

  return (
    <div>
        <FormContainer>
        <h1 className='h1' >logn</h1>
        <form onSubmit={handelloginsubmit} >
            <input type='text' name='username' placeholder='USERNAME' required value={logindata.username} onChange={handeleloginchange} />

            <input type='password' name='password' placeholder='PASSWORD' required value={logindata.password} onChange={handeleloginchange} />

            <button type='submit'  >login</button>
            <span>not register ? <Link to='/register'>register here</Link></span>
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

export default Login
