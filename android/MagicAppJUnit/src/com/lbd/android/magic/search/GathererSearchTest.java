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
	
	@Test
	public void shouldAddBlueAndRedToFilter() throws Exception {
		search.filterOnColors(Color.BLUE, Color.RED);
		assertEquals("color=+[U]+[R]", search.createURL().getQuery());
	}
	
	@Test
	public void shouldAddStandandToFormatFilter() throws Exception {
		search.filterOnFormat(Format.STANDARD);
		assertEquals("format=[\"standard\"]", search.createURL().getQuery());
	}
	
	@Test
	public void shouldAddInstantToTypeFilter() throws Exception {
		search.filterOnType(Type.INSTANT);
		assertEquals("type=+[\"instant\"]", search.createURL().getQuery());
	}
	
	@Test
	public void shouldAddCreatureAndArtifactToTypeFilter() throws Exception {
		search.filterOnType(Type.CREATURE, Type.ARTIFACT);
		assertEquals("type=+[\"creature\"]+[\"artifact\"]", search.createURL().getQuery());
	}
}
