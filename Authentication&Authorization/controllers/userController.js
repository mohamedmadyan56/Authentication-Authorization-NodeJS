const User = require("./../Models/userModels");
const APIFeatures = require("./../Utils/apiFeatures");
const catchAsync = require("express-async-handler");
const AppError = require("./../Utils/appError");




const fs = require ('fs');
let users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);
const filterObj = (obj, ...allowedFields)=>{
    const newObj = {};
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el)){
newObj[el] = obj[el];

        }
    })
    return newObj;
}


exports.getAllUsers =catchAsync( async (req, res) => {
        const users = await User.find();
        res.status(200).json({
            status:'success',
            results:users.length,
            data:{
                users
            }
        })
});

   
exports.updateMe =catchAsync (async (req,res,next)=>{
    if(req.body.password || req.body.passwordConfirm|| req.body.role){
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword.'),400)}
 const filterBody = filterObj(req.body,'name','email');
        const updateUser = await User.findByIdAndUpdate(req.user.id,filterBody,{
            new:true,
            runValidators:true
        })





    res.status(200).json({
        status:'success',
        data:{
            user:updateUser
        }
    })

});

exports.deleteMe = catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false})
    res.status(204).json({
        status:'success',
        data:null
    })
})



exports.createUser = (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
};

exports.getUserById = (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

exports.updateUser = (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    Object.assign(user, req.body);
    res.json(user);
};

exports.deleteUser = (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.status(204).send();
};
