import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { MailerService } from 'src/mailer.service';
import { createId } from '@paralleldrive/cuid2';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;
    const existUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existUser) {
      throw new ConflictException('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });
    await this.mailerService.sendEmailFromRegister({
      recipient: email,
      firstName,
    });

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token, user };
  }

  async login(loginDto: LoginDTO) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    };
    return {
      user: safeUser,
      access_token,
    };
  }

  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });
    return user;
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async resetUserPasswordRequest({ email }: { email: string }) {
    try {
      const existUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!existUser) {
        throw new ConflictException("L'utilisateur n'existe pas");
      }

      if (existUser.isResetPasswordRequested === true) {
        throw new ConflictException(
          'Une demande de réinitialisation de mot de passe est déjà en cours',
        );
      }
      const createdId = createId();

      await this.prisma.user.update({
        where: { email },
        data: {
          isResetPasswordRequested: true,
          resetPasswordToken: createdId,
        },
      });

      await this.mailerService.sendRequestPasswordEmail({
        recipient: existUser.email,
        firstName: existUser.firstName,
        token: createdId,
      });

      return {
        error: false,
        message: 'Demande de réinitialisation de mot de passe envoyée',
      };
      // return this.validateUser(userId);
    } catch (error) {
      console.log(error);
    }
  }

  async verifyResetPasswordToken({ token }: { token: string }) {
    try {
      const existUser = await this.prisma.user.findUnique({
        where: { resetPasswordToken: token },
      });

      if (!existUser) {
        throw new ConflictException("L'utilisateur n'existe pas");
      }

      if (existUser.isResetPasswordRequested === false) {
        throw new ConflictException(
          'Aucune demande de réinitialisation de mot de passe est actuellement en cours',
        );
      }

      return {
        error: false,
        message:
          'le token est valide, vous pouvez réinitialiser votre mot de passe',
      };
      // return this.validateUser(userId);
    } catch (error) {
      console.log(error);
    }
  }

  async resetUserPassword({
    resetPasswordDto,
  }: {
    resetPasswordDto: ResetUserPasswordDto;
  }) {
    try {
      const { password, token } = resetPasswordDto;

      const existUser = await this.prisma.user.findUnique({
        where: { resetPasswordToken: token },
      });

      if (!existUser) {
        throw new ConflictException("L'utilisateur n'existe pas");
      }

      if (existUser.isResetPasswordRequested === false) {
        throw new ConflictException(
          'Une demande de réinitialisation de mot de passe est déjà en cours',
        );
      }
      //const createdId = createId();
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.prisma.user.update({
        where: { resetPasswordToken: token },
        data: {
          password: hashedPassword,
          isResetPasswordRequested: false,
        },
      });
      return {
        error: false,
        message: 'Mot de passe réinitialisé avec succès',
      };
      // return this.validateUser(userId);
    } catch (error) {
      console.log(error);
    }
  }
}
