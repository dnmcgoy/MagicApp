package com.lbd.android.magic.search;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.lbd.android.magic.model.Card;
import com.lbd.android.magic.model.Run;

public class VoiceLookup {

	
	public static Run search(ArrayList<String> serviceResults) {
		Run run = null;
		for (String result : serviceResults) {
			int count = parseCount(result);
			String name = parseName(result);
			Card card = fuzzyCardName(name);
			run = new Run(card, count);
		}
		return run;
	}

	public static String parseName(String result) {
		Pattern p = Pattern.compile("\\d*\\s*(.*)");
		Matcher matcher = p.matcher(result);
		if (matcher.matches())
			return matcher.group(1);
		else
			return "";
	}
	
	public static int parseCount(String result) {
		Pattern p = Pattern.compile("(\\d+).*");
		Matcher matcher = p.matcher(result);
		if (matcher.matches())
			return Integer.parseInt(matcher.group(1));
		else
			return 1;
	}
	
	public static Card fuzzyCardName(String name) {
		Card card = null;
		return card;
	}
}
