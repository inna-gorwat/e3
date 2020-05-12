import mongoose from 'mongoose';

const fotoSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    shortDescribe:"",
    text: "",
    date: 0,
    count: 0
});

const Foto = mongoose.model("Foto", fotoSchema);

export default Foto;