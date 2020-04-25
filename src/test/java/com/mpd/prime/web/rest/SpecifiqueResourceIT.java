package com.mpd.prime.web.rest;

import com.mpd.prime.PrimegatewayApp;
import com.mpd.prime.domain.Specifique;
import com.mpd.prime.repository.SpecifiqueRepository;
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
 * Integration tests for the {@link SpecifiqueResource} REST controller.
 */
@SpringBootTest(classes = PrimegatewayApp.class)
public class SpecifiqueResourceIT {

    private static final Integer DEFAULT_MATRICULE = 1;
    private static final Integer UPDATED_MATRICULE = 2;

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOMS = "AAAAAAAAAA";
    private static final String UPDATED_PRENOMS = "BBBBBBBBBB";

    private static final Integer DEFAULT_NOMBRE_DE_JOURS = 180;
    private static final Integer UPDATED_NOMBRE_DE_JOURS = 179;

    private static final Float DEFAULT_TAUX = 1F;
    private static final Float UPDATED_TAUX = 2F;

    private static final Float DEFAULT_MONTANT = 1F;
    private static final Float UPDATED_MONTANT = 2F;

    private static final LocalDate DEFAULT_DATE_PRISE_SERVICE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_PRISE_SERVICE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SpecifiqueRepository specifiqueRepository;

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

    private MockMvc restSpecifiqueMockMvc;

    private Specifique specifique;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpecifiqueResource specifiqueResource = new SpecifiqueResource(specifiqueRepository);
        this.restSpecifiqueMockMvc = MockMvcBuilders.standaloneSetup(specifiqueResource)
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
    public static Specifique createEntity(EntityManager em) {
        Specifique specifique = new Specifique()
            .matricule(DEFAULT_MATRICULE)
            .nom(DEFAULT_NOM)
            .prenoms(DEFAULT_PRENOMS)
            .nombreDeJours(DEFAULT_NOMBRE_DE_JOURS)
            .taux(DEFAULT_TAUX)
            .montant(DEFAULT_MONTANT)
            .datePriseService(DEFAULT_DATE_PRISE_SERVICE);
        return specifique;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Specifique createUpdatedEntity(EntityManager em) {
        Specifique specifique = new Specifique()
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .prenoms(UPDATED_PRENOMS)
            .nombreDeJours(UPDATED_NOMBRE_DE_JOURS)
            .taux(UPDATED_TAUX)
            .montant(UPDATED_MONTANT)
            .datePriseService(UPDATED_DATE_PRISE_SERVICE);
        return specifique;
    }

    @BeforeEach
    public void initTest() {
        specifique = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllSpecifiques() throws Exception {
        // Initialize the database
        specifiqueRepository.saveAndFlush(specifique);

        // Get all the specifiqueList
        restSpecifiqueMockMvc.perform(get("/api/specifiques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(specifique.getId().intValue())))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenoms").value(hasItem(DEFAULT_PRENOMS)))
            .andExpect(jsonPath("$.[*].nombreDeJours").value(hasItem(DEFAULT_NOMBRE_DE_JOURS)))
            .andExpect(jsonPath("$.[*].taux").value(hasItem(DEFAULT_TAUX.doubleValue())))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.doubleValue())))
            .andExpect(jsonPath("$.[*].datePriseService").value(hasItem(DEFAULT_DATE_PRISE_SERVICE.toString())));
    }
    
    @Test
    @Transactional
    public void getSpecifique() throws Exception {
        // Initialize the database
        specifiqueRepository.saveAndFlush(specifique);

        // Get the specifique
        restSpecifiqueMockMvc.perform(get("/api/specifiques/{id}", specifique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(specifique.getId().intValue()))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenoms").value(DEFAULT_PRENOMS))
            .andExpect(jsonPath("$.nombreDeJours").value(DEFAULT_NOMBRE_DE_JOURS))
            .andExpect(jsonPath("$.taux").value(DEFAULT_TAUX.doubleValue()))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT.doubleValue()))
            .andExpect(jsonPath("$.datePriseService").value(DEFAULT_DATE_PRISE_SERVICE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSpecifique() throws Exception {
        // Get the specifique
        restSpecifiqueMockMvc.perform(get("/api/specifiques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }
}
