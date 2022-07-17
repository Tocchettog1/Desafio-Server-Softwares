import { Request, Response } from "express";
import { connection } from "../../data/connection";

const GetAllUsers = async (req: Request, res: Response) => {
    let errorCode = 404
    try {

        const users = await connection('desafioUser')
            .select()
            .orderBy("name")

        if (!users.length) {
            throw new Error("Nenhum usuário cadastrado!");
        }

        res.status(200).send(users)
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}

export default GetAllUsers;