import { Request, Response } from "express";
import { connection } from "../../data/connection";

const GetAllPlaylists = async (req: Request, res: Response) => {
    let errorCode = 404
    try {
        const playlists = await connection('desafioPlaylist')
            .select()
            .orderBy("name")

        if(!playlists.length){
            throw new Error("Nenhuma playlist cadastrada!");
        }

        res.status(200).send(playlists)
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}

export default GetAllPlaylists;