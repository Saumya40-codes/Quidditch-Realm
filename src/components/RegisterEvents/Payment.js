import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import Axios from 'axios'
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { Card, CardContent } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

const Payment = ({formChange, handleFormChange}) => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(()=>{
        const res = Axios.get("http://localhost:5000/config")
        .then(async (res)=>{
            const {publishableKey} = await res.data;
            setStripePromise(loadStripe(publishableKey))
        })
    },[])

    useEffect(()=>{
        try{
        const res = Axios.post("http://localhost:5000/create-payment-intent",{
            total_price: Number(formChange.total_price)*100,
        })
        .then(async (res)=>{
            const {clientSecret} = await res.data;
            setClientSecret(clientSecret);
        })
    }
    catch(err){
        console.log(err);
    }
    },[])


    const handlePaymentChange = (e) =>{
        handleFormChange(e,'payment',true);
    }

  return (
    <div>
    <div style={{ display:"flex", justifyContent:"center" ,alignItems:"center", marginTop:"15px"}}>
    <Card style={{ width :"50%" }}>
    <CardContent>
    <div style={{display:"flex", justifyContent:"center" ,alignItems:"center"}}>
        <h3>Verfiy Entered details </h3>
    </div>
    <div style={{ display:"flex", justifyContent:"center" ,alignItems:"center", marginTop:"5px"}}>
        <h5> Personal Details </h5>
    </div>
        <div className="personal-details" style={{display:"flex", justifyContent:"space-between", margin:"10px"}}>
        <div>
           <p>Name: {formChange.name} </p> 
           <p>Email: {formChange.email} </p>
        </div>
        <div>
            Phone: {formChange.phone? formChange.phone : 
            (
            <div style={{display:"inline-block"}}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000", marginLeft:"5px", marginRight:"-5px"}} /> <span style={{color:"red"}}>Required! Information not given yet!!</span>
            </div>
            )}
        </div>
        </div>
        <hr />
        <div style={{ display:"flex", justifyContent:"center" ,alignItems:"center", marginTop:"5px"}}>
        <h5> Ticket Details </h5>
        </div>
        <div className="ticket-details" style={{display:"flex", justifyContent:"space-between", margin:"10px"}}>
        <div>
            <p>Ticket Type: {formChange.ticket_type? formChange.ticket_type : 
            (
            <div style={{display:"inline-block"}}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000", marginLeft:"5px", marginRight:"-5px"}} /> <span style={{color:"red"}}>Required! Information not given yet!!</span>
            </div>
            )}</p>
            <p>Quantity: {formChange.ticket_quantity? formChange.ticket_quantity : 
            (
            <div style={{display:"inline-block"}}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000", marginLeft:"5px", marginRight:"-5px"}} /> <span style={{color:"red"}}>Required! Information not given yet!!</span>
            </div>
            )}</p>
        </div>
        <div style={{ margin:"10px"}}>
            <p>Total Price: {formChange.total_price? formChange.total_price : 
                (
            <div style={{display:"inline-block"}}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000", marginLeft:"5px", marginRight:"-5px"}} /> <span style={{color:"red"}}>Required! Information not given yet!!</span>
            </div>
            )} </p>
        </div>
        </div>
        <hr />
        <div style={{ display:"flex", justifyContent:"center" ,alignItems:"center", marginTop:"5px"}} >
        <h5> Payment Status </h5>
        </div>
        <div className="payment-details" style={{ margin:"10px"}}>
        <p> Payment status: { formChange.payment? (
            <div style={{display:"inline-block"}}>
            <FontAwesomeIcon icon={faCheck} style={{color: "#00ff33", marginLeft:"5px", marginRight:"-5px"}} /> <span style={{color:"green"}}>Done</span>
            </div>
        ) : (
            <div style={{display:"inline-block"}}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000", marginLeft:"5px", marginRight:"-5px"}} /> <span style={{color:"red"}}>Remaining</span>
            </div>
            )}
        </p>
        </div>
    </CardContent>
    </Card>
    </div>
    {stripePromise && clientSecret && (
    <Elements stripe={stripePromise} options={{clientSecret}} >
    <CheckoutForm handlePaymentChange={handlePaymentChange} />
    </Elements>
    )
    }
    </div>
  )
}

export default Payment
