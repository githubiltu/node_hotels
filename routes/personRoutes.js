const express = require('express');
const router = express.Router();
const Person=require('../models/Person');
//post route to add a person

router.post('/',async (req,res)=>{
  try {
    const data =req.body; //Assuming the request body contains the person data
    //create a new person document using the mongoose model
      const newPerson=new Person(data);
    //Save the new person to the database 
    const response= await newPerson.save();
    console.log("Data saved")
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal server Error'});
  }
})
//Get method to get the person
router.get('/',async (req,res)=>{
  try {
    const data=await Person.find();
    console.log("Data fatched")
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal server Error'});
  }
})

router.get('/:workType',async(req,res)=>{
  try {
    const workType=req.params.workType;//extaract the work type from the URL parameter
    if(workType=='chef' || workType=='manager' || workType=='waiter'){
      const response=await Person.find({work:workType});
      console.log("Responce fatched")
      res.status(200).json(response)
    }

  } catch (error) {
    console.log(error)
    res.status(404).json({error:"Internal server error"})
  }
})
//Update data
router.put('/:id',async(req,res)=>{
  try {
    const personId=req.params.id; //Extract the id from the URL parameter
    const updatedPersonData=req.body; //Updated data for the validation
    const responce= await Person.findByIdAndUpdate(personId,updatedPersonData,{
      new:true, //Return the updated document
      runValidators:true //Run mongoose validation
    })
    if(!personId){
      return res.status(404).json("Person id not found")
    }
    console.log("Data Updated");
    res.status(200).json(responce)
  } catch (error) {
    console.log(error)
    res.status(404).json({error:"Internal server error"})
  }
})
//Delete record
router.delete('/:id',async(req,res)=>{
  try {
    const personId=req.params.id;
    const responce= await Person.findByIdAndDelete(personId);
    if(!responce){
      return res.status(404).json("Person id not found")
    }
    console.log("Data Deleted")
    res.status(200).json({message:"Data Deleted successfully"})
  } catch (error) {
    console.log(error)
    res.status(404).json({error:"Internal server error"})
  }
})

module.exports=router;