import Rasp from "../models/Rasp.js";

export const getRasps = async (req, res) => {
    try {
        const rasps = await Rasp.find();
        res.json(rasps);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getRaspById = async (req, res) => {
    try {
        const rasp = await Rasp.findById(req.params.id);
        res.json(rasp);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveRasp = async (req, res) => {
    const rasp = new Rasp(req.body);
    try {
        const insertedrasp = await rasp.save();
        res.status(201).json(insertedrasp);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateRasp = async (req, res) => {
    try {
        const updatedrasp = await Rasp.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updatedrasp);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteRasp = async (req, res) => {
    try {
        const deletedrasp = await Rasp.deleteOne({_id:req.params.id});
        res.status(200).json(deletedrasp);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}