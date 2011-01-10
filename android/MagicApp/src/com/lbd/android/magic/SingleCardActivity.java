package com.lbd.android.magic;

import com.lbd.android.magic.model.Card;

import android.app.Activity;
import android.os.Bundle;

public class SingleCardActivity extends Activity {

	public Card card;
	
	public SingleCardActivity(Card card) {
		this.card = card;
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
	}

}
