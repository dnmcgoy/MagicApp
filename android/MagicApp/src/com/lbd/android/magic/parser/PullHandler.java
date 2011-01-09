package com.lbd.android.magic.parser;

import org.xmlpull.v1.XmlPullParser;

public interface PullHandler {
	public boolean handleEvent(int eventType, XmlPullParser parser);
}
