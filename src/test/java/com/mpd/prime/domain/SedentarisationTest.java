package com.mpd.prime.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mpd.prime.web.rest.TestUtil;

public class SedentarisationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sedentarisation.class);
        Sedentarisation sedentarisation1 = new Sedentarisation();
        sedentarisation1.setId(1L);
        Sedentarisation sedentarisation2 = new Sedentarisation();
        sedentarisation2.setId(sedentarisation1.getId());
        assertThat(sedentarisation1).isEqualTo(sedentarisation2);
        sedentarisation2.setId(2L);
        assertThat(sedentarisation1).isNotEqualTo(sedentarisation2);
        sedentarisation1.setId(null);
        assertThat(sedentarisation1).isNotEqualTo(sedentarisation2);
    }
}
