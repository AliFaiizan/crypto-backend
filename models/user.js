const mongoose= require('mongoose')


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
  tokens:[
    {
      token:String
    }
  ]
},{
    timestamps:true
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.verified;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};


// userSchema.pre("save", async function (next) {
//   const user = this;

//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }

//   next();
// });
const User = mongoose.model("User", userSchema);;
module.exports=User