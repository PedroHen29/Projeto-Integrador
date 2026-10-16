import { Router } from "express";
import { UserController } from "../controllers/userController";
import { autenticacaoMiddleware } from "../middlewares/authenticationMiddleware";


const router = Router()
const userController = new UserController()

router.post('/', userController.create)
router.post('/login', userController.userLogin.bind(userController))
router.get('/:id', autenticacaoMiddleware, userController.findUser.bind(userController))
router.get('/', autenticacaoMiddleware, userController.listAll)
router.put('/', autenticacaoMiddleware, userController.updateUser.bind(userController))
router.delete('/', autenticacaoMiddleware, userController.deleteUser.bind(userController))

export default router