package com.lbd.android.magic.parser;

import org.xmlpull.v1.XmlPullParser;

public class TagMatcher implements XmlMatcher {

	int eventType;
	String tag;

	public TagMatcher(int eventType, String tag) {
		this.eventType = eventType;
		this.tag = tag;
	}

	public String match(int matchType, XmlPullParser parser) {
		if (matchType == eventType) {
			String parsedTag = parser.getName();
			if (parsedTag.equals(tag)) {
				return parsedTag;
			}
		}
		return null;
	}

}
