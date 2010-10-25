package com.lbd.android.magic;

import java.util.ArrayList;

import org.xmlpull.v1.XmlPullParser;

public class CMCParser extends ValueParser {

	public CMCParser() {
		value = "0";
		matchers = new ArrayList<XmlMatcher>();
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "tr", "class", "cardItem.*"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "td", "class", "middleCol"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "cardTitle"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "convertedManaCost"));
		matchers.add(new TextMatcher());
	}
}
