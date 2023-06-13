import prisma from "../../constants/config.js";

const deleteUser = async (req, res, next) => {
  const { id } = req.query;

  let loggedInUser;

  try {
    loggedInUser = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userRole: true,
      },
    });
  } catch (e) {
    return res.status(400).json({ error: "Something Went Wrong" });
  }

  if (loggedInUser.userRole === "STUDENT") {
    try {
      await prisma.userRelationship.deleteMany({
        where: {
          studentId: loggedInUser.id,
          tutorId: id,
        },
      });

      return res.status(200).json({ message: "tutor Deleted Successfully" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: "Something Went Wrong" });
    }
  }
  if (loggedInUser.userRole === "TUTOR") {
    try {
      await prisma.userRelationship.deleteMany({
        where: {
          tutorId: loggedInUser.id,
          studentId: id,
        },
      });

      return res.status(200).json({ message: "student Deleted Successfully" });
    } catch (e) {
      return res.status(400).json({ error: "Something Went Wrong" });
    }
  }

  return res.status(400).json({ error: "Something Went Wrong" });
};

export default deleteUser;
