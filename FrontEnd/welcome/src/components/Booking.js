import React from 'react'
import axios from 'axios'
import  {useEffect , useState} from 'react'
import jwt_decode from "jwt-decode"
import Nav from "./Nav";


function Booking() {
    const [allBookinh ,setAllBookinh] = useState([])
    const [loading,setLoading]=useState(true)
    let decodedData ;
    const storedToken = localStorage.getItem("token");
    if (storedToken){
      decodedData = jwt_decode(storedToken, { payload: true });
       console.log(decodedData);
       let expirationDate = decodedData.exp;
        var current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token"); 
        }
     }

     useEffect(() => {
        axios.get(`http://localhost:8080/hostRouter/booking/${decodedData.id}`)
        .then((res) => {
           console.log(res.data)
           setAllBookinh(res.data)
           setLoading(false)
            }
        )

    }, [])
 
   


    const accepted =(id)=>{
            
        axios.patch("http://localhost:8080/hostRouter/acceptedBokking",{id,hostID:decodedData.id})
        .then((res) => {
           console.log(res)
           setAllBookinh(res.data)
            }
        )
    }

    const rejected =(id)=>{
        axios.patch("http://localhost:8080/hostRouter/rejectedBooking",{id,hostID:decodedData.id})
        .then((res) => {
           console.log(res)
           setAllBookinh(res.data)
            }
        ) 
    }
        // loding
        if(loading){
            return(
                <p>loading...</p>
            )
        }
    return (
        <div className="booking">
       
<div className="bookingTest">
          <Nav />
<div className='boking-center'>
<h1 className='h1'>طلبات الإقامة</h1>

        {allBookinh.map((booking)=>{
            return(
                <div className="btest" >
            <p>{booking.guest.name} : اسم الضيف</p>    
               <p>{booking.bookingStatues} : حالة الطلب</p> 
                  
                   <div className="btest"> 
                    <button className='booking-btn' onClick={(e) =>{accepted(booking._id)}}>Accept</button>
                <button className='booking-btn' onClick={(e) =>{rejected(booking._id)}}>Rejected</button></div>
              
                </div>
           
            )
        })}
        </div>  
        </div>
        </div>
  
    )
}

export default Booking
