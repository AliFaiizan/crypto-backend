const mongoose= require('mongoose')

const {ObjectId}=mongoose.Schema;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
},{
    timestamps:true
});


module.exports=mongoose.model('User',userSchema);