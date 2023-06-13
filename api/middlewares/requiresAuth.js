const requiresAuth = async (req, res, next) => {
  if (req?.session?.userId) {
    next();
  } else {
    res.status(401).json({ authed: false, message: "Вы не залогинились" });
  }
};

export default requiresAuth;
