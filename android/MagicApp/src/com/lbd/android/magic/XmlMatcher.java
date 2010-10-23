package com.lbd.android.magic;

import org.xmlpull.v1.XmlPullParser;

public interface XmlMatcher {
	public String match(int eventType, XmlPullParser parser);
}
