import  express, { Request, Response,  }  from "express";
import { IFilterListDenuncia } from "../interfaces/denuncia";
import { IfilterGraph } from "../interfaces/graph";
import { getBigPoints } from "../controllers/graph.controller";
export const router = express.Router();

router.get('/maioresPontuacoes',async(req:Request,res:Response)=>{
    const filter = req.query as unknown as IfilterGraph;
    const result = await getBigPoints(filter)
    res.json(result);
});

export default router;