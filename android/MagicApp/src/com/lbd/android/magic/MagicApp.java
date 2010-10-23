package com.lbd.android.magic;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import org.xmlpull.v1.XmlSerializer;

import com.example.coverflow.CoverFlow;

import android.app.Activity;
import android.app.ListActivity;
import android.os.Bundle;
import android.util.Log;
import android.util.Xml;
import android.widget.ArrayAdapter;

public class MagicApp extends ListActivity {
	
	public static String TAG = "MagicApp";
	
	List<Card> cards;
	
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
//		super.onCreate(savedInstanceState);
//
//		CoverFlow coverFlow;
//		coverFlow = new CoverFlow(this);
//		ImageAdapter coverImageAdapter = new ImageAdapter(this);
//		coverFlow.setAdapter(coverImageAdapter);
//
//		coverFlow.setSpacing(-25);
//		coverFlow.setSelection(4, true);
//		coverFlow.setAnimationDuration(1000);
//
//		setContentView(coverFlow);
		

        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        Log.i(TAG, "Loading Feed");
        loadFeed();
	}
	
	private void loadFeed(){
    	try{
    		GathererParser parser = new GathererParser(getAssets().open("gatherer.html"));
    		//"http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&color=+@(+[G])&type=+[%22Creature%22]&format=+[%22Standard%22]&rarity=+[M]");
    		cards = parser.parse();
    		String xml = writeXml();
	    	Log.i(TAG, xml);
	    	List<String> titles = new ArrayList<String>(cards.size());
	    	for (Card card : cards){
	    		titles.add(card.name);
	    	}
	    	ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, R.layout.row, titles);
	    	this.setListAdapter(adapter);
    	} catch (Throwable t){
    		Log.e(TAG,t.getMessage(),t);
    	}
    }

	private String writeXml(){
		XmlSerializer serializer = Xml.newSerializer();
		StringWriter writer = new StringWriter();
		try {
			serializer.setOutput(writer);
			serializer.startDocument("UTF-8", true);
			serializer.startTag("", "cards");
			serializer.attribute("", "number", String.valueOf(cards.size()));
			for (Card card: cards){
				serializer.startTag("", "card");
				serializer.startTag("", "name");
				serializer.text(card.name);
				serializer.endTag("", "name");
				serializer.endTag("", "card");
			}
			serializer.endTag("", "cards");
			serializer.endDocument();
			return writer.toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
		} 
	}
}