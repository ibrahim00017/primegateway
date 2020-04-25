package com.mpd.prime.web.rest;

import com.mpd.prime.domain.Impulsion;
import com.mpd.prime.service.ImpulsionService;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mpd.prime.domain.Impulsion}.
 */
@RestController
@RequestMapping("/api")
public class ImpulsionResource {

    private final Logger log = LoggerFactory.getLogger(ImpulsionResource.class);

    private final ImpulsionService impulsionService;

    public ImpulsionResource(ImpulsionService impulsionService) {
        this.impulsionService = impulsionService;
    }

    /**
     * {@code GET  /impulsions} : get all the impulsions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of impulsions in body.
     */
    @GetMapping("/impulsions")
    public ResponseEntity<List<Impulsion>> getAllImpulsions(Pageable pageable) {
        log.debug("REST request to get a page of Impulsions");
        Page<Impulsion> page = impulsionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /impulsions/:id} : get the "id" impulsion.
     *
     * @param id the id of the impulsion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the impulsion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/impulsions/{id}")
    public ResponseEntity<Impulsion> getImpulsion(@PathVariable Long id) {
        log.debug("REST request to get Impulsion : {}", id);
        Optional<Impulsion> impulsion = impulsionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(impulsion);
    }
}
