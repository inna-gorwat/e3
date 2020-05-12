import Foto from "./model";

export default {
    async run(req, res) {
        try {
            await Foto.deleteMany({});
            const fotos = [
                {
                    title: "Foto1",
                    shortDescribe: "desc of foto1",
                    text: "text1",
                    published: new Date("01-11-1997"),
                    count: 368
                },                {
                    title: "Foto2",
                    shortDescribe: "desc of foto2",
                    text: "text2",
                    published: new Date("01-11-1997"),
                    count: 360
                },
                {
                    title: "Foto3",
                    shortDescribe: "desc of foto3",
                    text: "text3",
                    published: new Date("01-11-1997"),
                    count: 400
                },
                {
                    title: "Foto4",
                    shortDescribe: "desc of foto4",
                    text: "text4",
                    published: new Date("01-11-1997"),
                    count: 420
                },
                {
                    title: "Foto5",
                    shortDescribe: "desc of foto5",
                    text: "text5",
                    published: new Date("01-11-1997"),
                    count: 448
                },
                {
                    title: "Foto6",
                    shortDescribe: "desc of foto6",
                    text: "text6",
                    published: new Date("01-11-1997"),
                    count: 590
                }
            ];

            fotos.forEach(async foto => await new Foto(foto).save());
        } catch (error) {
            console.log(error)
        }
    }
}