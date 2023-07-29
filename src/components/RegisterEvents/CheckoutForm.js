import {useState,useEffect} from 'react'
import { Button } from '@mui/material'
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { toast, ToastContainer } from 'react-toastify';

const CheckoutForm = ({handlePaymentChange}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message,setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [clicked , handleClicked] = useState(false);

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsProcessing(true);
        const {error, paymentIntent} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url: `${window.location.origin}/schedule`
            },
            redirect: "if_required",
        })

        if(paymentIntent && paymentIntent.status === 'succeeded'){
            handlePaymentChange();
            toast.success("Payment successfull",{autoClose:2500});
            toast.info("Please confirm the event registration by submitting the form in the next step, See you on other side !!", {autoClose:3500});
        }
        else{
            toast.error("Payment failed, please recheck your details", {autoClose:3500});
        }

        setIsProcessing(false);
    }

  return (
    <div>
    <ToastContainer />
    <form>
    {!clicked ?(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"20px"}}>
        <Button variant="contained" onClick={(e)=>handleClicked(!clicked)}>
            Pay
        </Button>
        </div>
    ):(
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"20px"}}>   
    <PaymentElement />
    <Button variant="contained" disabled={isProcessing} onClick={handleSubmit} style={{marginTop:"20px"}}>
        {isProcessing? "Processing...": "Pay now"}
    </Button>
    <Button variant="outlined" disabled={isProcessing} style={{marginTop:"10px"}} onClick={(e)=>handleClicked(!clicked)}>
        Cancel
    </Button>
    </div>
    )
    }
    </form>
    </div>
  )
}

export default CheckoutForm
