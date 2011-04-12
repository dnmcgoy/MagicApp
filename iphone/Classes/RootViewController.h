//
//  RootViewController.h
//  MagicDecks
//
//  Created by Donald Mcgaughey on 1/7/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>

#import "JREngage.h"

@interface RootViewController : UITableViewController <NSFetchedResultsControllerDelegate,
                                                       JREngageDelegate> {

@private
    NSFetchedResultsController *fetchedResultsController_;
    NSManagedObjectContext *managedObjectContext_;
}

@property (nonatomic, retain) NSManagedObjectContext *managedObjectContext;
@property (nonatomic, retain) NSFetchedResultsController *fetchedResultsController;

@end
