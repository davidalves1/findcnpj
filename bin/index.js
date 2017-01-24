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
			Atividade principal: ${response.atividade_principal},
			Natureza juridica: ${response.natureza_juridica},
			Data de bertura: ${response.abertura},
			Razão Social: ${response.nome},
			Nome Fantasia: ${response.fantasia},
			Logradouro: ${response.logradouro},
			Número: ${response.numero},
			Bairro: ${response.bairro},
			Cidade: ${response.municipio},
			Estado: ${response.u}f
		`);
	})
	.catch(response => console.log(response));