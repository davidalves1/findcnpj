#! /usr/bin/env node

'use strict';

const meow = require('meow');

const cli = meow(`
    Modo de uso:
      $ findcnpj <cnpj>

    Exemplo:
      $ findcnpj 17184406000174

`, {});

let cnpj = process.argv.slice(2)[0];
cnpj = cnpj.replace(/\D/g, '');

if (cnpj.length !== 14) {
	console.log('Ops, informe um CNPJ válido para consultar.');
	return;
}


https
	.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, 
		response => {

			let res = '';

			response.on('data', data => {
				res += data;
			});

			response.on('error', e => {
				handleError(e);
			});

			response.on('end', () => {
				res = JSON.parse(res);

				if (res.status === 'OK')
					handleSuccess(res);
				else
					handleError(res.message);

		});
	});

function handleSuccess(data) {
	console.log(`
		Situação: ${data.situacao},
		Atividade principal: ${data.atividade_principal[0].text},
		Natureza jurídica: ${data.natureza_juridica},
		Data de abertura: ${data.abertura},
		Razão Social: ${data.nome},
		Nome Fantasia: ${data.fantasia},
		Logradouro: ${data.logradouro},
		Número: ${data.numero},
		Bairro: ${data.bairro},
		Cidade: ${data.municipio},
		Estado: ${data.uf}
	`);
}

function handleError(err) {
	console.log(err);
}