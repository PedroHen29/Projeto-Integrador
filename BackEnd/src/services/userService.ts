import { CreateUserDTO, UpdateUserDTO } from "../dtos/userDTO";
import { ConflictError, NotFoundError, UnauthorizedError } from "../errors/AppError";
import { userRepository } from "../repository/UserRepository";
import { omitPassword } from "../utils/omitPassword";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export class UserService {
  async createUser(data: CreateUserDTO) {
    const userExist = await userRepository.findByEmail(data.email);
    if (userExist) {
      throw new ConflictError("This email already exist");
    }

    const encryptedPassword = await bcrypt.hash(data.password, 10);

    const newData = {
      ...data,
      password: encryptedPassword,
    };

    const user = await userRepository.create(newData);
    return omitPassword(user);
  }

  async loginUser(data: {email: string, password:string }){
    const user = await userRepository.findByEmail(data.email)
    if(!user){throw new NotFoundError('User not found')}

    const validatePassword = await bcrypt.compare(data.password, user.password)
    if(!validatePassword){throw new UnauthorizedError('You dont have')}

    const token = generateToken({
        id: user.id,
        email: user.email
    })

    return (
        omitPassword(user),
        token
    )
  }

  async findUser(id: number){
    const user = await userRepository.findById(id)
    if(!user){throw new NotFoundError('User not found')}
    return omitPassword(user)
  }

  async listAll(){
    const users = await userRepository.listAll()
    return users.map((user) => omitPassword(user))
  }

  async updateUser(id:number, data:UpdateUserDTO){
    const user = await userRepository.findById(id)
    if(!user){throw new NotFoundError('user not Found')}

    const newData = {...data}

    if(newData.password){
        newData.password = await bcrypt.hash(newData.password, 10)
    }

    if(newData.email){
        const user = await userRepository.findByEmail(newData.email)
        if(user){throw new ConflictError('This email already exist')}
    }

    const newUser = Object.assign(user, newData)
    await userRepository.save(newUser)
    return omitPassword(newUser)
  }

  async deleteUser(id:number){
    const user = await userRepository.findById(id)

    if(!user){throw new NotFoundError('User not found')}
    await userRepository.delete(user.id)
  }
}
