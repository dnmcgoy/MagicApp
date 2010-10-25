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

	@Test
	public void shouldParseCardName() throws Exception {
		GathererParser gp = new GathererParser(new FileInputStream(new File("assets/card.xml")));
		List<Card> cards = gp.parse();
		Card card = cards.get(0);
		assertEquals(card.name, "Omnath, Locus of Mana");
	}

	@Test
	public void shouldParseCardMtgID() throws Exception {
		GathererParser gp = new GathererParser(new FileInputStream(new File("assets/card.xml")));
		List<Card> cards = gp.parse();
		Card card = cards.get(0);
		assertEquals("197759", card.mtgID);
	}

	@Test
	public void shouldParseCardConvertedManaCost() throws Exception {
		GathererParser gp = new GathererParser(new FileInputStream(new File("assets/card.xml")));
		List<Card> cards = gp.parse();
		Card card = cards.get(0);
		assertEquals(card.cmc, 3);
	}

	@Test
	public void shouldParseCardCastingCost() throws Exception {
		GathererParser gp = new GathererParser(new FileInputStream(new File("assets/card.xml")));
		List<Card> cards = gp.parse();
		Card card = cards.get(0);
		assertEquals("2G", card.cc);
	}
}
