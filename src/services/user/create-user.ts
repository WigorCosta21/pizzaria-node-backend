import { prisma } from "../../prisma";
import bcrypt from "bcrypt";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new Error("User is already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    return user.name;
  }
}
