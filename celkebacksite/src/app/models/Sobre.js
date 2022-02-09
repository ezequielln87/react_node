import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Sobre = new mongoose.Schema({
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    originalName: {
        type: String
    },
    fileName: {
        type: String
    }
},
{
    timestamps: true,
});

Sobre.plugin(mongoosePaginate);


export default mongoose.model('sobre', Sobre);