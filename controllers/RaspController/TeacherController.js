import TeacherModel from "../../models/RaspModels/Teacher.js";

export const create = async (req, res) => {
    try {
        const teachersDoc = new TeacherModel({
            teacher: req.body.teacher,
            user: req.userId,
        });
        const teacher = await teachersDoc.save();

        res.json(teacher);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Cannot create teacher',
        });
    }
};

export const update = async (req, res) => {
    try {
        const teacherId = req.params.id;

        await TeacherModel.updateOne({
            _id: teacherId,
        }, {
            teacher: req.body.teacher,
            user: req.userId,
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update teacher',
        });
    }
};

export const remove = async (req, res) => {//en son denenecek
    try {
        const teacherId = req.params.id;

        TeacherModel.findOneAndDelete({
            _id: teacherId,
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Cannot delete teacher',
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Cannot find teacher for delete',
                });
            }
            res.json({success: true,});
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot delete teacher',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const teacherId = req.params.id;

        TeacherModel.findOneAndUpdate(
            {
                _id: teacherId,
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Cannot find teacher',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Cannot find teacher',
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
        const teachers = await TeacherModel.find().populate('user').exec();
        res.json(teachers);
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'teachers display operation failed',
        });
    }
};