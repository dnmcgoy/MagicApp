package com.lbd.android.magic.parser;

import org.xmlpull.v1.XmlPullParser;

public class NameParser extends ValueParser {
	
	public NameParser() {
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "tr", "class", "cardItem.*"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "td", "class", "middleCol"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "cardTitle"));
		matchers.add(new TagMatcher(XmlPullParser.START_TAG, "a"));
		matchers.add(new TextMatcher());
	}
}
