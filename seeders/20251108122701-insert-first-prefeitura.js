'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('prefeitura', [
      {
        nome_oficial: 'Prefeitura Municipal de São Paulo',
        email_institucional: 'contato@saopaulo.sp.gov.br',
        cnpj: '12345678000199',
        codigo_ibge: '3550308',
        logo: 'logo-sp.png',
        descricao: 'Prefeitura da maior cidade do Brasil.',
        cep: '01000000',
        cidade: 'São Paulo',
        bairro: 'Centro',
        rua: 'Praça da Sé',
        numero: '1',
        complemento: 'Prédio principal',
        status_assinatura: 'ativa'
      },
      {
        nome_oficial: 'Prefeitura Municipal de Campinas',
        email_institucional: 'contato@campinas.sp.gov.br',
        cnpj: '98765432000188',
        codigo_ibge: '3509502',
        logo: 'logo-campinas.png',
        descricao: 'Prefeitura de Campinas, cidade do interior paulista.',
        cep: '13010000',
        cidade: 'Campinas',
        bairro: 'Centro',
        rua: 'Avenida Anchieta',
        numero: '200',
        complemento: 'Edifício administrativo',
        status_assinatura: 'pendente'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('prefeitura', {
    codigo_ibge: { [Sequelize.Op.in]: ['3550308', '3509502'] }
   }, {});
  }
};
