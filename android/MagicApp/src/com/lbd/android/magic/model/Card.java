package com.lbd.android.magic.model;

public class Card { //implements Parcelable {
	public String name;
	public String mtgID;
	public int cmc;
	public String cc;
	public String type;
	public String subtype;
	public String rules;
	public Integer power;
	public Integer toughness;

	public Card() {}
	
//	public Card(Parcel in) {
//		name = in.readString();
//		mtgID = in.readString();
//		cmc = in.readInt();
//		cc = in.readString();
//		type = in.readString();
//		subtype = in.readString();
//		rules = in.readString();
//		power = in.readInt();
//		toughness = in.readInt();
//	}
//
//	public int describeContents() {
//		return 0;
//	}
//
//	public void writeToParcel(Parcel out, int flags) {
//		out.writeString(name);
//		out.writeString(mtgID);
//		out.writeInt(cmc);
//		out.writeString(cc);
//		out.writeString(type);
//		out.writeString(subtype);
//		out.writeString(rules);
//		out.writeInt(power);
//		out.writeInt(toughness);		
//	}
//
//	public static final Parcelable.Creator<Card> CREATOR = new Parcelable.Creator<Card>() {
//		public Card createFromParcel(Parcel in) {
//			return new Card(in);
//		}
//
//		public Card[] newArray(int size) {
//			return new Card[size];
//		}
//	};

}
