import express, {Request, Response } from "express";
import { deleteDenuncia, getAllDenuncias, getById, getByUsuario, postDenuncia, putDenuncia, getByCategoria } from "../controllers/denuncia.controller";
import { ICreateDenuncia, IDenuncia, IFilterListDenuncia } from "../interfaces/denuncia";
import { validateToken } from "../middlewares/auth.middleware";
import { uploadImages } from "../config/multer.config";
import { createImagemDenuncia, deleteImagemDenuncia, updateImagemDenuncia } from "../controllers/imagem-denuncia.controller";
import { ICreateImagemDenuncia } from "../interfaces/imagem-denuncia";

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

router.post('/', async (req: Request, res: Response) => {
    const body: ICreateDenuncia = req.body;
    body.idUsuario = req.user.id as number;
    const files = req.files as Express.Multer.File[];

    // 1. Cria a denúncia
    let denuncia :IDenuncia = await postDenuncia(body);

    // 2. Se há imagens, cria no banco
    if (files && files.length > 0) {
        const fileNames = files.map(file => file.filename);
        const createdImages : ICreateImagemDenuncia[] = await createImagemDenuncia(fileNames, denuncia.id);

        if(createdImages.length > 0){
            denuncia = await getById(denuncia.id);
        }
    }

    res.status(201).json(denuncia);
});

router.put('/:id', uploadImages.array('imagens', 10), async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body;
  const files = req.files as Express.Multer.File[];
  const fileNames = files?.map(file => file.filename) || [];

  // 1 Verifica se a denúncia existe e lança APIERROR caso contrário
  await getById(id);

  // 2 Atualiza campos da denúncia
  await putDenuncia(id, body);

  // 3 Atualiza as imagens da denuncia
  await updateImagemDenuncia(fileNames, id);
  
  // 4 Recupera a denúncia atualizada com imagens e categorias
  const updatedDenuncia = await getById(id);

  res.status(200).json(updatedDenuncia);
});


router.delete('/:id',async(req:Request,res:Response)=>{
    const idDenuncia = Number(req.params.id);

    const denuncia = await getById(idDenuncia);
    
    await deleteImagemDenuncia(idDenuncia);
    await deleteDenuncia(idDenuncia);

    res.status(200).json(denuncia)
});

export default router