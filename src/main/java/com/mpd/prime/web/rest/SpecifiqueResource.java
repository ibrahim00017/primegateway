package com.mpd.prime.web.rest;

import com.mpd.prime.domain.Specifique;
import com.mpd.prime.repository.SpecifiqueRepository;
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
 * REST controller for managing {@link com.mpd.prime.domain.Specifique}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SpecifiqueResource {

    private final Logger log = LoggerFactory.getLogger(SpecifiqueResource.class);

    private final SpecifiqueRepository specifiqueRepository;

    public SpecifiqueResource(SpecifiqueRepository specifiqueRepository) {
        this.specifiqueRepository = specifiqueRepository;
    }

    /**
     * {@code GET  /specifiques} : get all the specifiques.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of specifiques in body.
     */
    @GetMapping("/specifiques")
    public ResponseEntity<List<Specifique>> getAllSpecifiques(Pageable pageable) {
        log.debug("REST request to get a page of Specifiques");
        Page<Specifique> page = specifiqueRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /specifiques/:id} : get the "id" specifique.
     *
     * @param id the id of the specifique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the specifique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/specifiques/{id}")
    public ResponseEntity<Specifique> getSpecifique(@PathVariable Long id) {
        log.debug("REST request to get Specifique : {}", id);
        Optional<Specifique> specifique = specifiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(specifique);
    }
}
