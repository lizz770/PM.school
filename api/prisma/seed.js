//create user
import prisma from "../constants/config.js";
import bcrypt from "bcryptjs";

const seed = async () => {
  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: "test@test.com",
      },
    });

    if (emailExists) {
      console.log("test@test.com already exists");
      return;
    }

    const pw = bcrypt.hashSync("12345", 10);

    const user = await prisma.user.create({
      data: {
        firstName: "Teodor",
        lastName: "Wrapper",
        email: "test@test.com",
        userRole: "STUDENT",
        password: pw,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        password: true,
      },
    });

    const mes=await prisma.measurements.create({
        data:{
            user:{
                connect:{
                    id:user.id,
                }
            }
        }
    });

    

    console.log(`User created: ${JSON.stringify(user)}`);
  } catch (e) {
    console.log(e);
    console.log(`Error seeding database`);
  }
};

await seed();