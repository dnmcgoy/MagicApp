package com.lbd.android.magic;

import org.xmlpull.v1.XmlPullParser;

public interface ValueParser {
	public String getValue();
	public boolean handleEvent(int eventType, XmlPullParser parser);
}
