import { Request, Response } from "express";
import { connection } from "../../data/connection";

const DeleteUser = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 404
    try {
        const userType = req.headers.authorization as string
        const id = Number(req.params.id)

        if (isNaN(id)) {
            throw new Error("Id inválido!");
        };
        if (userType.toUpperCase() !== 'ADMIN') {
            errorCode = 403
            throw new Error("Acesso não autorizado");
        };

        await connection('desafioUser')
            .delete()
            .where({ id })

        res.status(200).send('Usuário deletado!')
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}

export default DeleteUser;