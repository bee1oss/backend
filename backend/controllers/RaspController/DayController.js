import DayModel from "../../models/RaspModels/Day.js";

export const create = async (req, res) => {
    try {
        const daysDoc = new DayModel({
            day: req.body.day,
            user: req.userId,
        });
        const day = await daysDoc.save();

        res.json(day);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create day',
        });
    }
};

export const update = async (req, res) => {
    try {
        const dayId = req.params.id;

        await DayModel.updateOne({
            _id: dayId,
        }, {
            day: req.body.day,
            user: req.userId,
            
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update day',
        });
    }
};

export const remove = async (req, res) => {//en son denenecek
    try {
        const dayId = req.params.id;

        DayModel.findOneAndDelete({
            _id: dayId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete day',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find day for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete day',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const dayId = req.params.id;

        DayModel.findOneAndUpdate(
            {
                _id: dayId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find day',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find day',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get day',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const days = await DayModel.find().populate('user').exec();
        res.json(days);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'day display operation failed',
        });
    }
};