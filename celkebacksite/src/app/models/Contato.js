import mongoose from 'mongoose';

const Contato = new mongoose.Schema({
    tituloHorarioCont: {
        type: String
    },
    horarioCont: {
        type: String
    },
    tituloEnd: {
        type: String
    },
    logradouroEnd: {
        type: String
    },
    bairroEnd: {
        type: String
    } ,
    telCont: {
        type: String
    },      
    whatsappCont: {
        type: String
    }
},
{
    timestamps: true,
});


export default mongoose.model('contato', Contato);