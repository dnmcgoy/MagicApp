package com.lbd.android.magic.parser;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.xmlpull.v1.XmlPullParser;

import com.lbd.android.magic.parser.AttributeMatcher;

@RunWith(PowerMockRunner.class)
public class AttributeMatcherTest {
	
	XmlPullParser parser;
	
	@Before
	public void setup() {
		parser = Mockito.mock(XmlPullParser.class);
	}

	@Test
	public void shouldNotMatchWithWrongEvent() {
		AttributeMatcher matcher = new AttributeMatcher(1, "asdf", "attr", "value");
		String actual = matcher.match(0, parser);
		assertNull(actual);
	}

	@Test
	public void shouldNotMatchWithWrongTag() throws Exception {
		AttributeMatcher matcher = new AttributeMatcher(1, "asdf", "attr", "value");
		Mockito.when(parser.getName()).thenReturn("fdsa");
		String actual = matcher.match(1, parser);
		Mockito.verify(parser).getName();
		assertNull(actual);
	}

	@Test
	public void shouldNotMatchWithZeroAttributes() throws Exception {
		AttributeMatcher matcher = new AttributeMatcher(1, "asdf", "attr", "value");
		Mockito.when(parser.getName()).thenReturn("asdf");
		Mockito.when(parser.getAttributeCount()).thenReturn(0);
		String actual = matcher.match(1, parser);
		Mockito.verify(parser).getAttributeCount();
		assertNull(actual);
	}

	@Test
	public void shouldReturnAttributeValueWhenAllConditionsMet() throws Exception {
		AttributeMatcher matcher = new AttributeMatcher(1, "asdf", "attr", "value");
		Mockito.when(parser.getName()).thenReturn("asdf");
		Mockito.when(parser.getAttributeCount()).thenReturn(1);
		Mockito.when(parser.getAttributeValue(null, "attr")).thenReturn("value");
		String actual = matcher.match(1, parser);
		assertEquals("value", actual);
	}

}
