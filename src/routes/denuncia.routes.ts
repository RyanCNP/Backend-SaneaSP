import express, { NextFunction, Request, Response } from "express";
import { deleteDenuncia, getAllDenuncias, getById, getByUsuario, postDenuncia, putDenuncia, getByCategoria } from "../controllers/denuncia.controller";
import { ICreateDenuncia, IFilterListDenuncia } from "../interfaces/denuncia";
import { validateToken } from "../middlewares/auth.middleware";

const router = express.Router()


router.get('/', async (req: Request, res: Response) => {
    const query : IFilterListDenuncia = req.query
    const foundDenuncias = await getAllDenuncias(query);
    res.status(200).json(foundDenuncias);
});

router.get('/usuario',validateToken, async (req: Request, res: Response)=>{
    const idUsuario = req.user.id as number;
    const denuncias = await getByUsuario(idUsuario);
    res.status(200).json(denuncias);
})

router.get('/categorias', async (req: Request, res: Response)=>{
    let listCategoriaId : number[] = [];
    let listaQuery !: string[];
    let idUsuario : number | undefined;

    if(!req.query.categorias){
        res.status(400).json({
            error: true,
            message: `Nenhuma categoria foi informada`,
        });
        return;
    }

    if(Array.isArray(req.query.categorias)){
        listaQuery = req.query.categorias as string[];
        listCategoriaId = listaQuery.map(id => Number(id));
    }
    else{
        listCategoriaId.push(Number(req.query.categorias as string));
    }

    if(req.query.idUsuario){
        idUsuario = Number(req.query.idUsuario);
    }
    const denuncias = await getByCategoria(listCategoriaId,idUsuario);
    res.json(denuncias);
})

router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const denuncia = await getById(id);
    res.status(200).json(denuncia);
})

router.use(validateToken);

router.post('/', async (req: Request, res: Response) =>{
    const body:ICreateDenuncia = req.body;
    body.idUsuario = req.user.id as number;
    const denuncia = await postDenuncia(body);
    res.status(201).json(denuncia);
})

router.put('/:id', async (req:Request, res: Response) =>{
    const id = Number(req.params.id);
    const body = req.body;

    //Verifica se existe a reclamação com o id passado, caso contrário lança ApiError
    await getById(id);
    const result = await putDenuncia(id,body);
    res.status(200).json(result)
});

router.delete('/:id',async(req:Request,res:Response)=>{
    const idDenuncia = Number(req.params.id);
    const result = await deleteDenuncia(idDenuncia);
    res.status(200).json(result)
});

export default router