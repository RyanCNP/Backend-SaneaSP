export enum StatusDenuncia {
  Enviada = 'enviada',                       // Denúncia foi publicada pelo cidadão
  EmAnalise = 'em_analise',                 // Um funcionário visualizou e entrou em contato com o cidadão
  AguardandoInformacoes = 'aguardando_informacoes', // Aguardando mais informações do cidadão
  EmResolucao = 'em_resolucao',             // A prefeitura já está trabalhando para resolver o problema
  VisitaAgendada = 'visita_agendada',       // Uma visita ao local foi agendada
  NaoProcede = 'nao_procede',               // A denúncia não pôde ser confirmada ou não se aplica
  Cancelada = 'cancelada',                  // A denúncia foi cancelada
  Resolvida = 'resolvida',                  // O problema foi resolvido pela equipe técnica
  Finalizada = 'finalizada'                 // A denúncia foi oficialmente encerrada no sistema
}
