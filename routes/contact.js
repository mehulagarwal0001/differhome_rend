
const router= require('express').Router();
const Contact =require('../modals/ContactSchema');
// getting contact details


router.get('/',async (req,res)=>{
  try {
       let contact = await Contact.findOne();

       if(!contact) return res.status(400).json({error:"No contact available at database"});

      return res.json(contact);


  } catch (error) {
    console.log(error);
     return  res.status(400).json({error:"Something went Wrong"});
  }

})



module.exports = router;
