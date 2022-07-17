import { Request, Response } from "express";
import { connection } from "../../data/connection";

const EditPlaylist = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 404
    try {
        const id = Number(req.params.id);
        let { name, genre, musics } = req.body
        if (isNaN(id)) {
            throw new Error("Id inválido");
        }

        await connection('desafioPlaylist')
            .update({
                name,
                genre,
                musics
            })
            .where({ id })

        res.status(200).send(`Dado(s) atualizado(s)!`);
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}

export default EditPlaylist;