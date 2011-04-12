//
//  DefaultCardTableViewCell.m
//  sqlliteDemo
//
//  Created by Donald Mcgaughey on 1/7/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "DefaultCardTableViewCell.h"


@implementation DefaultCardTableViewCell

@synthesize plus1Button;
@synthesize plus4Button;
@synthesize plusXButton;
@synthesize cardView;
@synthesize cardName;

- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier {
    
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        // Initialization code.
    }
    return self;
}


- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    
    [super setSelected:selected animated:animated];
    
    // Configure the view for the selected state.
}


- (void)dealloc {
    [super dealloc];
}


@end
