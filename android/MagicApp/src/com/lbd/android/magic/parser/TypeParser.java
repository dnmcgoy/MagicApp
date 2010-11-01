package com.lbd.android.magic.parser;

import org.xmlpull.v1.XmlPullParser;

public class TypeParser extends ValueParser {
	
	String split = "[-—\n]";

	public TypeParser() {
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "tr", "class", "cardItem.*"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "td", "class", "middleCol"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "typeLine"));
		matchers.add(new TextMatcher());
	}

	@Override
	public String getValue() {
		String[] tokens = value.split(split);
		return tokens[0].trim();
	}
}
