package com.mpd.prime.repository;

import com.mpd.prime.domain.Impulsion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Impulsion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImpulsionRepository extends JpaRepository<Impulsion, Long> {

}
