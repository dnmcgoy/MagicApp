package com.lbd.android.magic.search;

public enum Type {
	ARTIFACT,
	BASIC,
	CREATURE,
	ENCHANTMENT,
	INSTANT,
	LAND,
	LEGENDARY,
	PLANESWALKER,
	SNOW,
	SORCERY,
	TRIBAL;

	@Override
	public String toString() {
		return this.name().toLowerCase();
	}
}
