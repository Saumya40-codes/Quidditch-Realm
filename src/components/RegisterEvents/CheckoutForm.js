import {useState,useEffect} from 'react'
import { Button } from '@mui/material'
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message,setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsProcessing(true);
        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url: `${window.location.origin}/schedule`
            },
        })

        if(error){
            setMessage("Error occured")
        }
        setIsProcessing(false);
    }

  return (
    <div>
    <form onSubmit={handleSubmit}>
    <PaymentElement />
    <Button variant="contained" disabled={isProcessing} onClick={handleSubmit}>
        {isProcessing? "Processing...": "Pay now"}
    </Button>
    </form>
    </div>
  )
}

export default CheckoutForm
