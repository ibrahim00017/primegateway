package com.mpd.prime.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Specifique.
 */
@Entity
@Table(name = "specifique")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Specifique implements Serializable {

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

    @Max(value = 180)
    @Column(name = "nombre_de_jours")
    private Integer nombreDeJours;

    @Column(name = "taux")
    private Float taux;

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

    public Specifique matricule(Integer matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(Integer matricule) {
        this.matricule = matricule;
    }

    public String getNom() {
        return nom;
    }

    public Specifique nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenoms() {
        return prenoms;
    }

    public Specifique prenoms(String prenoms) {
        this.prenoms = prenoms;
        return this;
    }

    public void setPrenoms(String prenoms) {
        this.prenoms = prenoms;
    }

    public Integer getNombreDeJours() {
        return nombreDeJours;
    }

    public Specifique nombreDeJours(Integer nombreDeJours) {
        this.nombreDeJours = nombreDeJours;
        return this;
    }

    public void setNombreDeJours(Integer nombreDeJours) {
        this.nombreDeJours = nombreDeJours;
    }

    public Float getTaux() {
        return taux;
    }

    public Specifique taux(Float taux) {
        this.taux = taux;
        return this;
    }

    public void setTaux(Float taux) {
        this.taux = taux;
    }

    public Float getMontant() {
        return montant;
    }

    public Specifique montant(Float montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Float montant) {
        this.montant = montant;
    }

    public LocalDate getDatePriseService() {
        return datePriseService;
    }

    public Specifique datePriseService(LocalDate datePriseService) {
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
        if (!(o instanceof Specifique)) {
            return false;
        }
        return id != null && id.equals(((Specifique) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Specifique{" +
            "id=" + getId() +
            ", matricule=" + getMatricule() +
            ", nom='" + getNom() + "'" +
            ", prenoms='" + getPrenoms() + "'" +
            ", nombreDeJours=" + getNombreDeJours() +
            ", taux=" + getTaux() +
            ", montant=" + getMontant() +
            ", datePriseService='" + getDatePriseService() + "'" +
            "}";
    }
}
