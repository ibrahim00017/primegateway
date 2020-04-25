package com.mpd.prime.web.rest;

import com.mpd.prime.domain.Sedentarisation;
import com.mpd.prime.repository.SedentarisationRepository;
import com.mpd.prime.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mpd.prime.domain.Sedentarisation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SedentarisationResource {

    private final Logger log = LoggerFactory.getLogger(SedentarisationResource.class);

    private final SedentarisationRepository sedentarisationRepository;

    public SedentarisationResource(SedentarisationRepository sedentarisationRepository) {
        this.sedentarisationRepository = sedentarisationRepository;
    }

    /**
     * {@code GET  /sedentarisations} : get all the sedentarisations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sedentarisations in body.
     */
    @GetMapping("/sedentarisations")
    public ResponseEntity<List<Sedentarisation>> getAllSedentarisations(Pageable pageable) {
        log.debug("REST request to get a page of Sedentarisations");
        Page<Sedentarisation> page = sedentarisationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sedentarisations/:id} : get the "id" sedentarisation.
     *
     * @param id the id of the sedentarisation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sedentarisation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sedentarisations/{id}")
    public ResponseEntity<Sedentarisation> getSedentarisation(@PathVariable Long id) {
        log.debug("REST request to get Sedentarisation : {}", id);
        Optional<Sedentarisation> sedentarisation = sedentarisationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sedentarisation);
    }
}
