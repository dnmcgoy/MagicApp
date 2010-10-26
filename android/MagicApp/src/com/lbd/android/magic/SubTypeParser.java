package com.lbd.android.magic;

import org.xmlpull.v1.XmlPullParser;

public class SubTypeParser extends ValueParser {

	String split = "[-—\n]";

	public SubTypeParser() {
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "tr", "class", "cardItem.*"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "td", "class", "middleCol"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "typeLine"));
		matchers.add(new TextMatcher());
	}

	@Override
	public String getValue() {
		String[] tokens = value.split(split);
		if (tokens.length > 1) {
			return tokens[1].trim();
		} else {
			return "";
		}
	}

}
