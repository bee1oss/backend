import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {registerValidation, loginValidation, raspCreateValidation} from "./validations.js";
import {TypeController,DetailController,UserController, RaspisaniyaController,TimeController,TeacherController,DayController,PredmedController, KursController, GroupController} from "./controllers/index.js";
import {handleValidationErrors,checkAuth} from "./utils/index.js";
import CheckAdminRole from "./utils/checkAdminRole.js";


const app = express();
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6';

mongoose
    .connect(url,{})
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));
app.use(cors());
app.use(express.json());




app.get('/rasps', RaspisaniyaController.getAll);////(successful)
app.get('/rasps/:id', RaspisaniyaController.getOne);////(successful)
app.post('/rasps', CheckAdminRole,RaspisaniyaController.create);////(successful)
app.delete('/rasps/:id', CheckAdminRole, RaspisaniyaController.remove);////(successful)
app.patch('/rasps/:id', CheckAdminRole,raspCreateValidation,handleValidationErrors, RaspisaniyaController.update);////(successful)





app.post('/auth/login',loginValidation, handleValidationErrors, UserController.login);//login olurken auth islemi
app.post('/auth/register', handleValidationErrors, UserController.register);//uye olma islemii
app.get('/auth/me', checkAuth, UserController.getMe);
app.patch('/update/:id',checkAuth,UserController.UserUpdate);



//app.get('/kabinet', DetailController.getAll);//(successful)
app.get('/kabinet/:id',checkAuth, DetailController.getOne);//(successful)
app.post('/kabinet', checkAuth,DetailController.create);//(successful)
app.delete('/kabinet/:id', checkAuth, DetailController.remove);//(successful)
app.patch('/kabinet/:id', checkAuth,DetailController.update);//(successful)

app.get('/types', TypeController.getAll);//(successful)
app.get('/types/:id', TypeController.getOne);//(successful)
app.post('/types', CheckAdminRole,TypeController.create);//(successful)
app.delete('/types/:id', CheckAdminRole, TypeController.remove);//(successful)
app.patch('/types/:id', CheckAdminRole, TypeController.update);//(successful)



app.get('/times', TimeController.getAll);//(successful)
app.get('/times/:id', TimeController.getOne);//(successful)
app.post('/times', CheckAdminRole,TimeController.create);//(successful)
app.delete('/times/:id', CheckAdminRole, TimeController.remove);//(successful)
app.patch('/times/:id', CheckAdminRole, TimeController.update);//(successful)

app.post('/predmets',CheckAdminRole,PredmedController.create);//(successful)
app.patch('/predmets/:id',CheckAdminRole,PredmedController.update);//(successful)
app.delete('/predmets/:id',CheckAdminRole,checkAuth,PredmedController.remove);//(successful)
app.get('/predmets/:id',PredmedController.getOne);//(successful)
app.get('/predmets',PredmedController.getAll);//(successful)

app.post('/teachers',CheckAdminRole,TeacherController.create);//(successful)
app.patch('/teachers/:id',CheckAdminRole,TeacherController.update);//(successful)
app.delete('/teachers/:id',CheckAdminRole,TeacherController.remove);//(successful)
app.get('/teachers/:id',TeacherController.getOne);//(successful)
app.get('/teachers',TeacherController.getAll);//(successful)


app.post('/kurses',CheckAdminRole,KursController.create);//(successful)
app.patch('/kurses/:id',CheckAdminRole,KursController.update);//(successful)
app.delete('/kurses/:id',CheckAdminRole,KursController.remove);//(successful)
app.get('/kurses/:id',KursController.getOne);//(successful)
app.get('/kurses',KursController.getAll);//(successful)

app.post('/groups',CheckAdminRole,GroupController.create);//(successful)
app.patch('/groups/:id',CheckAdminRole,GroupController.update);//(successful)
app.delete('/groups/:id',CheckAdminRole,GroupController.remove);//(successful)
app.get('/groups/:id',GroupController.getOne);//(successful)
app.get('/groups',GroupController.getAll);//(successful)


app.post('/days',CheckAdminRole,DayController.create);//(successful)
app.patch('/days/:id',checkAuth,DayController.update);//(successful)
app.get('/days/:id',DayController.getOne);//(successful)
app.get('/days',DayController.getAll);//(successful)
app.delete('/days/:id',checkAuth,DayController.remove);//(successful)

app.listen(5555, ()=> console.log('Server up and running...'));
//asas