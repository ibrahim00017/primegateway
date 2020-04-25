package com.mpd.prime.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Sedentarisation.
 */
@Entity
@Table(name = "sedentarisation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Sedentarisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "matricule", nullable = false, unique = true)
    private Integer matricule;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenoms")
    private String prenoms;

    @Max(value = 90)
    @Column(name = "nombre_de_jours")
    private Integer nombreDeJours;

    @Column(name = "montant")
    private Float montant;

    @Column(name = "prise_service")
    private LocalDate priseService;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMatricule() {
        return matricule;
    }

    public Sedentarisation matricule(Integer matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(Integer matricule) {
        this.matricule = matricule;
    }

    public String getNom() {
        return nom;
    }

    public Sedentarisation nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenoms() {
        return prenoms;
    }

    public Sedentarisation prenoms(String prenoms) {
        this.prenoms = prenoms;
        return this;
    }

    public void setPrenoms(String prenoms) {
        this.prenoms = prenoms;
    }

    public Integer getNombreDeJours() {
        return nombreDeJours;
    }

    public Sedentarisation nombreDeJours(Integer nombreDeJours) {
        this.nombreDeJours = nombreDeJours;
        return this;
    }

    public void setNombreDeJours(Integer nombreDeJours) {
        this.nombreDeJours = nombreDeJours;
    }

    public Float getMontant() {
        return montant;
    }

    public Sedentarisation montant(Float montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Float montant) {
        this.montant = montant;
    }

    public LocalDate getPriseService() {
        return priseService;
    }

    public Sedentarisation priseService(LocalDate priseService) {
        this.priseService = priseService;
        return this;
    }

    public void setPriseService(LocalDate priseService) {
        this.priseService = priseService;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sedentarisation)) {
            return false;
        }
        return id != null && id.equals(((Sedentarisation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Sedentarisation{" +
            "id=" + getId() +
            ", matricule=" + getMatricule() +
            ", nom='" + getNom() + "'" +
            ", prenoms='" + getPrenoms() + "'" +
            ", nombreDeJours=" + getNombreDeJours() +
            ", montant=" + getMontant() +
            ", priseService='" + getPriseService() + "'" +
            "}";
    }
}
