package com.lbd.android.magic.search;

import java.net.MalformedURLException;
import java.net.URL;

public class GathererSearch {
	
	Color[] colorFilter;
	Format[] formatFilter;
	Type[] typeFilter;
	
	public GathererSearch() {
		colorFilter = new Color[0];
		formatFilter = new Format[0];
		typeFilter = new Type[0];
	}
	
	public void filterOnColors(Color...colors) {
		colorFilter = colors;
	}
	
	public void filterOnFormat(Format...formats) {
		formatFilter = formats;
	}
	
	public void filterOnType(Type...types) {
		typeFilter = types;
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

		if (formatFilter.length > 0) {
			query.append("format=");
			for (Format format : formatFilter) {
				query.append("[\"");
				query.append(format.abbrev);
				query.append("\"]");
			}
		}

		if (typeFilter.length > 0) {
			query.append("type=");
			for (Type type : typeFilter) {
				query.append("+[\"");
				query.append(type.toString());
				query.append("\"]");
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
