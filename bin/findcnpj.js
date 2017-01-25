const axios = require('axios');

class FindCnpj {

	validateCnpj(cnpj) {
		const CnpjValue = cnpj.replace(/\D/g, '');

		if (CnpjValue.length === 14) {
			return true;
		}

		return false;
	}

	find(cnpj) {
		if (this.validateCnpj(cnpj))
			return this.receitaWs(cnpj);
		
		return Promise.reject('O CNPJ informado é inválido.');
	}

	receitaWs(cnpj) {
		const CnpjValue = cnpj.replace(/\D/g, '');

		return axios
			.get(`https://www.receitaws.com.br/v1/cnpj/${CnpjValue}`)
			.then(this.handleSuccess.bind(this))
			.catch(error => console.log(error));
	}

	handleSuccess(response) {
		if (response.data.status === 'ERROR') {
			return Promise.reject('O CNPJ informado é inválido.');
		}

		let data = response.data;

		return {
			situacao: data.situacao,
			atividade_principal: data.atividade_principal[0].text,
			natureza_juridica: data.natureza_juridica,
			abertura: data.abertura,
			nome: data.nome,
			fantasia: data.fantasia,
			logradouro: data.logradouro,
			numero: data.numero,
			bairro: data.bairro,
			cep: data.cep,
			municipio: data.municipio,
			uf: data.uf
		}	
	}
}

module.exports = FindCnpj;