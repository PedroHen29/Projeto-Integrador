import { AppDataSource } from "../database/dataSource";
import { CreateUserDTO } from "../dtos/userDTO";
import { Users } from "../models/User";


const repo = AppDataSource.getRepository(Users)

export const userRepository = {
    async create(data: CreateUserDTO){
        const user = repo.create(data)
        return await repo.save(user)
    },

    async listAll(){
        return repo.find()
    },

    async findByEmail(email: string){
        return repo.findOne({where: {email: email}})
    },

    async findById(id: number){
        const user = repo.findOne({where: {id: id}})
        return user
    },

    async save(user: Users){
        await repo.save(user)
    },

    async delete(id: number){
        return repo.delete(id)
    }
}