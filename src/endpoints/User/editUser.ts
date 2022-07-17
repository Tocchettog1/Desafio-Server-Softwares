import { Request, Response } from "express";
import { connection } from "../../data/connection";

const EditUser = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 404
    try {
        const id = Number(req.params.id);
        let { name, email, password, role } = req.body
        if (isNaN(id)) {
            throw new Error("Id inválido");
        }

        await connection('desafioUser')
            .update({
                name,
                email,
                password,
                role
            })
            .where({ id })

        res.status(200).send(`Dado(s) atualizado(s)!`);
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}

export default EditUser;