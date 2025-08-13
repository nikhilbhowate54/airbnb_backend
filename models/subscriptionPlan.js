const mongoose =require('mongoose')

const subscriptionPlanSchema = new mongoose.Schema({
    name:{type:String,require:true,unique:  true},
    // i want create a dynamic free ,standard , premium
    durationType:{type:String,enum:["monthly","yearly"],require:true},
    price:{type:Number,default:0},
    maxProperties:{type:Number,default:1},
    // limit listing per host 
    features:[String]
    // not important 

},{timestamps:true})

module.exports  =mongoose.model("SubscriptionPlan",subscriptionPlanSchema)