
import React, { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import DatePicker from "react-datepicker";
import { DateTimePicker } from '@mui/lab';
import "react-datepicker/dist/react-datepicker.css";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import '../host.css'
import Sdo from './Sdo'
import {Image} from 'cloudinary-react';
import swal from 'sweetalert2'

 




function HostProf() {
  const [users, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState();
  const [homeImage, setHomeImage] = useState();
  const [informations, setInformations] = useState();
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [userImage, setUserImage] = useState();
  const [saveId, setSaveId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [enableProfile, setEnableProfile] = useState(false);
  const [enablePost, setEnablePost] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState();
  const [typeOfUser, setTypeOfUser] = useState();
  const [city , setCity] = useState();
  const [imageSelect , setImageSelect] = useState('');
  const [imageSelectProfile , setImageSelectProfile] = useState('');




  let { id } = useParams();
  let [homes, setHomes] = useState([]);
  let params = useParams();
  // console.log(id);
  // console.log(params.id);

  const navigate = useNavigate();
  let decodedData;
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    decodedData = jwt_decode(storedToken, { payload: true });
    let expirationDate = decodedData.exp;
    var current_time = Date.now() / 1000;
    if (expirationDate < current_time) {
      localStorage.removeItem("token");
    }
  }



  useEffect(() => {
    setTypeOfUser(decodedData.typeOfUser);
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8080/hostRouter/" + params.id).then((res) => {
      // console.log(res.data[0]);
      setUser(res.data[0]);
      setHomes(res.data[0].homes);
      setLoading(false);
    });
  }, [refresh]);

  // loding
  if (loading) {
    return <p>loading...</p>;
  }

  //   ADD A HOME INFORMATION
  const Addhome = (e) => {
    e.preventDefault();

    const obj = {
      //حطيناها في اوبجكت عشانها اكثر من قيمة وقيمتها الاصليه اوبجكت وعشان نقدر نمر على كل المؤلفين اللي قبل ويضيف عليهم مو فوقهم
      image: homeImage,
      phoneNumber: phoneNumber,
      informations: informations,
    };
    axios
      .post(`http://localhost:8080/hostRouter/addHome/${id}`, obj)
      .then((res) => {
        // console.log(res.data.homes);
        setHomes(res.data.homes);
      })
      .catch((error) => {
        // console.log(error.response);
      });
  };
  //delete Home Frome Host Prof
  const deleteHome = (id) => {
    axios
      .delete("http://localhost:8080/hostRouter/deleteHome/", {
        data: { hostId: params.id, homeId: id },
      })
      .then((res) => {
        console.log(res);
        //  setHomes(res.data.homes);
        setRefresh(!refresh);
      })
      .catch((error) => {
        // console.log(error.res);
      });
  };

  //Update
  const ubdate = (e, home) => {
    e.preventDefault();
    setSaveId(home._id);
    setInformations(home.informations);
    setHomeImage(home.homeImage);
    setPhoneNumber(home.phoneNumber);
    setEnableEdit(true);
    setEnablePost(false);
  };

  //uploadImage

  const uploadImage = ()=>{
    const formData = new FormData()
    formData.append("file" , imageSelect)
    formData.append("upload_preset" , "xm0p2wbe")

    axios.post("https://api.cloudinary.com/v1_1/dcedysmz7/image/upload", formData)
    .then((response)=>{
      setRefresh(!refresh);
      console.log(response.data.secure_url)
      setHomeImage(response.data.secure_url)
    })
    }

  const saveData = (e) => {
    e.preventDefault();
    // console.log("savvvv");
    const obj = {
      informations: informations,
      phoneNumber: phoneNumber,
      homeImage: homeImage,
      id: saveId,
    };
    axios
      .put("http://localhost:8080/hostRouter/updateHomes/", obj)
      .then((response) => {
        setHomes(response.data.data);
        setRefresh(!refresh);
        // console.log(response.data);
        setEnableEdit(false);
        setEnablePost(true);
      });
  };

  //updateProfile

  const changeProfile = (e) => {
    e.preventDefault();

    setName(users.name);
    setUserName(users.userName);
    setUserEmail(users.email);
    setUserImage(users.hostImage);
    setCity(users.city);
    setEnableProfile(true);
  };

  const updateProfile = (e) => {
    e.preventDefault();
    const obj = {
      name: name,
      userName: userName,
      email: userEmail,
      hostImage: homeImage,
      city: city,
    };
    axios
      .patch(`http://localhost:8080/hostRouter/updateProdile/${id}`, obj)
      .then((response) => {
        setUser(response.data);
        setHomes(response.data.homes);
        setRefresh(!refresh);
        // console.log(response.data);
        setEnableProfile(false);
      });
  };
  //for booking
  const booking = () => {
    // console.log(id + "  " + decodedData.id + "   " + selectedDate);
    console.log(selectedDate)
    axios
      .post("http://localhost:8080/guestRouter/booking", {
        hostId: id,
        guestId: decodedData.id,
        date: selectedDate.setUTCHours(selectedDate.getUTCHours()+3),
        
      })
      .then((response) => {
        console.log(response)
        if(response.data=="والله شوووف انا مش مش عايز انا ماعنديش"){ 
      
          swal.fire({
            icon: 'error',
            text: "ماتقدر تحجز عندي بنفس الوقت",
            confirmButtonText: 'حسنا'
         })
      
        }else{
          setStartDate([response.data]);
        }
      
       });
  };

 
const setTime = (date) =>{
  
 
  console.log( date.setUTCHours(date.getUTCHours()))
  setSelectedDate( date)
}
  return (
    <div>
       <Nav />
      {(function (){
        if (decodedData.id === id) {
          return (
            <> 
                  {typeOfUser !== 'guestUser' ? (
<>
        <a className="button" href="#popup2">
                         إضافة منزل
                        </a>
                        <a class="button" href="#popup1" onClick={(e) => {
                      window.location.href = "#popup1";
                      changeProfile(e);
                    }}>
                          تحديث معلوماتك الشخصية
                        </a>

            <button className="button" onClick={() => {navigate(`/Booking/${decodedData.id}`)}}><>طلبات الحجز</> </button>
          
            </>
       ): <></>}</>
          )
        }
      })()}


    <div style={{display:'flex'}} >


       <Sdo/>

          <div className=" containerHome container">
          <br></br>
          <br></br>
          <br></br>
            <h1 className="hostProfText">البيت بيتك والعين اوسع لك من المكان </h1>

          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>





            {/* form for more information */}


            {(function () {
              if (decodedData != undefined) {
                if (decodedData.id === id) {
                  return (
                    <>
                      <div class="box">

                      </div>
                      <div id="popup2" class="overlay">
                        <div class="popupHost">
                          <a class="close" href="#">
                            &times;
                          </a>
                          <div class="content">
                            <form onSubmit={(e) => Addhome(e)} className="pop-form">
                              {/* <input
                                placeholder=" Home Image"
                                value={homeImage}
                                onChange={(e) => {
                                  setHomeImage(e.target.value);
                                }}
                              /> */}
                                  <input type='file' onChange={(e) => {setImageSelect(e.target.files[0])}}></input>
                                  <button onClick={uploadImage}>حمل الصوره</button>
                                  <Image cloudName="dcedysmz7" />

                              <br />
                              <input placeholder="phoneNumber" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }}/>
                              <br />
                              <textarea className="textarea" placeholder="description" value={informations}  onChange={(e) => {setInformations(e.target.value);}}/>
                              <br />

                              {enablePost ? (<button className="btn-home">نشر</button>) : (<></>   )}

                              {enableEdit ? (
                                <a href="#">
                                  <button
                                    onClick={(e) => saveData(e)}
                                    className="btn-home">حفظ</button>
                                </a>
                              ) : (
                                <></>
                              )}
                            </form>
                          </div>
                        </div>
                      </div>

                      {/* update profile */}
                      <div class="box">

                      </div>

                      <div id="popup1" class="overlay">
                        <div class="popup">
                          <a class="close" href="#">
                            &times;
                          </a>
                          <div class="content">
                            <form>
                              <input
                                placeholder=" UserName"
                                value={name}
                                onChange={(e) => {setName(e.target.value); }}/>
                              <br />
                              <input placeholder="Name" value={userName} onChange={(e) => {setUserName(e.target.value);}}/>
                              <br />
                              <input
                                placeholder="Email"
                                value={userEmail}
                                onChange={(e) => {
                                  setUserEmail(e.target.value);
                                }}
                              />
                              <br />
                              <input
                                type="string"
                                placeholder="city"
                                value={city}
                                onChange={(e) => {
                                  setCity(e.target.value);
                                }}
                              />
                              <br />
                              {/* <input
                                placeholder="UserImage"
                                value={userImage}
                                onChange={(e) => {
                                  setUserImage(e.target.value);
                                }}
                              /> */}
                                <input type='file' onChange={(e) => {
                                  e.preventDefault();
                                setImageSelect(e.target.files[0])}}></input>
                                  <button onClick={uploadImage}>حمل الصوره</button>
                                  <Image cloudName="dcedysmz7" />

                              
                              <br />
                              <button
                                onClick={(e) => updateProfile(e)}
                                className="btn-home">حدث الملف الشخصي
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
                {/* console.log("decodedData");
                console.log(decodedData.id); */}
              }


            })()}





            {startDate?.map((data, index) => (
              <div key={index}  >
                <h3>{data.date}</h3>
                <h3>{data.guest.name}: الضيف</h3>
                <h3>{data.host.name}: المستضيف</h3>
                <img src={data.host.hostImage}></img>
              </div>
            ))}

          </div>


    </div>
    <h1 className="hostIn">{users.name} : صاحب المنزل </h1>

    {homes?.map((home, index) => {
              return (
                <div key={index}>
                <div className="homeInfo">
               <div style={{width:"30vw"}}>
               <img className="homeInfoImg" src={home.image} alt="home image" />
               <div className="btn-group">
               {(function () {
                if(decodedData!==undefined){
                  if( decodedData.typeOfUser==="guestUser"){
                    return(<></>)
                  }if(decodedData.typeOfUser==="hostUser"){
                    return(<>
                      <button className="btn-homeUpdate" onClick={() => { deleteHome(home._id); }} >الحذف</button>
                    <a  onClick={(e) => { window.location.href = "#popup2";ubdate(e, home);}}><button className="btn-homeUpdate">تعديل</button>  </a>
                    </>)
                  }
                }
               })()}

                   </div>
               </div>
               <div className="homeInfoDescription">
                  <h3 className="hostIn">{home.phoneNumber} : للتواصل</h3>
                  <h3 className="hostIn">{home.informations} : وصف المنزل</h3>
{(function(){
  if (decodedData.id !== id){
    
    return (<> 
      <div className="restor">
                <button onClick={() => {booking();}} className="btn-restor"> تأكيد الحجز </button>
             <DatePicker
              placeholder="اختر موعد القدوم"
              selected={selectedDate}
              // onChange={(date) => setSelectedDate(date.setHours(date.getHours()))}
              onChange={(date) => {
                console.log(date)
                setTime(date)
              }}

              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              isClearable
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
             ></DatePicker>


            </div>
    </>)
  }else{ 
    <></>
            }
})()}
             
                  </div>
                 </div>
                  {(function () {
              {/* console.log("function"); */}
              if (decodedData != undefined) {
                {/* console.log("decoder"); */}
                if (decodedData.id === id) {
                  {/* console.log("helllo"); */}
                  return (
                    <>
                   <br></br>


                    </>

)}}})()}

                  {(function () {
                    {/* console.log("function"); */}
                    if (decodedData != undefined) {
                      {/* console.log("decoder"); */}
                      if (decodedData.id === id) {
                        {/* console.log("helllo"); */}
                        return (
                          <>

                          </>
                        );
                      }
                    }
                  })()}
                </div>
              );
            })}

    </div>
  );
}

export default HostProf;
