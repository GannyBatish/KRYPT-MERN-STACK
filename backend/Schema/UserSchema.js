const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      pic: {
        type: String,
        required:true,
        default:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png",
      },
    },
    {
      timestamps: true,
    }
)

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
const User=mongoose.model('user',UserSchema);

module.exports=User;