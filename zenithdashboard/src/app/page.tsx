
import  "./dashboard/page";
import React from "react";
import Dashboard from "./dashboard/page";
import AquasenseDashboard from "./components/Notifications";
import Layout from "./Layout";
import SignUpForm from "./sign-up/page";



export default function Home() {
  return (
    <div>
  <Dashboard/>
  <Layout>
        
        <AquasenseDashboard/>
        <Dashboard/>
        <SignUpForm/> 
      </Layout>  
    </div>


 


  
     
  );
}