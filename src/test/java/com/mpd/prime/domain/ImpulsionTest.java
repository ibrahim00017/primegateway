package com.mpd.prime.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mpd.prime.web.rest.TestUtil;

public class ImpulsionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Impulsion.class);
        Impulsion impulsion1 = new Impulsion();
        impulsion1.setId(1L);
        Impulsion impulsion2 = new Impulsion();
        impulsion2.setId(impulsion1.getId());
        assertThat(impulsion1).isEqualTo(impulsion2);
        impulsion2.setId(2L);
        assertThat(impulsion1).isNotEqualTo(impulsion2);
        impulsion1.setId(null);
        assertThat(impulsion1).isNotEqualTo(impulsion2);
    }
}
