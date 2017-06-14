#! /usr/bin/env node

'use strict';

const meow = require('meow');
const FindCnpj = require('./findcnpj.js');

const cli = meow(`
    Modo de uso:
      $ findcnpj <cnpj>

    Exemplo:
      $ findcnpj 17184406000174

`, {});

const cnpj = process.argv.slice(2)[0];
const findcnpj = new FindCnpj();

findcnpj.find(cnpj)
	.then(response => {
		console.log(`
Atividade Principal: ${response.atividade_principal},
Natureza Jurídica: ${response.natureza_juridica},
Data de Abertura: ${response.abertura},
Razão Social: ${response.nome},
Nome Fantasia: ${response.fantasia},
Logradouro: ${response.logradouro},
Número: ${response.numero},
Bairro: ${response.bairro},
Cidade: ${response.municipio},
Estado: ${response.uf}
		`);
	})
	.catch(response => console.log(response));
