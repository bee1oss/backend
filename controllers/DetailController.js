import DetailModel from "../models/Detail.js";

export const create = async (req, res) => {
    try {
        const detailsDoc = new DetailModel({
            detail: req.body.detail,
            user: req.userId,
        });
        const detail = await detailsDoc.save();

        res.json(detail);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create detail',
        });
    }
};

export const update = async (req, res) => {
    try {
        const detailId = req.params.id;

        await DetailModel.updateOne({
            _id: detailId,
        }, {
            detail: req.body.detail,
            user: req.userId,
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update detail',
        });
    }
};

export const remove = async (req, res) => {//en son denenecek
    try {
        const detailId = req.params.id;

        DetailModel.findOneAndDelete({
            _id: detailId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete detail',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find detail for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete detail',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const detailId = req.params.id;

        DetailModel.findOneAndUpdate(
            {
                _id: detailId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find detail',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find detail',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get detail',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const details = await DetailModel.find().populate('user').exec();
        res.json(details);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'detail display operation failed',
        });
    }
};