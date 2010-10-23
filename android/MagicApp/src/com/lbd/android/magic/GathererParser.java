package com.lbd.android.magic;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.kxml2.io.KXmlParser;
import org.xmlpull.v1.XmlPullParser;

import android.util.Log;

public class GathererParser {

	static final String NS = "http://www.w3.org/1999/xhtml";
	// names of the XML tags
	static final String CHANNEL = "channel";
	static final String PUB_DATE = "pubDate";
	
	public final InputStream gathererInputStream;

	public GathererParser(InputStream is){
		gathererInputStream = is;
	}

	public List<Card> parse() throws Exception {

		List<Card> cards = new ArrayList<Card>();
		XmlPullParser parser = new KXmlParser(); // Xml.newPullParser();

		parser.setFeature("http://xmlpull.org/v1/doc/features.html#relaxed", true);
		parser.setInput(this.gathererInputStream, null);
		parser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
		int eventType = parser.getEventType();
		CardHandler cardHandler = new CardHandler();
		List<PullHandler> handlers = new ArrayList<PullHandler>();
		handlers.add(cardHandler);

		while (eventType != XmlPullParser.END_DOCUMENT){
			for (PullHandler handler : handlers) {
				handler.handleEvent(eventType, parser);
			}
			eventType = parser.next();
		}
		return cardHandler.getCards();
	}
}
