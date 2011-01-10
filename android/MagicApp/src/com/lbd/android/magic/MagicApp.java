package com.lbd.android.magic;

import java.io.StringWriter;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.xmlpull.v1.XmlSerializer;

import android.app.Activity;
import android.app.ListActivity;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.util.Log;
import android.util.Xml;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import com.lbd.android.magic.model.Card;
import com.lbd.android.magic.parser.GathererParser;

//public class MagicApp extends ListActivity {
public class MagicApp extends Activity {

    private static final int VOICE_RECOGNITION_REQUEST_CODE = 1234;
	
	public static String TAG = "MagicApp";
	
	List<Card> cards;

    Button speakButton;
    ListView resultList;
	
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
		
		// working, but I'm experimenting with some other things...
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.main);
//        Log.i(TAG, "Loading Feed");
//        loadFeed();

    	Log.i(TAG, "Starting view with a button");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.myvoice);
        resultList = (ListView) findViewById(R.id.result_list);
        speakButton = (Button) findViewById(R.id.speak_button);
        speakButton.setOnClickListener(speakClickListener);
	}

    private OnClickListener speakClickListener = new OnClickListener() {
        public void onClick(View v) {
        	Log.i(TAG, "Button clicked");
        	startVoiceRecognitionActivity();
        }
    };
    
    private void startVoiceRecognitionActivity() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
        		RecognizerIntent.LANGUAGE_MODEL_WEB_SEARCH);
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speech recognition demo");
        startActivityForResult(intent, VOICE_RECOGNITION_REQUEST_CODE);
    }

    /**
     * Handle the results from the recognition activity.
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == VOICE_RECOGNITION_REQUEST_CODE && resultCode == RESULT_OK) {
            // Fill the list view with the strings the recognizer thought it could have heard
            ArrayList<String> matches = data.getStringArrayListExtra(
                    RecognizerIntent.EXTRA_RESULTS);
            resultList.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1,
                    matches));
        }

        super.onActivityResult(requestCode, resultCode, data);
    }
//	@Override
//	protected void onListItemClick(ListView l, View v, int position, long id) {
//		// TODO Auto-generated method stub
//		//super.onListItemClick(l, v, position, id);
//		Card card = cards.get(position);
//		Intent singleCardIntent = new Intent(null, SingleCardActivity.class);
//		startActivity(singleCardIntent);
//	}

//	private void loadFeed(){
//    	try{
//    		String url = "http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&color=+@(+[G])&type=+[%22Creature%22]&format=+[%22Standard%22]&rarity=+[M]";
//    		GathererParser parser = new GathererParser(new URL(url).openStream());
//    		cards = parser.parse();
//    		String xml = writeXml();
//	    	Log.i(TAG, xml);
//	    	List<String> titles = new ArrayList<String>(cards.size());
//	    	for (Card card : cards){
//	    		titles.add(card.name);
//	    	}
//	    	ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, R.layout.row, titles);
//	    	this.setListAdapter(adapter);
//    	} catch (Throwable t){
//    		Log.e(TAG,t.getMessage(),t);
//    	}
//    }

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