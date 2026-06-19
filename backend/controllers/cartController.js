import userModel from "../models/userModel.js";


const addToCart = async(req,res)=>{
    try{
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = userData.cartData;

        if(!cartData[req.body.food]){
            cartData[req.body.food]=1;
        }
        else{
            cartData[req.body.food] += 1;
        }
        await userModel.findOneAndUpdate({_id:req.body.userId},{cartData});
        res.json({success:true,message:"Add To Cart"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Failed To Add Cart"})
    }
}

const removeFromCart = async(req,res)=>{
try{
    let userData = await userModel.findById({_id:req.body.userId});
    let cartData = userData.cartData;

    if(cartData[req.body.food]>0){
        cartData[req.body.food] -=1;
    }
    await userModel.findOneAndUpdate({_id:req.body.userId},{cartData});
    res.json({success:true,message:"Remove From Cart"})
}catch(error){
    console.log(error);
    res.json({success:false,message:"Failed To Remove From Cart"})
}
}

const getCart = async(req,res)=>{
    try{
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = userData.cartData;
        res.json({success:true,cartData})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Failed To Get Cart"})
    }
}


export {addToCart,removeFromCart,getCart}
