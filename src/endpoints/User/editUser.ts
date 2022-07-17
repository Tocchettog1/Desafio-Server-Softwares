import { Request, Response } from "express";
import { connection } from "../../data/connection";

const EditUser = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 404
    try {
        const userType = req.headers.authorization as string
        const id = Number(req.params.id);
        let { name, email, password, role } = req.body

        if (isNaN(id)) {
            errorCode = 400
            throw new Error("Id inválido");
        }

        if (userType.toUpperCase() !== 'ADMIN') {
            errorCode = 403
            throw new Error("Acesso não autorizado");
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