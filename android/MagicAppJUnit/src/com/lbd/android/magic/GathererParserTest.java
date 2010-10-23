package com.lbd.android.magic;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

import static org.junit.Assert.*;
import org.junit.Test;


public class GathererParserTest {

	@Test
	public void shouldParseCards() throws Exception {
		GathererParser gp = new GathererParser(new FileInputStream(new File("assets/gatherer.html")));
		List<Card> cards = gp.parse();
		assertEquals(10, cards.size());
	}
}
