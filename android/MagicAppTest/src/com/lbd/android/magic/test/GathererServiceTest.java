package com.lbd.android.magic.test;

import com.lbd.android.magic.parser.GathererService;

import android.content.Intent;
import android.os.IBinder;
import android.test.ServiceTestCase;
import android.test.suitebuilder.annotation.*;

public class GathererServiceTest extends ServiceTestCase<GathererService> {

	public GathererServiceTest(Class<GathererService> serviceClass) {
		super(serviceClass);
		// TODO Auto-generated constructor stub
	}

    /**
     * Test basic startup/shutdown of Service
     */
    @SmallTest
    public void testStartable() {
        Intent startIntent = new Intent();
        startIntent.setClass(getContext(), GathererService.class);
        startService(startIntent); 
    }

    /**
     * Test binding to service
     */
    @MediumTest
    public void testBindable() {
        Intent startIntent = new Intent();
        startIntent.setClass(getContext(), GathererService.class);
        IBinder service = bindService(startIntent); 
    }
	
}
