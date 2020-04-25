package com.mpd.prime.service;

import com.mpd.prime.domain.Impulsion;
import com.mpd.prime.repository.ImpulsionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Impulsion}.
 */
@Service
@Transactional
public class ImpulsionService {

    private final Logger log = LoggerFactory.getLogger(ImpulsionService.class);

    private final ImpulsionRepository impulsionRepository;

    public ImpulsionService(ImpulsionRepository impulsionRepository) {
        this.impulsionRepository = impulsionRepository;
    }

    /**
     * Save a impulsion.
     *
     * @param impulsion the entity to save.
     * @return the persisted entity.
     */
    public Impulsion save(Impulsion impulsion) {
        log.debug("Request to save Impulsion : {}", impulsion);
        return impulsionRepository.save(impulsion);
    }

    /**
     * Get all the impulsions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Impulsion> findAll(Pageable pageable) {
        log.debug("Request to get all Impulsions");
        return impulsionRepository.findAll(pageable);
    }

    /**
     * Get one impulsion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Impulsion> findOne(Long id) {
        log.debug("Request to get Impulsion : {}", id);
        return impulsionRepository.findById(id);
    }

    /**
     * Delete the impulsion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Impulsion : {}", id);
        impulsionRepository.deleteById(id);
    }
}
