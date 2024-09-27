
import Performance from "./Components/Performance";
import Map from "./Components/Map";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Map />
        <Performance />
      </main>
    </div>


import React from 'react';
import AquasenseDashboard from './components/Notifications';
 import Layout from "./components/Layout";

export default function Home() {
  return (
       <Layout>
        
       <AquasenseDashboard/> 
     </Layout>  

  );
}