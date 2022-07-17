import { Request, Response } from "express";
import { connection } from "../../data/connection";
import { UserRole } from "../../data/types";

const GetAllPlaylists = async (req: Request, res: Response) => {
    let errorCode = 404
    try {
        let userId = Number(req.query.userId)
        let typeUser = req.headers.authorization

        const allPlaylists = await connection('desafioPlaylist')
            .select()
            .orderBy("name")

        if (!allPlaylists.length) {
            throw new Error("Nenhuma playlist cadastrada!");
        };
        if (!typeUser) {
            throw new Error("O tipo de usuário deve ser passado.");
        };

        if (typeUser.toUpperCase() === 'ADMIN') {
            res.status(200).send(allPlaylists)
            return
        };

        const userPlaylist = await connection('desafioPlaylist')
            .select()
            .orderBy('name')
            .where({ 'user_id': userId })

        if (typeUser === 'USER') {
            res.status(200).send(userPlaylist)
            return
        };


    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}

export default GetAllPlaylists;