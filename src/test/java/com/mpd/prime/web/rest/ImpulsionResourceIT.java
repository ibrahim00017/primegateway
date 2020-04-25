package com.mpd.prime.web.rest;

import com.mpd.prime.PrimegatewayApp;
import com.mpd.prime.domain.Impulsion;
import com.mpd.prime.repository.ImpulsionRepository;
import com.mpd.prime.service.ImpulsionService;
import com.mpd.prime.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mpd.prime.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ImpulsionResource} REST controller.
 */
@SpringBootTest(classes = PrimegatewayApp.class)
public class ImpulsionResourceIT {

    private static final Integer DEFAULT_MATRICULE = 1;
    private static final Integer UPDATED_MATRICULE = 2;

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOMS = "AAAAAAAAAA";
    private static final String UPDATED_PRENOMS = "BBBBBBBBBB";

    private static final Integer DEFAULT_NOMBRE_DE_JOUR = 90;
    private static final Integer UPDATED_NOMBRE_DE_JOUR = 89;

    private static final Float DEFAULT_MONTANT = 1F;
    private static final Float UPDATED_MONTANT = 2F;

    private static final LocalDate DEFAULT_DATE_PRISE_SERVICE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_PRISE_SERVICE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ImpulsionRepository impulsionRepository;

    @Autowired
    private ImpulsionService impulsionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restImpulsionMockMvc;

    private Impulsion impulsion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImpulsionResource impulsionResource = new ImpulsionResource(impulsionService);
        this.restImpulsionMockMvc = MockMvcBuilders.standaloneSetup(impulsionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Impulsion createEntity(EntityManager em) {
        Impulsion impulsion = new Impulsion()
            .matricule(DEFAULT_MATRICULE)
            .nom(DEFAULT_NOM)
            .prenoms(DEFAULT_PRENOMS)
            .nombreDeJour(DEFAULT_NOMBRE_DE_JOUR)
            .montant(DEFAULT_MONTANT)
            .datePriseService(DEFAULT_DATE_PRISE_SERVICE);
        return impulsion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Impulsion createUpdatedEntity(EntityManager em) {
        Impulsion impulsion = new Impulsion()
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .prenoms(UPDATED_PRENOMS)
            .nombreDeJour(UPDATED_NOMBRE_DE_JOUR)
            .montant(UPDATED_MONTANT)
            .datePriseService(UPDATED_DATE_PRISE_SERVICE);
        return impulsion;
    }

    @BeforeEach
    public void initTest() {
        impulsion = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllImpulsions() throws Exception {
        // Initialize the database
        impulsionRepository.saveAndFlush(impulsion);

        // Get all the impulsionList
        restImpulsionMockMvc.perform(get("/api/impulsions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(impulsion.getId().intValue())))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenoms").value(hasItem(DEFAULT_PRENOMS)))
            .andExpect(jsonPath("$.[*].nombreDeJour").value(hasItem(DEFAULT_NOMBRE_DE_JOUR)))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.doubleValue())))
            .andExpect(jsonPath("$.[*].datePriseService").value(hasItem(DEFAULT_DATE_PRISE_SERVICE.toString())));
    }
    
    @Test
    @Transactional
    public void getImpulsion() throws Exception {
        // Initialize the database
        impulsionRepository.saveAndFlush(impulsion);

        // Get the impulsion
        restImpulsionMockMvc.perform(get("/api/impulsions/{id}", impulsion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(impulsion.getId().intValue()))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenoms").value(DEFAULT_PRENOMS))
            .andExpect(jsonPath("$.nombreDeJour").value(DEFAULT_NOMBRE_DE_JOUR))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT.doubleValue()))
            .andExpect(jsonPath("$.datePriseService").value(DEFAULT_DATE_PRISE_SERVICE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImpulsion() throws Exception {
        // Get the impulsion
        restImpulsionMockMvc.perform(get("/api/impulsions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }
}
