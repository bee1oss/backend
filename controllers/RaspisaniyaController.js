import RaspModel from "../models/Rasp.js";


export const getAll = async (req, res) => {
    try {
        const rasps = await RaspModel.find().populate('user').exec();
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
                $inc: {viewsCount: 1},
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
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить расписания',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new RaspModel({
            time: req.body.time,
            day: req.body.day,
            predmed: req.body.predmed,
            group: req.body.group,
            teacher: req.body.teacher,
            kurs: req.body.kurs,
            room: req.body.room,
            user: req.userId,
        });
        const rasp = await doc.save();

        res.json(rasp);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: ' не удалось создать расписания',
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
            predmed: req.body.predmed,
            group: req.body.group,
            teacher: req.body.teacher,
            kurs: req.body.kurs,
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