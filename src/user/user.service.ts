import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { LoginDto } from 'src/common/dto/login.dto';
import { User } from 'src/schemas/user.schma';
import { generateAccessToken } from 'src/utils/createAccessToken.util';
import { generateRefreshToken } from 'src/utils/createRefreshToken.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    userImagePath: string | null,
  ): Promise<any> {
    //Check if a user with the same email already exist
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();

    if (existingUser) {
      return {
        success: false,
        message: 'User already exists',
      };
      //throw new ConflictException('User already exists');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12); // Salt rounds set to 10

    // Replace the plaintext password with the hashed password
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      user_img: userImagePath, // Store the uploaded image path
    });

    await newUser.save();
    // const newUser = new this.userModel(createUserDto);

    await newUser.save();
    const accessToken = generateAccessToken(
      newUser._id,
      newUser.username,
      this.jwtService,
    );

    const refreshToken = generateAccessToken(
      newUser._id,
      newUser.username,
      this.jwtService,
    );

    return {
      success: true,
      message: 'user Created Successfully',
      user: newUser,
      // accessToken,
      // refreshToken,
    };
  }

  async loginUser(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // if (password !== user.password) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = generateAccessToken(
      user._id,
      user.username,
      this.jwtService,
    );
    const refreshToken = generateRefreshToken(
      user._id,
      user.username,
      this.jwtService,
    );

    return {
      success: true,
      message: 'Login successfull',
      accessToken,
      refreshToken,
      user: user,
    };
  }
}
