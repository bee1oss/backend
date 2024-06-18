import TimeModel from "../../models/RaspModels/Times.js";


export const getAll = async (req, res) => {
    try {
        const times = await TimeModel.find().populate('user').exec();
        res.json(times);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'время операция отображения не удалась',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const timeId = req.params.id;

        TimeModel.findOneAndDelete({
            _id: timeId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'время удаление не удалось',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'время не найдено',
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
        const timeId = req.params.id;

        TimeModel.findOneAndUpdate(
            {
                _id: timeId,
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
                        message: 'время не называется',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'время не найдено',
                    });
                }

                res.json(doc);
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить время',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new TimeModel({
            time: req.body.time,
            user: req.userId,
        });
        const time = await doc.save();

        res.json(time);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: ' не удалось создать время',
        });
    }
};

export const update = async (req, res) => {
    try {
        const timeId = req.params.id;

        await TimeModel.updateOne({
            _id: timeId,
        }, {
            time: req.body.time,
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить расписания',
        });
    }
};