import {body} from "express-validator";

export const loginValidation=[
    body('email','ваша электронная почта или пароль неверны').isEmail(),
    body('password','ваша электронная почта или пароль неверны').isLength({min:5}),
];

export const registerValidation=[
    body('email','введите адрес электронной почты').isEmail(),
    body('password','Ваш пароль должен содержать не менее 5 символов').isLength({min:5}),
    body('fullName','Введите свое имя и должно содержать не менее 3 символов').isLength({min:3}),
];
export const raspCreateValidation=[
    body('time','введите время').isLength({min:3}).isString(),
    body('day','Введите день').isLength({min:3}).isString(),
    body('predmed','Введите предмет').isLength({min:3}).isString(),
    body('group','Введите группу').isLength({min:3}).isString(),
    body('teacher','Введите преподаватель').isLength({min:3}).isString(),
    body('kurs','Введите курс').isLength({min:1}).isString(),
    body('room','Введите аудитория').isLength({min:3}).isString(),
];
