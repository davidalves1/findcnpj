const axios = require('axios');

class FindCnpj {

	validateCnpj(cnpj) {
		const CnpjValue = cnpj.replace(/\D/g, '');

		if (cnpj.length === 14) {
			return true;
		}

		return false;
	}

	find(cnpj) {
		if (this.validateCnpj(cnpj))
			return this.receitaWs(cnpj);
		
		return Promise.reject(false);
	}

	receitaWs(cnpj) {
		return axios
			.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
			.then(response => this.handleSuccess(response.data))
			.catch(this.handleError);
	}

	handleSuccess(response) {
		return {
			situacao: response.situacao,
			atividade_principal: response.atividade_principal[0].text,
			natureza_juridica: response.natureza_juridica,
			abertura: response.abertura,
			nome: response.nome,
			fantasia: response.fantasia,
			logradouro: response.logradouro,
			numero: response.numero,
			bairro: response.bairro,
			municipio: response.municipio,
			uf: response.uf
		}	
	}

	handleError() {
		return Promise.reject('O CNPJ informado é inválido.');
	}
}

module.exports = FindCnpj;