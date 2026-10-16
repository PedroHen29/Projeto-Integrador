import { Users } from "../models/User"

// Remove a senha do objeto de usuário antes de retornar para o cliente
export function omitPassword(user: Users) {
    const { password, ...usuarioSemSenha } = user
    return usuarioSemSenha
}
