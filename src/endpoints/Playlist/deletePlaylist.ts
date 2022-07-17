import { Request, Response } from "express";
import { connection } from "../../data/connection";

const DeletePlaylist = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 404
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            throw new Error("Id inválido!");
        }

        await connection('desafioPlaylist')
            .delete()
            .where({ id })

        res.status(200).send('Playlist deletada!')
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}

export default DeletePlaylist;