package com.lbd.android.magic;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.xmlpull.v1.XmlPullParser;

public class AttrRegexMatcher implements XmlMatcher {

	int eventType;
	String tag;
	String attributeName;
	String attributeRegex;

	public AttrRegexMatcher(int eventType, String tag, String attributeName, String attributeRegex) {
		this.eventType = eventType;
		this.tag = tag;
		this.attributeName = attributeName;
		this.attributeRegex = attributeRegex;
	}

	public String match(int matchType, XmlPullParser parser) {
		if (matchType == eventType) {
			if (parser.getName().equals(tag)) {
				if (parser.getAttributeCount() > 0) {
					String parsedAttr = parser.getAttributeValue(null, attributeName);
					if (parsedAttr != null) {
						Pattern p = Pattern.compile(attributeRegex);
						Matcher matcher = p.matcher(parsedAttr);
						matcher.matches();
						return matcher.group(1);
					}
				}
			}
		}
		return null;
	}

}
