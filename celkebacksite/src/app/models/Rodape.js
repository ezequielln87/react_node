import mongoose from 'mongoose';

const Rodape = new mongoose.Schema({
    tituloPg: {
        type: String
    },
    tituloCont: {
        type: String
    },
    telCont: {
        type: String
    },
    endCont: {
        type: String
    },
    cnpjCont: {
        type: String
    } ,
    tituloRedSoc: {
        type: String
    },       
    instTitulo: {
        type: String
    },
    instLink: {
        type: String
    },    
    facTitulo: {
        type: String
    },
    facLink: {
        type: String
    },
    youtubeTitulo: {
        type: String
    },    
    youtubeLink: {
        type: String
    },
    twiterTitulo: {
        type: String
    },
    twiterLink: {
        type: String
    }
},
{
    timestamps: true,
});


export default mongoose.model('rodape', Rodape);