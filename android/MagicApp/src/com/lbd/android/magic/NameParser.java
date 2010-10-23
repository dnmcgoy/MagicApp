package com.lbd.android.magic;

import java.util.ArrayList;

import org.xmlpull.v1.XmlPullParser;

public class NameParser implements ValueParser {

	String value = "";
	XmlMatcher currentMatcher;
	ArrayList<XmlMatcher> matchers;
	
	public NameParser() {
		matchers = new ArrayList<XmlMatcher>();
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "tr", "class", "cardItem.*"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "td", "class", "middleCol"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "cardTitle"));
		matchers.add(new TagMatcher(XmlPullParser.START_TAG, "a"));
		matchers.add(new TextMatcher());
	}

	public boolean handleEvent(int eventType, XmlPullParser parser) {
		if (currentMatcher == null) {
			currentMatcher = matchers.remove(0);
		}
		String result = currentMatcher.match(eventType, parser);
		if (result != null) {
			currentMatcher = null;
			if (matchers.size() == 0) {
				value = result.trim();
				return true;
			}
		}
		return false;
	}
	
	public String getValue() {
		return value;
	}
}
