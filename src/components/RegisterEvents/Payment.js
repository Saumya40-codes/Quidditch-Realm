import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import Axios from 'axios'
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"

const Payment = ({formChange}) => {
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
        const res = Axios.post("http://localhost:5000/create-payment-intent",{
            total_price: Number(formChange.total_price)*100,
        })
        .then(async (res)=>{
            const {clientSecret} = await res.data;
            setClientSecret(clientSecret);
        })
    },[])

  return (
    <div>
    {stripePromise && clientSecret && (
    <Elements stripe={stripePromise} options={{clientSecret}} >
    <CheckoutForm />
    </Elements>
    )
    }
    </div>
  )
}

export default Payment
