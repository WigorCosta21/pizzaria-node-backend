import { compare } from "bcrypt";
import { prisma } from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Email/Password is invalid");
    }

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error("Email/Password is invalid");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "30d",
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
}
