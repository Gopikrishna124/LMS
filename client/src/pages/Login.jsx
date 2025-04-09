
import axios from "axios";
import { userEndPoint } from "@/Api/axiosInstance";
import loginForm from "@/Api/loginForm";
import registerApi from "@/Api/registerForm";
import CommonForm from "@/common-form/index.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { signUpFormControls, singInFormControls } from "@/config/index.js";


import { SetUserDetails } from "@/redux/authSlice";

import { GraduationCap } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {


  const [activeTab, setActiveTab] = useState("signin");
  console.log("activeTab", activeTab);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleChange = (value) => {
    setActiveTab(value);
  };

  //...............................................
  const moveToNextRef = (e) => {
    if (e.key === "Enter") {
      e.preventDefault("");
    }
  };

  const [signUpformData, SetSignUpFormData] = useState({
    username: "",
    email: "",
    password: "",
 
  });

  const [signInformData, SetSignInFormData] = useState({
    email: "",
    password: "",
  });

  const changeSignUpFormData = (e, keyName) => {
    console.log("event", e);
    SetSignUpFormData((prev) => {
      return {
        ...prev,
        [`${keyName}`]: e.target.value,
      };
    });
  };



  const checkDisable = () => {
    return (
      signUpformData &&
      signUpformData.username !== "" &&
      signUpformData.email !== "" &&
      signUpformData.password !== ""
    );
  };

  //..............................................................
  const checkDisable2 = () => {
    return (
      signUpformData &&
      signInformData.email !== "" &&
      signInformData.password !== ""
    );
  };
  //..............................................

  const changeSignInFormData = (e, keyName) => {
    SetSignInFormData((prev) => {
      return {
        ...prev,
        [`${keyName}`]: e.target.value,
      };
    });
  };

  //..........................................
  const handleRegister=async(e)=>{
    e.preventDefault()
    try {
      const responseData=await registerApi(signUpformData)
      console.log('registerData',responseData)
      if(responseData.data.success){
        dispatch(SetUserDetails(responseData.data.data))
        for(let key in signUpformData){
         SetSignUpFormData((prev)=>{
          return {
            ...prev,
            [key]:''
          }
         })
        }
      }
      else{
        throw responseData.data.message
      }    
    } catch (err) {
      console.log('register Error',err)
    }
  
  }

  //................................
  const handleLogin=async(e)=>{
   e.preventDefault()
   try {
    const responseData=await loginForm(signInformData)
    console.log('responseLoginData',responseData)
    if(responseData.data.success){
      
         dispatch(SetUserDetails(responseData.data.data))
         navigate('/')

    }
   } catch (err){
     console.log('loginErr',err)
   }
  
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex">
        <Link to="/" className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </header>

      <div className="flex justify-center items-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign in to your acccount</CardTitle>
                <CardDescription>
                  Enter your Email and Password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={singInFormControls}
                  formData={signInformData}
                  ButtonText={"Sign In"}
                  setFormData={changeSignInFormData}
                  isbuttonDisabled={!checkDisable2()}
                  handleSubmit={handleLogin}
                ></CommonForm>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create a new accout</CardTitle>
                <CardDescription>
                  Enter your details to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signUpFormControls}
                  isbuttonDisabled={!checkDisable()}
                  formData={signUpformData}
                  ButtonText={"Sign Up"}
                  setFormData={changeSignUpFormData}
                  moveToNextRef={moveToNextRef}
                  handleSubmit={handleRegister}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Login;
