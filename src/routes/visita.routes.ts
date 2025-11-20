
import { Router } from 'express';
import * as visitaController from '../controllers/visita.controller';
import { registerCreateMid } from '../middlewares/register-create.middleware';
import { TipoRegistro } from '../interfaces/registro';
import { withTransaction } from '../middlewares/transaction.middleware';

const router = Router();


router.post('/', 
    withTransaction, 
    registerCreateMid(TipoRegistro.Agendamento), 
    visitaController.criarVisita
);


router.get('/', visitaController.listarVisitas);


router.get('/:id', visitaController.obterVisitaPorId);


router.put('/:id', visitaController.atualizarVisita);


router.delete('/:id', visitaController.excluirVisita);

export default router;