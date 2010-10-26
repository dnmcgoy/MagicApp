package com.lbd.android.magic.test;

import com.lbd.android.magic.MagicApp;

import android.test.ActivityInstrumentationTestCase2;

public class MagicAppTest extends ActivityInstrumentationTestCase2<MagicApp> {

    private MagicApp mActivity;  // the activity under test

	public MagicAppTest() {
		super("com.lbd.android.magic", MagicApp.class);
	}

	@Override
	protected void setUp() throws Exception {
		super.setUp();
		mActivity = this.getActivity();
	}

	public void testText() {
		assertTrue(true);
	}
}
