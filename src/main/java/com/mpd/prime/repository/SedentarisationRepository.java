package com.mpd.prime.repository;

import com.mpd.prime.domain.Sedentarisation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Sedentarisation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SedentarisationRepository extends JpaRepository<Sedentarisation, Long> {

}
