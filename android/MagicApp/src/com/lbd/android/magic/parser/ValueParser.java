package com.lbd.android.magic.parser;

import java.util.ArrayList;

import org.xmlpull.v1.XmlPullParser;

public abstract class ValueParser {

	String value = "";
	XmlMatcher currentMatcher;
	ArrayList<XmlMatcher> matchers = new ArrayList<XmlMatcher>();

	public boolean handleEvent(int eventType, XmlPullParser parser) {
		if (matchers.size() == 0 && currentMatcher == null)
			return true;
		else if (currentMatcher == null)
			currentMatcher = matchers.remove(0);
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
