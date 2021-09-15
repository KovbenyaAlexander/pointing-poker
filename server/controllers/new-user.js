let allUsers = []
let user = {}
function  newUser(req, res){

    res.status(200).json({...user})
    console.log({...user})
  }

 function createUser(req, res){
    
  

    const userData = {
      id: Date.now().toString(),
      ...req.body
    }
    if(!req.body) {
      res.status(400).json({message: "Empty data user.."})
    }
    allUsers.push(user)
    user = {...userData}
     res.status(201).json(user)
    // console.log(user)
  }


module.exports ={
  newUser,
  createUser
}
