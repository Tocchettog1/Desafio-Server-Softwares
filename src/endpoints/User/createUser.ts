import { Request, Response } from "express";
import { User, UserRole } from "../../data/types";
import { connection } from "../../data/connection";

const CreateUser = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400
    try {
        let { name, email, password } = req.body

        if (!name || !email || !password) {
            errorCode = 406
            throw new Error("Algum parâmetro não foi preenchido corretamente!");
        };

        if( email = 'desafioUser.email'){
            errorCode = 409
            throw new Error("Email já cadastrado!");
        }
        const newUser: User = {
            id: Math.round(Math.random() * (10000 - 1) + 1),
            name,
            email,
            password,
            role: UserRole.USER
        }
        await connection('desafioUser')
            .insert(newUser)

        res.status(201).send('Usuário criado!');
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}
export default CreateUser;