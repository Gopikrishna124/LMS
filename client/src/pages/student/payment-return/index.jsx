import { CapturePaymentServcie } from '@/Api/studentPayment'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function PaymentReturn() {
    const location=useLocation()
    const params=new URLSearchParams(location.search)
    const paymentId=params.get('paymentId')
    const payerId=params.get('PayerID')
    console.log('paymentId',paymentId)
    console.log('payerId',payerId)
 
    //..........................................
    useEffect(()=>{
    if(paymentId && payerId){
    
     const capturePayment=async()=>{
        const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'))
        const response=await CapturePaymentServcie(payerId,paymentId,orderId)
        console.log('response',response)
        if(response?.data.success){
            sessionStorage.removeItem('currentOrderId')
            window.location.href='/studentPayed-courses'
        }
      
     }
     capturePayment()
    }
    },[paymentId,payerId])
  return (
    <Card>
        <CardHeader>
          
             <CardTitle>Processing Payment... please wait</CardTitle>
          
            
        </CardHeader>
    </Card>
  )
}

export default PaymentReturn