import express, { Request, Response } from 'express'
import { geoconding, reverGeocolding } from '../controllers/location.controller';
import { NumericLiteral } from 'typescript';
const router = express.Router();

router.get('/geoconding', async (req: Request, res: Response) => {
    const address = req.query.endereco;
    if (!address) {
        res.status(400).json({
            error: true,
            message: `Nenhumm endereço foi informado`,
        });
        return;
    }
    const data = await geoconding(address);
    res.json(data);
})

router.get('/reverGeoconding', async (req: Request, res: Response) => {
    const lat = req.query.lat as unknown as number;
    const lon = req.query.lon as unknown as number;

    if (!lat || !lon) {
        res.status(400).json({
            error: true,
            message: `Coordenadas não foram informadas corretamente`,
        });
        return;
    }
    
    const address = await reverGeocolding(lat,lon)
    res.json(address);
})
export default router;