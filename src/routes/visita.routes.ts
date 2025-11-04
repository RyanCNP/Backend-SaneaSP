
import { Router } from 'express';
import * as visitaController from '../controllers/visita.controller';

const router = Router();


router.post('/', visitaController.criarVisita);


router.get('/', visitaController.listarVisitas);


router.get('/:id', visitaController.obterVisitaPorId);


router.put('/:id', visitaController.atualizarVisita);


router.delete('/:id', visitaController.excluirVisita);

export default router;