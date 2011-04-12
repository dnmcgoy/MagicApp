//
//  DefaultCardTableViewCell.h
//  sqlliteDemo
//
//  Created by Donald Mcgaughey on 1/7/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>


@interface DefaultCardTableViewCell : UITableViewCell {
    IBOutlet UIButton* plus1Button;
    IBOutlet UIButton* plus4Button;
    IBOutlet UIButton* plusXButton;
    IBOutlet UIView* cardView;
    IBOutlet UILabel* cardName;
}

@property (nonatomic,retain) IBOutlet UIButton* plus1Button;
@property (nonatomic,retain) IBOutlet UIButton* plus4Button;
@property (nonatomic,retain) IBOutlet UIButton* plusXButton;
@property (nonatomic,retain) IBOutlet UIView* cardView;
@property (nonatomic,retain) IBOutlet UILabel* cardName;

@end
