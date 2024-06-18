import GroupModel from "../../models/GroupModels/Group.js";

export const create = async (req, res) => {
    try {
        const groupsDoc = new GroupModel({
            group: req.body.group,
            kurs: req.body.kurs,
            user: req.userId,
        });
        const group = await groupsDoc.save();

        res.json(group);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create group',
        });
    }
};

export const update = async (req, res) => {
    try {
        const groupId = req.params.id;

        await GroupModel.updateOne({
            _id: groupId,
        }, {
            group: req.body.group,
            kurs: req.body.kurs,
            user: req.userId,
            
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update group',
        });
    }
};

export const remove = async (req, res) => {//en son denenecek
    try {
        const groupId = req.params.id;

        GroupModel.findOneAndDelete({
            _id: groupId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete group',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find group for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete group',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const groupId = req.params.id;

        GroupModel.findOneAndUpdate(
            {
                _id: groupId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find group',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find group',
                    });
                }

                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get group',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const groups = await GroupModel.find().populate('user').populate('kurs').exec();
        res.json(groups);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'groups display operation failed',
        });
    }
};