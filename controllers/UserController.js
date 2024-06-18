import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            userRole: req.body.userRole,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({
                _id: user._id,
            }, 'secret123',
            {
                expiresIn: '30d',
            },);

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Не удалось зарегистрироваться',
        });
    }
};
//asassasa
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',//eger gercek proje yapiyorsan bu kismi sadece login veya password yalnis deyip gec
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(403).json({
                message: 'Ваш адрес электронной почты или пароль неверны',//eger gercek proje yapiyorsan bu kismi sadece login veya password yalnis deyip gec
            });
        }

        const token = jwt.sign({
                _id: user._id,
            }, 'secret123',
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token});

    } catch (err) {
        console.log(err);
        res.status(500).json({
            messeage: 'Авторизация не удалась',
        });
    }
};

export const UserUpdate = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findOne({_id: req.userId});
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',//eger gercek proje yapiyorsan bu kismi sadece login veya password yalnis deyip gec
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(403).json({
                message: 'unsuccess proccess',//eger gercek proje yapiyorsan bu kismi sadece login veya password yalnis deyip gec
            });
        }
        await UserModel.updateOne({
            _id: userId,
        }, {
            email: req.body.email,
            fullName: req.body.fullName,
            detail: req.body.detail
        });
        res.json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить расписания',
        });
    }
};


export const getMe = async (req,res)=>{
    try {
        const user = await UserModel.findById(req.userId);
        if (!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }else{
            const {passwordHash, ...userData} = user._doc;

            res.json(userData);
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({//asas
            messeage: 'У вас нет доступа',
        });
    }
};


/*
export const updateMe = async (req, res) => {
    try {
        const userId = req.userId; // checkAuth işlevinden kullanıcı kimliği alınıyor
        const updateData = req.body;

        // Güncelleme isteğindeki verileri kullanıcı modeline uygun olarak kontrol et
        const allowedUpdates = ['email', 'fullName', 'userRole','', 'password','currentPassword']; // Şifre değişikliği eklendi
        const updates = Object.keys(updateData);
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Geçersiz güncellemeaaa!'});
        }

        // Eğer şifre güncelleniyorsa, mevcut şifreyi kontrol et
        if (updateData.password) {
            const user = await UserModel.findById(userId);
            const isValidPass = await bcrypt.compare(updateData.currentPassword, user.passwordHash);

            if (!isValidPass) {
                return res.status(403).json({ message: 'Mevcut şifreniz yanlış!' });
            }

            // Yeni şifreyi hashle
            const salt = await bcrypt.genSalt(10);
            updateData.passwordHash = await bcrypt.hash(updateData.password, salt);

            // Güncelleme isteğinden mevcut şifre ve currentPassword alanlarını kaldır
            delete updateData.password;
            delete updateData.currentPassword;
        }

        const user = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
};*/

/*const updateUser = async (req, res) => {
    try {
      const { userId } = req.params; // Güncellenmek istenen kullanıcının ID'sini al
      const { email, fullname } = req.body; // Güncellenecek verileri al
  
      // Kullanıcının varlığını kontrol et
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }
  
      // Sadece email ve fullname güncellenmesine izin ver, şifre güncellemesi yapma
      user.email = email;
      user.fullname = fullname;
  
      // Kullanıcının bilgilerini güncelle
      await user.save();
  
      res.status(200).json({ message: 'Kullanıcı bilgileri başarıyla güncellendi' });
    } catch (error) {
      console.error('Kullanıcı güncelleme hatası:', error);
      res.status(500).json({ error: 'Sunucu hatası, kullanıcı güncellenemedi' });
    }
  };*/