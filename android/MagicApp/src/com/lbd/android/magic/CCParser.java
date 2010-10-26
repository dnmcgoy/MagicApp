package com.lbd.android.magic;

import java.util.ArrayList;

import org.xmlpull.v1.XmlPullParser;

public class CCParser extends ValueParser {
	
	private static final String SYM_START = "<symbol>";
	private static final String SYM_END = "</symbol>";
	StringBuilder ccBuilder = new StringBuilder();

	public CCParser() {
		matchers = new ArrayList<XmlMatcher>();
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "tr", "class", "cardItem.*"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "td", "class", "middleCol"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "cardTitle"));
		matchers.add(new AttributeMatcher(XmlPullParser.START_TAG, "span", "class", "manaCost"));
		matchers.add(new AttrRegexMatcher(XmlPullParser.START_TAG, "img", "alt", "(.*)"));
	}

	@Override
	public boolean handleEvent(int eventType, XmlPullParser parser) {
		if (matchers.size() == 0 && currentMatcher == null) {
			return true;
		} else if (currentMatcher == null) {
			currentMatcher = matchers.remove(0);
		}
		if (eventType != XmlPullParser.START_TAG)
			return false;

		String result = currentMatcher.match(eventType, parser);
		if (matchers.size() == 0) {
			// special case, since the last matcher isn't intended to only capture a single item
			if (result != null) {
				ccBuilder.append(SYM_START);
				ccBuilder.append(result);
				ccBuilder.append(SYM_END);
			} else {
				value = ccBuilder.toString();
				currentMatcher = null;
				return true;
			}
		} else {
			if (result != null)
				currentMatcher = null;
		}
		return false;
	}
}
