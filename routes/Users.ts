import  express  from "express";
import { User } from "../db/entities/User.js";
import { myDataSource } from "../db/dataSource.js";
import { Profile } from "../db/entities/Profile.js";
import { BS } from "../types/book.js";


const userRoute = express.Router();
// Retrieve all
userRoute.get("/all", (req, res) => {
    const users = myDataSource.manager.find(User);
    return users ? res.send(users) : res.status(404).send("No users found");
  });
  
  // Retrieve a specific user
  userRoute.get("/:id", (req, res) => {
    const ID = Number(req.params.id);
    const user = User.findOneBy({
        id: ID,
    });
    return user? res.send(user) : res.status(404).send("No book found");
  });
  
  // Add a user
  userRoute.post("/", (req , res) => {
    try {
      let newUser = new User();
      newUser = {...req.body};
      let newProfile = new Profile();
      newProfile.profileName = req.body.profileName;
      newProfile.email = req.body.profileName;
      newProfile.bio = req.body.bio
      newUser.profile = newProfile;
      User.save(newUser);
      Profile.save(newProfile);
      res.send("New user added with id " + newUser.id);
      res.send("New profile added with id " + newProfile.id);
    } catch (error) {
      console.log("User creation failed");
    }
   
   
  });
  
  //Update a user
  userRoute.put("/:id", async(req, res) => {
    const ID = Number(req.params.id);
    await myDataSource
    .createQueryBuilder()
    .update(User)
    .set({ 
    name: req.body.name ,
    age: Number(req.body.age),
    phoneNumber: req.body.phoneNumber
     })
    .where("id = :id", { id: ID })
    .execute().then(()=>{
        res.send("User Update");
    }).catch((error)=>{
        res.status(500).send("Update failed");
    })
  });
  
  //Delete a user:
  userRoute.delete("/:id", async(req, res) => {
    const ID = Number(req.params.id);
    const user = myDataSource.manager.findOneBy(User, {id: ID});
    await myDataSource.manager.remove(user).then(()=>res.send("delete successfully")).catch(()=>res.status(404).send("No user found"));
    
  });
  
  // Query user by name
  userRoute.get("/:name", (req, res) => {
    const name = req.query.name?.toString();
    const user = myDataSource.manager.findOneBy(User, {name});
    return user ? res.send(user) : res.status(404).send("No user found");

  });
  
  // Query user by age
  userRoute.get("/:age", (req, res) => {
    const age = Number(req.query.age?.toString());
    const user = myDataSource.manager.findOneBy(User, {age});
    return user ? res.send(user) : res.status(404).send("No user found");

  });

  export default userRoute;