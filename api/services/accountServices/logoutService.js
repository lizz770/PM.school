const logoutService = async (req, res) => {
    try {
      if (req?.session?.userId) {
        req.session.destroy();
        return res.status(401).json({
          message: "Выход из системы",
        });
      } else {
        return res.status(401).json({
          message: "Не вошли в систему",
        });
      }
    } catch (e) {
      return res.status(401).json({
        message: "Ошибка, что-то пошло нетак",
      });
    }
  };
  
  export default logoutService;