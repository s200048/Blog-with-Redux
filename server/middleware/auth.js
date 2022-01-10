import jwt from "jsonwebtoken";

// Secret 放係 第2個params (secretOrPublicKey) 係冇用
// const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization);

    //淨係想要個token，同埋係要token first position in array
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);

    // 用嚟分辨係JWT 定 OAuth，細過500 係JWT
    const isCustomAuth = token.length < 500;

    // 呢個var 係拎返token 入邊data
    let decodedData;

    if (token && isCustomAuth) {
      // 噉樣放就唔會有 JsonWebTokenError: secret or public key must be provided error
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decodedData);

      req.userId = decodedData?.id;
      // console.log("req.userId: " + req.userId);
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
      // console.log("req.userId: " + req.userId);
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
