package com.example.rabelo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rabelo.entidade.Produto;
import com.example.rabelo.exception.ProdutoNaoEncontradoException;
import com.example.rabelo.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
 
	@Autowired
	private ProdutoService produtoService;
	
	@GetMapping
	public List<Produto> getAllProdutos(){
		return produtoService.getAllProdutos();
	}
	
	@GetMapping("/{id}")
	public Produto getProdutoById(@PathVariable Long id) {
		return produtoService.getProdutoById(id);
	}
	
	@PostMapping
	public Produto saveProduto(@RequestBody Produto produto) {
		return produtoService.saveProduto(produto);
	}
	
	@PutMapping("/{id}")
	public Produto updateProduto(@PathVariable Long id, @RequestBody Produto produto) {
		Produto existingProduto = produtoService.getProdutoById(id);
		
		if (existingProduto != null) {
			existingProduto.setNomeProduto(produto.getNomeProduto());
			existingProduto.setDescricaoProduto(produto.getDescricaoProduto());
			existingProduto.setPrecoProduto(produto.getPrecoProduto());
			return produtoService.saveProduto(existingProduto);
		}else {
	        throw new ProdutoNaoEncontradoException("Produto não encontrado para o ID: " + id);
		}
	}
	@DeleteMapping("/{id}")
	public void deleteProduto(@PathVariable Long id) {
		produtoService.deleteProduto(id);
		
	}
	
}
