//create user
import prisma from "../constants/config.js";
import bcrypt from "bcryptjs";

const seed = async () => {
  try {
    await prisma.$transaction(async (tx) => {
      const pw = bcrypt.hashSync("12345", 10);

      const student = await tx.user.create({
        data: {
          firstName: "Алиса",
          lastName: "Сфильская",
          email: "alisSfilsc@gmail.com",
          userRole: "STUDENT",
          password: pw,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          password: true,
        },
      });

      const medStudent = await tx.measurements.create({
        data: {
          user: {
            connect: {
              id: patient.id,
            },
          },
        },
      });

      const hrs = await tx.mediadesign.createMany({
        data: [
          {
            title: 60,
            measurementsId: medStudent.id,
            createdAt: new Date(new Date().getTime() - 55 * 60000),
          },
          {
            title: 70,
            measurementsId: medStudent.id,
            createdAt: new Date(new Date().getTime() - 50 * 60000),
          },
          {
            title: 80,
            measurementsId: medStudent.id,
            createdAt: new Date(new Date().getTime() - 45 * 60000),
          },
          {
            title: 55,
            measurementsId: medStudent.id,
            createdAt: new Date(new Date().getTime() - 40 * 60000),
          },
        ],
      });

      const tps = await tx.photoProduction.createMany({
        data: [
          {
            title: "Прекрасное и изящное фото",
            measurementsId: medStudent.id,
            createdAt: new Date(new Date().getTime() - 55 * 60000),
          },
          {
            title: "Прекрасное и изящное фото",
            measurementsId: medStudent.id,
            createdAt: new Date(new Date().getTime() - 50 * 60000),
          },
          {
            title:"Прекрасное и изящное фото",
            measurementsId: medStudent.id,
            createdAt: new Date(new Date().getTime() - 45 * 60000),
          },
          {
            title:"Прекрасное и изящное фото",
            measurementsId: medStudent.id,
            createdAt: new Date(new Date().getTime() - 40 * 60000),
          },
        ],
      });

      const tutor = await tx.user.create({
        data: {
          firstName: "tutor",
          lastName: "tutorovich",
          email: "tut@tut.com",
          userRole: "TUTOR",
          password: pw,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          password: true,
        },
      });

      const relationship = await tx.userRelationship.create({
        data: {
          tutorId: tutor.id,
          studentId: student.id,
          senderId: tutor.id,
          status: "ACCEPTED",
        },
      });

      //TRANSACTION END
      console.log(`Seeded database with: ${(student, tutor, relationship)}`);
    });
  } catch (e) {
    console.log(e);
    console.log(`Error seeding database`);
  }
};

await seed();
