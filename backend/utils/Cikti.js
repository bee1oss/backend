import transformRaspData from "./splitData.js";

const myMiddleware = (req, res, next) => {
    console.log("Gelen veriler:", req.body); // req.body, POST veya PUT isteklerinde gelen verileri içerir
    transformRaspData(req.body);
    next(); // Middleware'den sonraki işlemlere devam etmek için next() fonksiyonunu çağırın
  };
  
  export default myMiddleware; // Middleware fonksiyonunu default olarak dışa aktar
  