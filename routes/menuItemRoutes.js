const express = require('express');
const router = express.Router();

const MenuItem =require('./../models/MenuItem')

//post route to add a menu
router.post('/',async(req,res)=>{
  try {
    const menudata=req.body;
    const newMenu=new MenuItem(menudata);
    const ack=await newMenu.save();
    console.log("Data Saved")
    res.status(200).json(ack)
  } catch (error) {
    console.log(error)
    res.status.json({error:'Internal server error'});
  }
})
//Get method to get the menu
router.get('/',async(req,res)=>{
  try {
    const menudata=await MenuItem.find();
    console.log("Data fatched");
    res.status(200).json(menudata)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal server error"})
  }
})

router.get('/:tasteType',async(req,res)=>{
  try {
    const tasteType=req.params.tasteType;
    if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy'){
      const responce = await MenuItem.find({taste:tasteType});
      console.log("Responce Fatched");
      res.status(200).json(responce);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Internal server error"})
  }
})
//comment added for testing
module.exports=router;