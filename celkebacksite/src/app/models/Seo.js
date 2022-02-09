import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Seo = new mongoose.Schema({
    seoPg: {
        type: String
    },
    seoTitle: {
        type: String
    },
    seoDesc: {
        type: String
    },
    seoAutor: {
        type: String
    },
},
{
    timestamps: true,
});

Seo.plugin(mongoosePaginate);

export default mongoose.model('seo', Seo);