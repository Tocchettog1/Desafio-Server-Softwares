import { Request, Response } from "express";
import { User, UserRole } from "../../data/types";
import { connection } from "../../data/connection";

const CreateUser = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 404
    try {
        const userType = req.headers.authorization as string
        const { name, email, password, role } = req.body


        if (!name || !email || !password) {
            errorCode = 412
            throw new Error("Algum parâmetro não foi preenchido corretamente!");
        };

        if (email === 'desafioUser.email') {
            errorCode = 409
            throw new Error("Email já cadastrado!");
        };


        // Caso tenha auth de ADMIN pode selecionar a role ao criar usuário.
        if (userType?.toUpperCase() === 'ADMIN') {
            const newUser: User = {
                id: Math.round(Math.random() * (10000 - 1) + 1),
                name,
                email,
                password,
                role
            }

        if (role.toUpperCase() !== UserRole.ADMIN && role.toUpperCase() !== UserRole.USER) {
                errorCode = 406
                throw new Error("O role deve ser 'USER' ou 'ADMIN");
            };

            await connection('desafioUser')
                .insert(newUser)

        res.status(201).end('Usuário criado!');
        return
        }
        //Se não tiver auth de ADMIN a role será automaticamente USER.
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