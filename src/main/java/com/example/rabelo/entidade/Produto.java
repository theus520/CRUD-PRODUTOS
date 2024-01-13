package com.example.rabelo.entidade;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tb_produtos")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome_do_produto")
	private String nomeProduto;

	@Column(name = "descricao_do_produto")
	private String descricaoProduto;

	@Column(name = "preco_do_produto")
	private BigDecimal precoProduto;

	
}
