import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const MsgContato = new mongoose.Schema({
    nome: {
        type: String
    },
    email: {
        type: String
    },
    assuntoMsg: {
        type: String
    },
    conteudoMsg: {
        type: String
    }
},
{
    timestamps: true,
});

MsgContato.plugin(mongoosePaginate);

export default mongoose.model('msgContato', MsgContato);