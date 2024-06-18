import RaspModel from "../../models/RaspModels/Rasp.js";


export const getAll = async (req, res) => {
    try {
        const rasps = await RaspModel.find().populate('user').populate('time').populate('day').populate('predmet').populate('teacher').populate({path:'group',select:'group',populate:{path:'kurs',select:'kurs'}}).exec();
        res.json(rasps);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'расписания операция отображения не удалась',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const raspId = req.params.id;

        RaspModel.findOneAndDelete({
            _id: raspId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'расписания удаление не удалось',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'расписания не найдено',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const raspId = req.params.id;

        RaspModel.findOneAndUpdate(
            {
                _id: raspId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'расписания не называется',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'расписания не найдено',
                    });
                }

                res.json(doc);
            },
        ).populate('user').populate('time').populate('day').populate('predmet').populate('teacher').populate({path:'group',select:'group',populate:{path:'kurs',select:'kurs'}});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить расписания',
        });
    }
};

export const create = async (req, res) => {
    try {
        // Gelen veri dizisini döngüye alarak her bir öğe için MongoDB'ye kayıt oluştur
        const createdRecords = [];
        for (const data of req.body) {
            const doc = new RaspModel({
                time: data.time,
                day: data.day,
                predmet: data.predmet,
                group: data.group,
                teacher: data.teacher,
                room: data.room,
                user: req.userId,
            });
            const rasp = await doc.save();
            createdRecords.push(rasp);
        }

        res.json(createdRecords);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать расписание.',
        });
    }
};


export const update = async (req, res) => {
    try {
        const raspId = req.params.id;

        await RaspModel.updateOne({
            _id: raspId,
        }, {
            time: req.body.time,
            day: req.body.day,
            predmet: req.body.predmet,
            group: req.body.group,
            teacher: req.body.teacher,
            room: req.body.room,
            user: req.userId,

        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить расписания',
        });
    }
};