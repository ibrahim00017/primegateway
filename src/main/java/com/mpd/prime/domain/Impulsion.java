package com.mpd.prime.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Impulsion.
 */
@Entity
@Table(name = "impulsion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Impulsion implements Serializable {

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
    @Column(name = "nombre_de_jour")
    private Integer nombreDeJour;

    @Column(name = "montant")
    private Float montant;

    @Column(name = "date_prise_service")
    private LocalDate datePriseService;

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

    public Impulsion matricule(Integer matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(Integer matricule) {
        this.matricule = matricule;
    }

    public String getNom() {
        return nom;
    }

    public Impulsion nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenoms() {
        return prenoms;
    }

    public Impulsion prenoms(String prenoms) {
        this.prenoms = prenoms;
        return this;
    }

    public void setPrenoms(String prenoms) {
        this.prenoms = prenoms;
    }

    public Integer getNombreDeJour() {
        return nombreDeJour;
    }

    public Impulsion nombreDeJour(Integer nombreDeJour) {
        this.nombreDeJour = nombreDeJour;
        return this;
    }

    public void setNombreDeJour(Integer nombreDeJour) {
        this.nombreDeJour = nombreDeJour;
    }

    public Float getMontant() {
        return montant;
    }

    public Impulsion montant(Float montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Float montant) {
        this.montant = montant;
    }

    public LocalDate getDatePriseService() {
        return datePriseService;
    }

    public Impulsion datePriseService(LocalDate datePriseService) {
        this.datePriseService = datePriseService;
        return this;
    }

    public void setDatePriseService(LocalDate datePriseService) {
        this.datePriseService = datePriseService;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Impulsion)) {
            return false;
        }
        return id != null && id.equals(((Impulsion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Impulsion{" +
            "id=" + getId() +
            ", matricule=" + getMatricule() +
            ", nom='" + getNom() + "'" +
            ", prenoms='" + getPrenoms() + "'" +
            ", nombreDeJour=" + getNombreDeJour() +
            ", montant=" + getMontant() +
            ", datePriseService='" + getDatePriseService() + "'" +
            "}";
    }
}
