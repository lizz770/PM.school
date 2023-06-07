
//если ты не вошел в системы то не позволят дальше двигаться по сайту если да то можно 

const requiresAuth = (req, res, next) => {
    if (req?.session?.userId) {
      next();
    } else {
      return res
        .status(401)
        .json({ authed: false, message: "Вы не вошли в систему" });
    }
  };
  
  export default requiresAuth;