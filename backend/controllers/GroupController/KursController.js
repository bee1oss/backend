import KursModel from "../../models/GroupModels/Kurs.js";

export const create = async (req, res) => {
    try {
        const kursesDoc = new KursModel({
            kurs: req.body.kurs,
            user: req.userId,
        });
        const kurs = await kursesDoc.save();

        res.json(kurs);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create kurs',
        });
    }
};

export const update = async (req, res) => {
    try {
        const kursId = req.params.id;

        await KursModel.updateOne({
            _id: kursId,
        }, {
            kurs: req.body.kurs,
            user: req.userId,
            
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update kurs',
        });
    }
};

export const remove = async (req, res) => {//en son denenecek
    try {
        const kursId = req.params.id;

        KursModel.findOneAndDelete({
            _id: kursId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete kurs',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find kurs for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete kurs',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const kursId = req.params.id;

        KursModel.findOneAndUpdate(
            {
                _id: kursId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find kurs',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find kurs',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get kurs',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const kurses = await KursModel.find().populate('user').exec();
        res.json(kurses);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'kurs display operation failed',
        });
    }
};