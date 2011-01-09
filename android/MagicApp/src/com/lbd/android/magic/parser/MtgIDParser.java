package com.lbd.android.magic.parser;

import java.util.ArrayList;

import org.xmlpull.v1.XmlPullParser;

public class MtgIDParser extends ValueParser {

	public MtgIDParser() {
		matchers = new ArrayList<XmlMatcher>();
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "tr", "class", "cardItem.*"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "td", "class", "middleCol"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "cardTitle"));
		matchers.add(new AttrRegexMatcher(XmlPullParser.START_TAG, "a", "href", ".*multiverseid=(\\d+)"));
	}
}
