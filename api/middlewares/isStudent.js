import prisma from "../constants/config.js";

const isStudent = async (req, res, next) => {
  try {
    const isStudent = await prisma.user.findUnique({
      where: {
        id: req?.session?.userId,
      },
    });

    if (isStudent?.userRole === "STUDENT" && isStudent?.id) next();
    else return res.status(401).json({ message: "You're not a student" });
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "Something Went Wrong" });
  }
};

export default isStudent;
