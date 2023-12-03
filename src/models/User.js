import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        validate: pass => {
            if (!pass?.length || pass?.length < 5) {
                new Error("password must be at least 5 characters");
                return false;
            }
        }
    },
}, { timestamps: true });

userSchema.pre("save", function () {
    const hashed_password = bcrypt.hashSync(this.password, 10);
    this.password = hashed_password;
})


export const User = models?.User || model("User", userSchema);