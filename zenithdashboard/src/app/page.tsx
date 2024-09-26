'use client';
import  "./RealTimeVisualization";
import React from "react";
import AquasenseVisualization from "./RealTimeVisualization";
import Layout from "./Layout";
import Dashboard from "./RealTimeVisualization";
import { Sidebar } from "lucide-react";

export default function Home() {
  return (
    <div>
      <main>
      
          <Layout>
          <Dashboard/>
          <Sidebar/>
          </Layout>
       
      </main>
    </div>
  );
}
