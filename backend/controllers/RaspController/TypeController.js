import TypeModel from "../../models/RaspModels/Type.js";

export const create = async (req, res) => {
    try {
        const typesDoc = new TypeModel({
            type: req.body.type,
            user: req.userId,
        });
        const type = await typesDoc.save();

        res.json(type);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create type',
        });
    }
};

export const update = async (req, res) => {
    try {
        const typeId = req.params.id;

        await TypeModel.updateOne({
            _id: typeId,
        }, {
            type: req.body.type,
            user: req.userId,
            
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update type',
        });
    }
};

export const remove = async (req, res) => {//en son denenecek
    try {
        const typeId = req.params.id;

        TypeModel.findOneAndDelete({
            _id: typeId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete type',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find type for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete type',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const typeId = req.params.id;

        TypeModel.findOneAndUpdate(
            {
                _id: typeId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find type',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find type',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get type',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const types = await TypeModel.find().exec();
        res.json(types);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'type display operation failed',
        });
    }
};
/*peki yukarida attigim kodda maplar var selectboxlarin icin de kullandigimiz simdi dispathtan alip map ile o selectboux icine nasil ekleriz ? */