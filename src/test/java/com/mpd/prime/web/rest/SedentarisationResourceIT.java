package com.mpd.prime.web.rest;

import com.mpd.prime.PrimegatewayApp;
import com.mpd.prime.domain.Sedentarisation;
import com.mpd.prime.repository.SedentarisationRepository;
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
 * Integration tests for the {@link SedentarisationResource} REST controller.
 */
@SpringBootTest(classes = PrimegatewayApp.class)
public class SedentarisationResourceIT {

    private static final Integer DEFAULT_MATRICULE = 1;
    private static final Integer UPDATED_MATRICULE = 2;

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOMS = "AAAAAAAAAA";
    private static final String UPDATED_PRENOMS = "BBBBBBBBBB";

    private static final Integer DEFAULT_NOMBRE_DE_JOURS = 90;
    private static final Integer UPDATED_NOMBRE_DE_JOURS = 89;

    private static final Float DEFAULT_MONTANT = 1F;
    private static final Float UPDATED_MONTANT = 2F;

    private static final LocalDate DEFAULT_PRISE_SERVICE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PRISE_SERVICE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SedentarisationRepository sedentarisationRepository;

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

    private MockMvc restSedentarisationMockMvc;

    private Sedentarisation sedentarisation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SedentarisationResource sedentarisationResource = new SedentarisationResource(sedentarisationRepository);
        this.restSedentarisationMockMvc = MockMvcBuilders.standaloneSetup(sedentarisationResource)
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
    public static Sedentarisation createEntity(EntityManager em) {
        Sedentarisation sedentarisation = new Sedentarisation()
            .matricule(DEFAULT_MATRICULE)
            .nom(DEFAULT_NOM)
            .prenoms(DEFAULT_PRENOMS)
            .nombreDeJours(DEFAULT_NOMBRE_DE_JOURS)
            .montant(DEFAULT_MONTANT)
            .priseService(DEFAULT_PRISE_SERVICE);
        return sedentarisation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sedentarisation createUpdatedEntity(EntityManager em) {
        Sedentarisation sedentarisation = new Sedentarisation()
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .prenoms(UPDATED_PRENOMS)
            .nombreDeJours(UPDATED_NOMBRE_DE_JOURS)
            .montant(UPDATED_MONTANT)
            .priseService(UPDATED_PRISE_SERVICE);
        return sedentarisation;
    }

    @BeforeEach
    public void initTest() {
        sedentarisation = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllSedentarisations() throws Exception {
        // Initialize the database
        sedentarisationRepository.saveAndFlush(sedentarisation);

        // Get all the sedentarisationList
        restSedentarisationMockMvc.perform(get("/api/sedentarisations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sedentarisation.getId().intValue())))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenoms").value(hasItem(DEFAULT_PRENOMS)))
            .andExpect(jsonPath("$.[*].nombreDeJours").value(hasItem(DEFAULT_NOMBRE_DE_JOURS)))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.doubleValue())))
            .andExpect(jsonPath("$.[*].priseService").value(hasItem(DEFAULT_PRISE_SERVICE.toString())));
    }
    
    @Test
    @Transactional
    public void getSedentarisation() throws Exception {
        // Initialize the database
        sedentarisationRepository.saveAndFlush(sedentarisation);

        // Get the sedentarisation
        restSedentarisationMockMvc.perform(get("/api/sedentarisations/{id}", sedentarisation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sedentarisation.getId().intValue()))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenoms").value(DEFAULT_PRENOMS))
            .andExpect(jsonPath("$.nombreDeJours").value(DEFAULT_NOMBRE_DE_JOURS))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT.doubleValue()))
            .andExpect(jsonPath("$.priseService").value(DEFAULT_PRISE_SERVICE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSedentarisation() throws Exception {
        // Get the sedentarisation
        restSedentarisationMockMvc.perform(get("/api/sedentarisations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }
}
