import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    console.log(req.header);
    //淨係想要個token，同埋係要token first position in array
    const token = req.headers.authorization.split(" ")[1];
    // 用嚟分辨係JWT 定 OAuth，細過500 係JWT
    const isCustomAuth = token.length < 500;

    // 呢個var 係拎返token 入邊data
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      console.log(decodedData);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      console.log(decodedData);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
