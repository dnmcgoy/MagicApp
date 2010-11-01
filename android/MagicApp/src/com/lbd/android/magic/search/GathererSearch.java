package com.lbd.android.magic.search;

import java.net.MalformedURLException;
import java.net.URL;

public class GathererSearch {
	
	Color[] colorFilter;
	
	public GathererSearch() {
		colorFilter = new Color[0];
	}
	
	public void filterOnColors(Color...colors) {
		colorFilter = colors;
	}
	
	public URL createURL() throws MalformedURLException {
		StringBuilder query = new StringBuilder();

		if (colorFilter.length > 0) {
			query.append("color=");
			for (Color color : colorFilter) {
				query.append("+[");
				query.append(color.abbrev);
				query.append(']');
			}
		}
		String url = "http://gatherer.wizards.com/Pages/Search/Default.aspx";
		if (query.length() > 0) {
			url += '?';
			url += query.toString();
			System.out.println(url);
		}
		return new URL(url);
	}
}
