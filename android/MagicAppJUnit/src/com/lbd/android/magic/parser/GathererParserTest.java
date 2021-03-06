package com.lbd.android.magic.parser;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

import static org.junit.Assert.*;
import org.junit.Test;

import com.lbd.android.magic.model.Card;


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
	public void shouldParseCardType() throws Exception {
		GathererParser gp = new GathererParser(new FileInputStream(new File("assets/card.xml")));
		List<Card> cards = gp.parse();
		Card card = cards.get(0);
		assertEquals("Legendary Creature", card.type);
	}

	@Test
	public void shouldParseCardSubType() throws Exception {
		GathererParser gp = new GathererParser(new FileInputStream(new File("assets/card.xml")));
		List<Card> cards = gp.parse();
		Card card = cards.get(0);
		assertEquals("Elemental", card.subtype);
	}

}
