import { Request, Response } from "express";
import { connection } from "../../data/connection";

const GetAllUsers = async (req: Request, res: Response) => {
    let errorCode = 404
    try {
        const userType = req.headers.authorization as string

        const users = await connection('desafioUser')
            .select()
            .orderBy("name")


        if (!users.length) {
            throw new Error("Nenhum usuário cadastrado!");
        }
        if (userType.toUpperCase() !== 'ADMIN') {
            errorCode = 403
            throw new Error("Acesso não autorizado");
        }


        res.status(200).send(users)
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}

export default GetAllUsers;