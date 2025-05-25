import * as React from 'react';
import Navbar from './components/navbar';
import DocCard from './components/doccard';
import DocCards from './components/doccards';
import Assistant from './components/assistant';
import AddCard from './components/addcard';
import UserContext from '../allcontext';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
export default function Blog(props) {
  const { user } = useContext(UserContext);
 const {createdoc, setCreatedoc} = useContext(UserContext);
 const {deleteid, setDeleteid} = useContext(UserContext);
 const { data, setData } = useContext(UserContext);
const handleAddDocCard = (createdoc) => {
    // Assuming docData is the data for the new document card
    setCreatedoc(createdoc+1);
  };


  

  
  return (
   <div>
    <Navbar />
  <DocCards /> 


<AddCard onAddDocCardWithData={handleAddDocCard} />
  <Assistant />


   </div>
  );
}