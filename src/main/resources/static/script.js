document.addEventListener("DOMContentLoaded", function() {
	listarProduto();
});

function excluirProduto(id) {
	if (confirm('Tem certeza que deseja excluir este produto?')) {
		fetch(`http://localhost:8080/api/produtos/${id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Erro na requisição: ${response.status}`);
				}
				return response.json();
			})
			.then(() => {
				alert('Produto excluído com sucesso!');
				listarProduto();
			})
			.catch(error => {
				console.error('Erro na requisição:', error.message);
			});
	}
}

function editarProduto(id) {
	fetch(`http://localhost:8080/api/produtos/${id}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erro na requisição: ${response.status}`);
			}
			return response.json();
		})
		.then(produto => {
			document.getElementById("editar-nome").value = produto.nomeProduto;
			document.getElementById("editar-descricao").value = produto.descricaoProduto;
			document.getElementById("editar-preco").value = produto.precoProduto;
			document.getElementById("produto-id").value = produto.id;

			$('#editarModal').modal('show');
		})
		.catch(error => {
			console.error('Erro na requisição:', error.message);
		});
}


function exibirProdutos(produtos) {
	const produtosList = document.getElementById("produtos-list");
	produtosList.innerHTML = "";

	if (produtos.length > 0) {
		produtos.forEach(produto => {
			const row = document.createElement("tr");
			row.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nomeProduto}</td>
                <td>${produto.descricaoProduto}</td>
                <td>${produto.precoProduto}</td>
                <td>
                    <button onclick="editarProduto(${produto.id})">Editar</button>
                    <button onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            `;
			produtosList.appendChild(row);
		});
	} else {
		const row = document.createElement("tr");
		row.innerHTML = `
           
        `;
		produtosList.appendChild(row);
	}
}

function limparForm() {
	document.getElementById("nome").value = "";
	document.getElementById("descricao").value = "";
	document.getElementById("preco").value = "";
}

function listarProduto() {
	let produtos;

	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	fetch('http://localhost:8080/api/produtos', options)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erro na requisição: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			produtos = data;
			console.log('Lista de produtos:', produtos);

			exibirProdutos(produtos);
		})
		.catch(error => {
			console.error('Erro na requisição:', error.message);
		});
}

function salvarProduto() {
	const nome = document.getElementById("nome").value;
	const descricao = document.getElementById("descricao").value;
	const preco = document.getElementById("preco").value;

	if (!nome || !descricao || !preco) {
		console.error('Todos os campos devem ser preenchidos.');
		return;
	}

	const produto = {
		nomeProduto: nome,
		descricaoProduto: descricao,
		precoProduto: preco
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(produto),
	};

	fetch('http://localhost:8080/api/produtos', options)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erro na requisição: ${response.status}`);
			}
		})
		.then(() => {
			listarProduto();
			limparForm();
		})
		.catch(error => {
			console.error('Erro na requisição:', error.message);
		});
}

function salvarEdicao() {
	const id = document.getElementById("produto-id").value;
	const nome = document.getElementById("editar-nome").value;
	const descricao = document.getElementById("editar-descricao").value;
	const preco = document.getElementById("editar-preco").value;

	if (!id || !nome || !descricao || !preco) {
		console.error('Todos os campos devem ser preenchidos.');
		return;
	}

	const produto = {
		nomeProduto: nome,
		descricaoProduto: descricao,
		precoProduto: preco
	};

	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(produto),
	};

	fetch(`http://localhost:8080/api/produtos/${id}`, options)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erro na requisição: ${response.status}`);
			}
		})
		.then(() => {
			listarProduto();
			limparFormEdicao();
		})
		.catch(error => {
			console.error('Erro na requisição:', error.message);
		});
}

function limparFormEdicao() {
	document.getElementById("editar-nome").value = "";
	document.getElementById("editar-descricao").value = "";
	document.getElementById("editar-preco").value = "";
	document.getElementById("produto-id").value = "";
}
