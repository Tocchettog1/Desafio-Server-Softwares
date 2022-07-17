import { Request, Response } from "express";
import { Playlist } from "../../data/types";
import { connection } from "../../data/connection";
const express = require('express');

const CreatePlaylist = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 404
    try {
        let userType = req.headers.authorization as string
        let userId = Number(req.params.userId)
        let { name, genre, musics } = req.body

        if (userType.toUpperCase() !== 'USER' && userType.toUpperCase() !== 'ADMIN') {
            errorCode = 403
            throw new Error("Usuário não autorizado!");
        };
        if (!name || !genre || !musics) {
            errorCode = 400
            throw new Error("Algum parâmetro não foi preenchido corretamente!");
        };
        if (!userId) {
            throw new Error("Id do usuário não encontrado! Tente novamente.");
        };

        const newPlaylist: Playlist = {
            id: Math.round(Math.random() * (50000 - 1) + 1),
            name,
            genre,
            musics,
            user_id: userId
        }
        
        await connection('desafioPlaylist')
            .insert(newPlaylist)

        res.status(201).send('Playlist criada!');
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}
export default CreatePlaylist;