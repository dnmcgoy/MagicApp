//
//  CardDetailViewController.h
//  MagicDecks
//
//  Created by Donald Mcgaughey on 1/7/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface CardDetailViewController : UIViewController {
    IBOutlet UIView* cardImage;
    NSString* multiverseId;
    IBOutlet UILabel* cardName;
}

@property (retain, nonatomic) IBOutlet UIView* cardImage;
@property (retain, nonatomic) NSString* multiverseId;
@property (retain, nonatomic) IBOutlet UILabel* cardName;
@end
