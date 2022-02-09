import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    recuperarSenha: {
        type: String
    },
    originalName: {
        type: String
    } ,
    fileName: {
        type: String
    }   
},
{
    timestamps: true,
});

User.plugin(mongoosePaginate);

export default mongoose.model('user', User);