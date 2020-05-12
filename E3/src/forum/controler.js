import Foto from "./model";

const fotoControler = {
    async get(req, res) {
        try {
           
            const list = await Foto.find(makeQueryObject (req.query));            
            res.send(list);
        } catch (error) {
            res.status(500).send(error);
        }


        function makeQueryObject(query){
            let result = {};        
            if (query.count)
                result.$expr = { "$eq": [{ "$count": "$count" }, parseInt( query.count)] } ;
            return result;
        }
    },
    async getById(req, res) {
        try {
            const foto = await Foto.findById(req.params.id);
            if (!foto)
                res.status(404).send("Not found");
            res.send(foto);

        } catch (error) {
            res.status(500).send(error);
        }
    },
    async post (req, res) {
        try {           
            const foto = new Foto(req.body);
            await foto.save();
            res.send(foto);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async delete (req, res) {
        try {
            const foto = await Foto.findByIdAndDelete(req.params.id);
            if (!foto)
                res.status(404).send("Not found");
            res.send(foto);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async patch(req, res) {
        try {
            const foto = await Foto.findByIdAndUpdate(req.params.id, req.body, {new: true}) ;
            if (!foto)
                res.status(404).send("Not found");
            await foto.save();  
            res.send(foto);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default fotoControler;