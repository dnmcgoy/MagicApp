package com.lbd.android.magic.search;

import org.junit.*;

import static org.junit.Assert.*;

public class VoiceLookupTest {
	
	@Test
	public void parseNameShouldReturnInputWhenNoLeadingGiven() throws Exception {
		String input = "counterspell";
		assertEquals(input, VoiceLookup.parseName(input));
	}
	
	@Test
	public void parseNameShouldStripLeadingDigitsFromInput() throws Exception {
		String input = "4 counterspell";
		assertEquals("counterspell", VoiceLookup.parseName(input));
	}
	
	@Test
	public void parseCountShouldReturnOneWhenNoLeadingDigitsGiven() throws Exception {
		String input = "counterspell";
		assertEquals(1, VoiceLookup.parseCount(input));
	}
	
	@Test
	public void parseCountShouldFindLeadingDigits() throws Exception {
		String input = "4 counterspell";
		assertEquals(4, VoiceLookup.parseCount(input));
	}

}
