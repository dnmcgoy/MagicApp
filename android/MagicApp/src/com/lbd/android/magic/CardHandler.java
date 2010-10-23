package com.lbd.android.magic;

import java.util.ArrayList;
import java.util.List;

import org.xmlpull.v1.XmlPullParser;

public class CardHandler implements PullHandler {
	
	List<Card> cards = new ArrayList<Card>();
	NameParser nameParser = new NameParser();

	public boolean handleEvent(int eventType, XmlPullParser parser) {
		if (nameParser.handleEvent(eventType, parser)) {
			Card card = new Card();
			card.name = nameParser.getValue();
			cards.add(card);
			nameParser = new NameParser();
		}
		
		return false;
	}

	public List<Card> getCards() {
		return cards;
	}

}
