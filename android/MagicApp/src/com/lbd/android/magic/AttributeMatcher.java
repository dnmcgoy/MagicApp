package com.lbd.android.magic;

import org.xmlpull.v1.XmlPullParser;

public class AttributeMatcher implements XmlMatcher {
	
	int eventType;
	String tag;
	String attributeName;
	String attributeMatch;

	public AttributeMatcher(int eventType, String tag, String attributeName, String attributeMatch) {
		this.eventType = eventType;
		this.tag = tag;
		this.attributeName = attributeName;
		this.attributeMatch = attributeMatch;
	}

	public String match(int matchType, XmlPullParser parser) {
		if (matchType == eventType) {
			if (parser.getName().equals(tag)) {
				if (parser.getAttributeCount() > 0) {
					String parsedAttr = parser.getAttributeValue(null, attributeName);
					if (parsedAttr != null && parsedAttr.matches(attributeMatch)) {
						return parsedAttr;
					}
				}
			}
		}
		return null;
	}
}
