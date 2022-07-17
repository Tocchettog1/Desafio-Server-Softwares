import { Request, Response } from "express";
import { Playlist } from "../../data/types";
import { connection } from "../../data/connection";
const express = require('express');

const CreatePlaylist = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400
    try {
        let { name, genre, musics, user_id } = req.body

        if (!name || !genre || !musics || !user_id) {
            errorCode = 406
            throw new Error("Algum parâmetro não foi preenchido corretamente!");
        };

        const newPlaylist: Playlist = {
            id: Math.round(Math.random() * (50000 - 1) + 1),
            name,
            genre,
            musics,
            user_id
        }
        await connection('desafioPlaylist')
            .insert(newPlaylist)

        res.status(201).send('Playlist criada!');
    } catch (error: any) {
        res.status(errorCode).end(error.message || error.sqlMessage);
    }
}
export default CreatePlaylist;