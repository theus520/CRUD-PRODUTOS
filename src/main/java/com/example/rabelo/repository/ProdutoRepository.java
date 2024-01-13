package com.example.rabelo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rabelo.entidade.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{

}
