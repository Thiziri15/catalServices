package com.thiziri.catservices;

import com.thiziri.catservices.dao.ProduitRepository;
import com.thiziri.catservices.entities.Produit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class CatServicesApplication implements CommandLineRunner {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private RepositoryRestConfiguration restConfiguration;

    public static void main(String[] args) {

        SpringApplication.run(CatServicesApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        restConfiguration.exposeIdsFor(Produit.class);
        produitRepository.save(new Produit(null,"Ordinateur Lx 45",6700,3));
        produitRepository.save(new Produit(null,"Imprimente HP",1700,3));
        produitRepository.save(new Produit(null,"Smart phone Sumsung",8000,13));


        produitRepository.findAll().forEach(p -> {
            System.out.println(p.toString());
        });

    }
}
