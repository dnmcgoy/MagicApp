package com.lbd.android.magic;

import java.util.ArrayList;
import java.util.List;

import org.xmlpull.v1.XmlPullParser;

public class CardHandler implements PullHandler {
	
	List<Card> cards = new ArrayList<Card>();
	List<ValueParser> parsers = new ArrayList<ValueParser>();

	NameParser nameParser;
	CMCParser cmcParser;
	CCParser ccParser;
	MtgIDParser mtgIDParser;
	TypeParser typeParser;
	SubTypeParser subTypeParser;

	public CardHandler() {
		resetParsers();
	}
	
	public boolean handleEvent(int eventType, XmlPullParser parser) {
		boolean allTrue = true;
		for (ValueParser vp : parsers) {
			boolean result = vp.handleEvent(eventType, parser);
			if (!result)
				allTrue = false;
		}
		if (allTrue) {
			Card card = new Card();
			card.name = nameParser.getValue();
			card.cmc = Integer.parseInt(cmcParser.getValue());
			card.cc = ccParser.getValue();
			card.mtgID = mtgIDParser.getValue();
			card.type = typeParser.getValue();
			card.subtype = subTypeParser.getValue();
			cards.add(card);
			nameParser = new NameParser();
			resetParsers();
		}
		return false;
	}

	private void resetParsers() {
		nameParser = new NameParser();
		cmcParser = new CMCParser();
		ccParser = new CCParser();
		mtgIDParser = new MtgIDParser();
		typeParser = new TypeParser();
		subTypeParser = new SubTypeParser();
		
		parsers.clear();
		parsers.add(nameParser);
		parsers.add(cmcParser);
		parsers.add(ccParser);
		parsers.add(mtgIDParser);
		parsers.add(typeParser);
		parsers.add(subTypeParser);
	}

	public List<Card> getCards() {
		return cards;
	}

}
