package com.lbd.android.magic;

import org.xmlpull.v1.XmlPullParser;

public class TextMatcher implements XmlMatcher {

	public String match(int eventType, XmlPullParser parser) {
		if (eventType == XmlPullParser.TEXT) {
			return parser.getText();
		}
		return null;
	}

}
