var mongoose=require("mongoose"),ingredientSchema=mongoose.Schema({_recipe:{type:String,ref:"Recipe"},name:String,amount:String,bought:{type:Boolean,"default":!1}}),Ingredient=mongoose.model("Ingredient",ingredientSchema);module.exports=Ingredient;