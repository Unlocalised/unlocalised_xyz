const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { timeStamp } = require('console');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid")
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(value.length <=6){
        throw new Error('Password is not strong enough');
      }
    },
    trim: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

}, {timestamps: true});

userSchema.methods.toJSON = function (){
  const user = this;

  // Get back raw object with user data attached - no mongoose stuff
  const userObject = user.toObject();

  // Expose only non-sensitive data
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}

userSchema.methods.generateAuthToken = async function (){
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '30m'});

  user.tokens = user.tokens.concat({token}); // Shorthand {token: token}
  await user.save(); // As we are updating the user object

  return token;
}

userSchema.statics.findByCredentials = async (email, password) =>{
      const user = await User.findOne({ email });

      if(!user){
          throw new Error('Unable to log in');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
          throw new Error('Unable to log in');
      }

      return user;
}

// Pre for before the defined event (save in this case) is run and post for after
// Can't have arrow functions as the this keyword is used
userSchema.pre('save', async function(next){
  // Gives us access to the object before the save function runs, in this case a user
  const user = this;

  // If password has been hashed already, dont otherwise hash
  if(user.isModified('password')){ // True if just created or password is being updated
      // Hash the password or do something before writing to MongoDB
      user.password = await bcrypt.hash(user.password, 16);
  }

  // Call next to say we are done
  next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
