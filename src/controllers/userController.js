import userService from "../services/userService.js";





const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);    

    res.status(201).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  } 
};
  
const getUsers = async (req, res) => {
   try{
    const users = await userService.getUsers();

    res.status(200).json(users);
    } catch (error){
        res.status(500).send(error.message);
    }

};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id); 
    if (!user) {
      return res.status(404).send("User not found");
    }   
    res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);   
        res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
    try {
        const data = await userService.updateUser(id, req.body);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await userService.deleteUser(id);

        res.status(200).send("User deleted successfully");
    } catch (error) {
        res.status(500).send("User not deleted");
    }
};








export default {
 
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
 
};  

