import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {registerValidation, loginValidation, raspCreateValidation} from "./validations.js";
import {UserController, RaspisaniyaController} from "./controllers/index.js";
import {handleValidationErrors,checkAuth} from "./utils/index.js";

const app = express();
mongoose
    .connect('mongodb+srv://bega:1999@cluster0.yras7hz.mongodb.net/CRUD_DB?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

app.use(cors());
app.use(express.json());

app.post('/auth/login',loginValidation, handleValidationErrors, UserController.login);//login olurken auth islemi
app.post('/auth/register',registerValidation, handleValidationErrors, UserController.register);//uye olma islemii
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/rasps', RaspisaniyaController.getAll);//butun tag cagirmak icinn
app.get('/rasps/:id', RaspisaniyaController.getOne);//sadece bir postu cagirmak icin
app.post('/rasps', checkAuth, raspCreateValidation, handleValidationErrors,RaspisaniyaController.create);//bu post olusturmak icinn
app.delete('/rasps/:id', checkAuth, RaspisaniyaController.remove);//bu postu silmek icin
app.patch('/rasps/:id', checkAuth,raspCreateValidation,handleValidationErrors, RaspisaniyaController.update);//bu postu degistirmek icinn



app.listen(5000, ()=> console.log('Server up and running...'));