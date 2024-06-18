import PredmetModel from "../../models/RaspModels/Predmet.js";

export const create = async (req, res) => {
    try {
        const predmetsDoc = new PredmetModel({
            predmet: req.body.predmet,
            user:  req.userId
        });
        const predmet = await predmetsDoc.save();

        res.json(predmet);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create predmet',
        });
    }
};

export const update = async (req, res) => {
    try {
        const predmetId = req.params.id;

        await PredmetModel.updateOne({
            _id: predmetId,
        }, {
            predmet: req.body.predmet,
            user: req.userId,
            
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update predmet',
        });
    }
};

export const remove = async (req, res) => {//en son denenecek
    try {
        const predmetId = req.params.id;

        PredmetModel.findOneAndDelete({
            _id: predmetId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete predmet',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find predmet for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete predmet',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const predmetId = req.params.id;

        PredmetModel.findOneAndUpdate(
            {
                _id: predmetId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find predmet',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find predmet',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get predmet',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const predmets = await PredmetModel.find().populate('user').exec();
        res.json(predmets);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'predmet display operation failed',
        });
    }
};