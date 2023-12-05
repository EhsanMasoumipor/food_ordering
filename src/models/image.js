import { Schema, model, models } from 'mongoose';

const imageSchema = new Schema({
    image: {
        type: String,
        required: true
    }
});
export const Image = models?.images || model("image", imageSchema);