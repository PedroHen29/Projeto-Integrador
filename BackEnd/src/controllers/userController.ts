import { NextFunction, Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "../dtos/userDTO";
import { UserService } from "../services/userService";

const userService = new UserService();
export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = createUserSchema.safeParse(req.body);
      if (!validated.success) {
        throw validated.error;
      }

      const data = validated.data;
      const user = await userService.createUser(data);
      return res.status(200).json({ message: "User create: ", user });
    } catch (err) {
      next(err);
    }
  }

  async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await userService.loginUser({ email, password });
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async findUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await userService.findUser(id);
      return res.status(201).json({ message: "User found: ", user });
    } catch (err) {
      next(err);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.listAll();
      return res.status(201).json({ message: "Users: ", users });
    } catch (err) {
      next(err);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = (req as any).user.id;
      const validated = updateUserSchema.safeParse(req.body);
      if (!validated.success) {
        throw validated.error;
      }

      const data = validated.data;
      const user = await userService.updateUser(id, data);

      return res
        .status(201)
        .json({ message: "User updated with succes ", user });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = (req as any).user.id;
      await userService.deleteUser(id);
      return res.status(200);
    } catch (err) {
      next(err);
    }
  }
}
