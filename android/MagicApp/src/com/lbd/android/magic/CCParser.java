package com.lbd.android.magic;

import java.util.ArrayList;

import org.xmlpull.v1.XmlPullParser;

public class CCParser extends ValueParser {

	public CCParser() {
		matchers = new ArrayList<XmlMatcher>();
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "tr", "class", "cardItem.*"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "td", "class", "middleCol"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "cardTitle"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "manaCost"));
		matchers.add(new AttrRegexMatcher(XmlPullParser.START_TAG, "img", "alt", "(.*)[a-z]*"));
	}

	public boolean handleEvent(int eventType, XmlPullParser parser) {
		if (matchers.size() == 0 && currentMatcher == null)
			return true;
		else if (currentMatcher == null)
			currentMatcher = matchers.remove(0);
		
		if (matchers.size() == 0) {
			// special case, since the last matcher isn't intended to only capture a single item
			currentMatcher = null;
		} else {
			String result = currentMatcher.match(eventType, parser);
			if (result != null)
				currentMatcher = null;
		}
		return false;
	}
	
	public String translateAltText(String text) {
		return text;
	}
}
