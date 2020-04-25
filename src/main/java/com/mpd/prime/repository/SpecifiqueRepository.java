package com.mpd.prime.repository;

import com.mpd.prime.domain.Specifique;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Specifique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpecifiqueRepository extends JpaRepository<Specifique, Long> {

}
