import express from "express";
import { 
    getRasps,
    getRaspById,
    saveRasp,
    updateRasp,
    deleteRasp
} from "../controllers/RaspController.js";

const router = express.Router();

router.get('/rasps', getRasps);
router.get('/rasps/:id', getRaspById);
router.post('/rasps', saveRasp);
router.patch('/rasps/:id', updateRasp);
router.delete('/rasps/:id', deleteRasp);

export default router;