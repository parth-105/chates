import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Buffer } from "buffer";
import styled from 'styled-components';
import '../index.css'


function Setavtar() {

    const [avtars, setavtars] = useState([])
    const [selectedavtar, setselectedavtar] = useState()
    const [loding, setloding] = useState(true)
    const navigate = useNavigate()
    const api = `https://api.multiavatar.com/4645646`;


    useEffect(() => {

        if (!localStorage.getItem("chat-app")) {
            navigate("/login");
        }

        async function fetchdata() {


            try {

                const data = [];

                for (let i = 0; i <= 4; i++) {

                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)

                    //   const buffer = new Buffer(image.data);
                    const buffer = new Buffer(image.data)
                    data.push(buffer.toString("base64"));

                    await new Promise(resolve => setTimeout(resolve, 1000));

                }
              //  console.log(data)
                setavtars(data);
              //  console.log(avtars)
                setloding(false)

            } catch (err) {
                console.log(err)
            }

        }
        fetchdata();

    }, [])

    const setProfilePicture = async () => {
        if (selectedavtar === undefined)
         {
            console.log("plese select avtar");
        }
         else
        {
            console.log("enter")
            const user = await JSON.parse(localStorage.getItem("chat-app"))
            console.log(user._id)
            // const { data } = await axios.post(`http://localhost:8000/setavtar/${user._id}`, { image: avtars[selectedavtar] })
            
            const { data } = await axios.post(`http://192.168.243.88:8000/setavtar/${user._id}`, { image: avtars[selectedavtar] })  
            console.log(data);
            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app", JSON.stringify(user)
                );
                navigate("/");
            }

        }
    }



    return (
        <div>



            {
                loding ? (
                    <div>
                         <Container>
                        <h1>load</h1>
                        </Container>
                    </div>
                ) : (
                    <div>
                        <Container>
                        <div className="title-container">
                            <h1>Pick an avatar for your profile picture</h1>
                        </div>

                        <div className='avatars'>
                            {
                                avtars.map((avatar, ind) => {
                                    return (
                                        <div key={ind}
                                            className={`avatar ${selectedavtar === ind ? "selected" : ""}`}
                                        >
                                            <img 
                                                src={`data:image/svg+xml;base64,${avatar}`}
                                                alt="avatar"
                                                key={avatar}
                                                onClick={() => setselectedavtar(ind)}
                                                
                                            />
                                                
                                        </div>
                                        
                                    )
                                })
                            }
                          
                        </div>
                        <button className="submit-btn" onClick={setProfilePicture}>
                            Set as Profile Picture
                        </button>
                        </Container>

                    </div>
                )}

        </div>
    )
}

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:4rem;
    background-color:#131324;
    width:100vw;
    height:100vh;

    .title-container{
        h1{
            color:white;
        }
    }
    .loader {
    max-inline-size: 100%;
  }

    .avatars{
        display:flex;
        gap:2rem;

        .avatar{
            border:0.4rem dotted transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5s ease-in-out;
            img{
                height:6rem;
                transition:0.5s ease-in-out;
            }
        }
        .selected{
            border:0.4rem groove #4e0eff;
        }
    }


    .submit-btn{
        background-color: #4e0eff;
        color:white;
        padding:1rem 2rem;
        border:none;
        font-weight:bolder;
        font-stretch: expanded;
        cursor:pointer;
        border-radius:0.5rem;
        font-size:1.1rem;
        text-transform:uppercase;
        transition: 0.5s transform ease-in-out;
        &:hover{
            ${'' /* background-color:#541bf0d2; */}
            transform:scale(1.05);
        }

    }
`;

export default Setavtar


// import React, { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


// import axios from 'axios';
// import {Buffer} from 'buffer';
// import '../index.css'


// const SetAvatar = () => {

//     const api = `https://api.multiavatar.com/4645646`;
//     const navigate = useNavigate();

//     const [avatars,setAvatars] = useState([]);
//     const [selectedAvatar,setSelectedAvatar] = useState(undefined);
//     const [isLoading,setIsLoading] = useState(true);

   

//     const setProfilePicture =  async () =>{

//         if(selectedAvatar===undefined){
//            console.log("errrr")
//         }else{
//             const user = await JSON.parse(localStorage.getItem("chat-app"));
//             const {data} = await axios.post(`http://localhost:8000/setavtar/${user._id}`,{
//                 image:avatars[selectedAvatar]
//             })

//             // console.log(data);

//             if(data.isset){
//                 user.isavtarsetimage=true;
//                 user.avtarimage= data.image;
//                 localStorage.setItem("chat-app",JSON.stringify(user));
//                 navigate("/");
//             }else{
//                 console.log("fff")
//             }
//         }
//     }

    

//     useEffect(() => {
//         if(!localStorage.getItem("chat-app")){
//             navigate("/login");
//         }

//         async function fetchData(){
//             try{
//                     const data = [];
//                     for (let i = 0; i < 5; i++) {
//                     const image = await axios.get(
//                         `${api}/${Math.round(Math.random() * 1000)}`
//                     );
//                     const buffer = new Buffer(image.data);
//                     data.push(buffer.toString("base64"));
        
//                     await new Promise(resolve => setTimeout(resolve, 1000));
//                     }
//                     setAvatars(data);
//                     setIsLoading(false);
//             }catch(error){
//                 console.log("Error in fetching Avatars",error);
//             }
//         }

//         fetchData();        
//       },[]);

//     return (
//         <>
//         {
//             isLoading ? (
//                 <div>
//                   <h1>load</h1>
//                 </div>
//             ):(
//                 <div>
//                 <div className="title-container">
//                     <h1>Pick an avatar for your profile picture</h1>
//                 </div>

//                 <div className='avatars'>
//                  {
//                     avatars.map((avatar,ind) =>{
//                         return(
//                             <div key={ind} 
//                                 className={`avatar ${selectedAvatar===ind ? "selected" :"" }`}
//                             >
//                                 <img className='aimg'
//                                     src={`data:image/svg+xml;base64,${avatar}`}
//                                     alt="avatar"
//                                     key={avatar}
//                                     onClick={()=> setSelectedAvatar(ind)}
//                                 />
                                
//                             </div>
//                         )
//                     })
//                  }                
//                 </div>
//                 <button className="submit-btn" onClick={setProfilePicture}>
//                         Set as Profile Picture
//                 </button>

//             </div>
//         )}
        
//         </>
//     )
// }



// export default SetAvatar;