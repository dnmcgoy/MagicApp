package com.lbd.android.magic.search;

public enum Color {
	WHITE ('W'),
	BLUE  ('U'),
	BLACK ('B'),
	RED   ('R'),
	GREEN ('G');
	
	public final char abbrev;
	
	Color(char abbrev) {
		this.abbrev = abbrev;
	}
}
