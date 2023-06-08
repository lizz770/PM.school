import prisma from "../../constants/config.js";

const getUsers = async (req, res, next) => {
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
    return res.status(400).json({ error: "Что-то пошло не так getUsers" });
  }

  try {
    const users = await prisma.userRelationship.findMany({
      where: {
        studentId:
          loggedInUser.userRole === "STUDENT" ? loggedInUser.id : undefined,
        tutorId:
          loggedInUser.userRole === "TUTOR" ? loggedInUser.id : undefined,
        status: "ACCEPTED",
      },
      select: {
        tutor: loggedInUser.userRole === "STUDENT" ? true : false,
        student: loggedInUser.userRole === "TUTOR" ? true : false,
        status: true,
      },
    });

    if (loggedInUser.userRole === "STUDENT") {
      const doctors = users?.map((user) => {
        delete user.tutor.password;
        delete user.tutor.createdAt;
        delete user.tutor.updatedAt;
        return user.tutor;
      });
      return res.status(200).json({
        users: doctors,
      });
    } else {
      const students = users?.map((user) => {
        delete user.student.password;
        delete user.student.createdAt;
        delete user.student.updatedAt;
        return user.student;
      });
      return res.status(200).json({
        users: students,
      });
    }
  } catch (e) {
    return res.status(400).json({ error: "Что-то пошло не так getUsers" });
  }
};

export default getUsers;