package com.lbd.android.magic.search;

import org.junit.*;

import static org.junit.Assert.*;

public class GathererSearchTest {

	GathererSearch search;
	
	@Before
	public void setup() {
		search = new GathererSearch();
	}
	
	@Test
	public void shouldMatchDomain() throws Exception {
		assertEquals("gatherer.wizards.com", search.createURL().getHost());
	}
	
	@Test
	public void shouldMatchBasePath() throws Exception {
		assertEquals("/Pages/Search/Default.aspx", search.createURL().getPath());
	}
	
	@Test
	public void shouldAddGreenToFilter() throws Exception {
		search.filterOnColors(Color.GREEN);
		assertEquals("color=+[G]", search.createURL().getQuery());
	}
}
