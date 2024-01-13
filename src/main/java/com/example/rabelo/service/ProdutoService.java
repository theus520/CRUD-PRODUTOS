package com.example.rabelo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.rabelo.entidade.Produto;
import com.example.rabelo.repository.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	public List<Produto> getAllProdutos(){
		return produtoRepository.findAll();
	}
	
	public Produto getProdutoById(Long id) {
		return produtoRepository.findById(id).orElse(null);
	}
	public Produto saveProduto(Produto produto) {
		return produtoRepository.save(produto);
	}
	
	public void deleteProduto(Long id) {
		produtoRepository.deleteById(id);
	}
}
