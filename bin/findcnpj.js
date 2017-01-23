'use strict';

const https = require('https');

class FindCnpj {

	validateCnpj(cnpj) {
		const CnpjValue = cnpj.replace(/\D/g, '');

		if (cnpj.length === 14) {
			return true;
		}

		return false;
	}

	find(cnpj) {
		https
		.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, 
			response => {

				let res = '';

				response.on('data', data => {
					res += data;
				});

				response.on('error', e => {
					return Promise.reject('O CNPJ informado é inválido.')
				});

				response.on('end', () => {
					res = JSON.parse(res);

					if (res.status === 'OK')
						return {
							situacao: res.situacao,
							atividade_principal: res.atividade_principal[0].text,
							natureza_juridica: res.natureza_juridica,
							abertura: res.abertura,
							nome: res.nome,
							fantasia: res.fantasia,
							logradouro: res.logradouro,
							numero: res.numero,
							bairro: res.bairro,
							municipio: res.municipio,
							uf: res.uf
						}
						else
							Promise.reject('O CNPJ informado é inválido.')
					});
			});
	}
}