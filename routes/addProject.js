const router =require('express').Router();
const fetchUser = require('../middleware/fetchUser');
const Project = require('../modals/ProjectSchema');


let path_of_photos =   (array) => {
          
    let val=[];
    let i=1;
     array.forEach(element => {
        var path_name= '/images/' +Date.now() + `_${i}`+ element.name;
        val.push(path_name);
        i++;
     });
    return val ;
}

let move_to_public = (array1,array2)=>{


 for (let index = 0; index < array1.length; index++) {
      
    array1[index].mv('public/'+array2[index],(err)=>{
        if(err){
            return false;
           // return res.status(500).json({status:"failed"});
        }
    })
    
 }
return true;
}

// To add a new Project 
router.post('/addProject',
fetchUser,
 async (req,res)=>{

  try {
    
 
let project = req.body;
console.log(req.body);
  
if(req.files){
if(  req.files.brochure && Array.isArray(req.files.brochure) == false ) req.files.brochure =[req.files.brochure];
if(  req.files.photos && Array.isArray(req.files.photos) == false ) req.files.photos =[req.files.photos];
if(  req.files.floorPlan &&  Array.isArray(req.files.floorPlan) == false ) req.files.floorPlan =[req.files.floorPlan];
if( req.files.layout && Array.isArray(req.files.layout) == false ) req.files.layout =[req.files.layout];
//    console.log(req.files.photos); 
console.log(req.files.photos);
    if(req.files.photos ){ project.photos= await path_of_photos(req.files.photos);

if( await move_to_public(req.files.photos,project.photos) == false) {
   return  res.status(500).json({status:"failed"});
}}

if(req.files.layout){
project.layout= await path_of_photos(req.files.layout);

if(await move_to_public(req.files.layout,project.layout) ==false ){
    return  res.status(500).json({status:"failed"});
}}

if(req.files.floorPlan){
project.floorPlan= await path_of_photos(req.files.floorPlan);

if( await move_to_public(req.files.floorPlan,project.floorPlan) == false) {
   return  res.status(500).json({status:"failed"});
}
}

if(req.files.brochure){
project.brochure= await path_of_photos(req.files.brochure);

if(await move_to_public(req.files.brochure,project.brochure) ==false ){
    return  res.status(500).json({status:"failed"});
}

}

}
console.log(project);
const saving_project= await new Project(project);
const saved_project= await saving_project.save();

return res.send(saved_project);

//  return res.send("HEllo");

} catch (error) {
    return res.status(500).json({error:error});
}

})

 // Getting all Projects 
router.get('/allProject',async (req,res)=>{
  try {
    let project = await Project.find();

    return res.json(project);

  } catch (error) {
     return res.status(500).json({error:error});
  }
    
})


// Getting Specific Project 

router.get('/project/:id',async (req,res)=>{
    try {
   
             
        let project = await Project.findById(req.params.id);
    
        return res.json(project);
    
      } catch (error) {
         return res.status(500).json({error:error});
      }

})



module.exports = router;