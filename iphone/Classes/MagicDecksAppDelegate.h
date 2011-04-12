//
//  MagicDecksAppDelegate.h
//  MagicDecks
//
//  Created by Donald Mcgaughey on 1/7/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreData/CoreData.h>
#import <sqlite3.h>

@interface MagicDecksAppDelegate : NSObject <UIApplicationDelegate, UITabBarControllerDelegate> {
    
    UIWindow *window;
    UITabBarController *tabBarController;
    UINavigationController *navigationController;
    UIWebView* testWebView;

@private
    NSManagedObjectContext *managedObjectContext_;
    NSManagedObjectModel *managedObjectModel_;
    NSPersistentStoreCoordinator *persistentStoreCoordinator_;
}

@property (nonatomic, retain) IBOutlet UIWindow *window;
@property (nonatomic, retain) IBOutlet UINavigationController *navigationController;
@property (nonatomic, retain) IBOutlet UITabBarController *tabBarController;

@property (nonatomic, retain) IBOutlet UIWebView* testWebView;


@property (nonatomic, retain, readonly) NSManagedObjectContext *managedObjectContext;
@property (nonatomic, retain, readonly) NSManagedObjectModel *managedObjectModel;
@property (nonatomic, retain, readonly) NSPersistentStoreCoordinator *persistentStoreCoordinator;

- (NSString *)applicationDocumentsDirectory;
- (void)saveContext;

@end

