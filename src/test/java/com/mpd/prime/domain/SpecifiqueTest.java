package com.mpd.prime.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mpd.prime.web.rest.TestUtil;

public class SpecifiqueTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Specifique.class);
        Specifique specifique1 = new Specifique();
        specifique1.setId(1L);
        Specifique specifique2 = new Specifique();
        specifique2.setId(specifique1.getId());
        assertThat(specifique1).isEqualTo(specifique2);
        specifique2.setId(2L);
        assertThat(specifique1).isNotEqualTo(specifique2);
        specifique1.setId(null);
        assertThat(specifique1).isNotEqualTo(specifique2);
    }
}
