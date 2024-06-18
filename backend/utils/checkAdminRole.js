import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const checkAdminRole = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');

            const user = await UserModel.findById(decoded._id);
            if (!user) {
                return res.status(403).json({
                    message: 'Kullanıcı bulunamadı',
                });
            }

            // Kullanıcının admin rolü kontrol ediliyor
            if (user.userRole.toLowerCase() !== 'admin') { // Küçük harfle kontrol ediyoruz
                return res.status(403).json({
                    message: 'Bu işlemi gerçekleştirmek için yeterli yetkiye sahip değilsiniz',
                });
            }

            // Kullanıcı admin rolüne sahipse, isteği devam ettir
            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Erişiminiz yokasasa',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Erişiminiz yok',
        });
    }
};

export default checkAdminRole;