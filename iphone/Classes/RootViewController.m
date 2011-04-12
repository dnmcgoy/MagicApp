//
//  RootViewController.m
//  MagicDecks
//
//  Created by Donald Mcgaughey on 1/7/11.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "RootViewController.h"
#import "AsyncImageView.h"
#import "DefaultCardTableViewCell.h"
#import "CardDetailViewController.h"

@interface RootViewController ()
- (void)configureCell:(UITableViewCell *)cell atIndexPath:(NSIndexPath *)indexPath;
@end


@implementation RootViewController

@synthesize fetchedResultsController=fetchedResultsController_, managedObjectContext=managedObjectContext_;


#pragma mark -
#pragma mark View lifecycle

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"Card Listing";
    
    JREngage *jrEngage = [JREngage jrEngageWithAppId:@"pfeifjknfccmcgggeodj"
                                         andTokenUrl:@"http://localhost:3000"
                                            delegate:self];
    
    [jrEngage showAuthenticationDialog];
}

- (void)jrAuthenticationDidSucceedForUser:(NSDictionary*)auth_info
                              forProvider:(NSString*)provider
{
    NSString *preferredUserName = [[auth_info objectForKey:@"profile"]
                                   objectForKey:@"preferredUsername"];
    
    UIAlertView *alert = [[[UIAlertView alloc]
                           initWithTitle:[NSString stringWithFormat:
                                          @"Hello, %@!", preferredUserName]
                           message:[NSString stringWithFormat:
                                    @"You have successfully signed in to %@!",
                                    provider]
                           delegate:self
                           cancelButtonTitle:@"OK"
                           otherButtonTitles:nil] autorelease];
    [alert show];
}


// Implement viewWillAppear: to do additional setup before the view is presented.
- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
}



- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
}

/*
- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
}
*/
/*
- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
}
*/

/*
 // Override to allow orientations other than the default portrait orientation.
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    // Return YES for supported orientations.
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}
 */


- (void)configureCell:(DefaultCardTableViewCell *)cell atIndexPath:(NSIndexPath *)indexPath {
    NSManagedObject *managedObject = [self.fetchedResultsController objectAtIndexPath:indexPath];
    cell.cardName.text = [[managedObject valueForKey:@"cardName"] description];
    
    CGRect frame;
	frame.size.width=90; frame.size.height=130;
	frame.origin.x=0; frame.origin.y=0;
    AsyncImageView* asyncImage = [[[AsyncImageView alloc]
                                   initWithFrame:frame] autorelease];
	asyncImage.tag = 999;
    NSString *urlString = [NSString stringWithFormat:@"%@%@%@",
                           @"http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=",
                           [managedObject valueForKey:@"multiverseId"],
                           @"&type=card"];
	NSURL* url = [NSURL URLWithString:urlString];
	[asyncImage loadImageFromURL:url];
    
	[cell.cardView addSubview:asyncImage];
}


#pragma mark -
#pragma mark Add a new object

- (void)insertNewObject {
    
    // Create a new instance of the entity managed by the fetched results controller.
    NSManagedObjectContext *context = [self.fetchedResultsController managedObjectContext];
    NSEntityDescription *entity = [[self.fetchedResultsController fetchRequest] entity];
    NSManagedObject *newManagedObject = [NSEntityDescription insertNewObjectForEntityForName:[entity name] inManagedObjectContext:context];
    
    // If appropriate, configure the new managed object.
    [newManagedObject setValue:[NSDate date] forKey:@"timeStamp"];
    
    // Save the context.
    NSError *error = nil;
    if (![context save:&error]) {
        /*
         Replace this implementation with code to handle the error appropriately.
         
         abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development. If it is not possible to recover from the error, display an alert panel that instructs the user to quit the application by pressing the Home button.
         */
        NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
        abort();
    }
}


- (void)setEditing:(BOOL)editing animated:(BOOL)animated {

    // Prevent new objects being added when in editing mode.
    [super setEditing:(BOOL)editing animated:(BOOL)animated];
    self.navigationItem.rightBarButtonItem.enabled = !editing;
}


#pragma mark -
#pragma mark Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [[self.fetchedResultsController sections] count];
}


- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    id <NSFetchedResultsSectionInfo> sectionInfo = [[self.fetchedResultsController sections] objectAtIndex:section];
    return [sectionInfo numberOfObjects];
}


// Customize the appearance of table view cells.
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    static NSString *CellIdentifier = @"Cell";
    
    DefaultCardTableViewCell *cell = (DefaultCardTableViewCell*)[tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) {
        NSArray *nibObjects = [[NSBundle mainBundle] loadNibNamed:@"DefaultCardTableViewCell" owner:nil options:nil];
        for(id currentObject in nibObjects)
        {
            if([currentObject isKindOfClass:[DefaultCardTableViewCell class]])
            {
                cell = (DefaultCardTableViewCell *)currentObject;
            }
        }
    } else {
        AsyncImageView* oldImage = (AsyncImageView*)
        [cell.contentView viewWithTag:999];
        [oldImage removeFromSuperview];
    }
    
    // Configure the cell.
    [self configureCell:cell atIndexPath:indexPath];
    
    return cell;
}



/*
// Override to support conditional editing of the table view.
- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    // Return NO if you do not want the specified item to be editable.
    return YES;
}
*/


// Override to support editing the table view.
- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        // Delete the managed object for the given index path
        NSManagedObjectContext *context = [self.fetchedResultsController managedObjectContext];
        [context deleteObject:[self.fetchedResultsController objectAtIndexPath:indexPath]];
        
        // Save the context.
        NSError *error = nil;
        if (![context save:&error]) {
            /*
             Replace this implementation with code to handle the error appropriately.
             
             abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development. If it is not possible to recover from the error, display an alert panel that instructs the user to quit the application by pressing the Home button.
             */
            NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
            abort();
        }
    }   
}


- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath {
    // The table view should not be re-orderable.
    return NO;
}


#pragma mark -
#pragma mark Table view delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    // Navigation logic may go here -- for example, create and push another view controller.
    
     CardDetailViewController *detailViewController = [[CardDetailViewController alloc] initWithNibName:@"CardDetailViewController" bundle:nil];
     NSManagedObject *selectedObject = [[self fetchedResultsController] objectAtIndexPath:indexPath];
     
     // ...
     // Pass the selected object to the new view controller.
     [self.navigationController pushViewController:detailViewController animated:YES];
    
    CGRect frame;
	frame.size.width=200; frame.size.height=260;
	frame.origin.x=0; frame.origin.y=0;
    AsyncImageView* asyncImage = [[[AsyncImageView alloc]
                                   initWithFrame:frame] autorelease];
	asyncImage.tag = 999;
    NSString *urlString = [NSString stringWithFormat:@"%@%@%@",
                           @"http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=",
                           [selectedObject valueForKey:@"multiverseId"],
                           @"&type=card"];
	NSURL* url = [NSURL URLWithString:urlString];
	[asyncImage loadImageFromURL:url];
    
	[detailViewController.cardImage addSubview:asyncImage];
    
    detailViewController.multiverseId = [selectedObject valueForKey:@"multiverseId"];
    detailViewController.cardName.text = [selectedObject valueForKey:@"cardName"];
    
    detailViewController.title = [selectedObject valueForKey:@"cardName"];
    detailViewController.view.backgroundColor = [UIColor blackColor];
     
     [detailViewController release];
     
}


#pragma mark -
#pragma mark Fetched results controller

- (NSFetchedResultsController *)fetchedResultsController {
    
    if (fetchedResultsController_ != nil) {
        return fetchedResultsController_;
    }
    
    /*
     Set up the fetched results controller.
    */
    // Create the fetch request for the entity.
    NSFetchRequest *fetchRequest = [[NSFetchRequest alloc] init];
    // Edit the entity name as appropriate.
    NSEntityDescription *entity = [NSEntityDescription entityForName:@"Card" inManagedObjectContext:self.managedObjectContext];
    [fetchRequest setEntity:entity];
    
    // Set the batch size to a suitable number.
    [fetchRequest setFetchBatchSize:20];
    
    // Edit the sort key as appropriate.
    NSSortDescriptor *sortDescriptor = [[NSSortDescriptor alloc] initWithKey:@"cardName" ascending:YES];
    NSArray *sortDescriptors = [[NSArray alloc] initWithObjects:sortDescriptor, nil];
    
    [fetchRequest setSortDescriptors:sortDescriptors];
    
    // Edit the section name key path and cache name if appropriate.
    // nil for section name key path means "no sections".
    NSFetchedResultsController *aFetchedResultsController = [[NSFetchedResultsController alloc] initWithFetchRequest:fetchRequest managedObjectContext:self.managedObjectContext sectionNameKeyPath:nil cacheName:@"Root"];
    aFetchedResultsController.delegate = self;
    self.fetchedResultsController = aFetchedResultsController;
    
    [aFetchedResultsController release];
    [fetchRequest release];
    [sortDescriptor release];
    [sortDescriptors release];
    
    NSError *error = nil;
    if (![fetchedResultsController_ performFetch:&error]) {
        /*
         Replace this implementation with code to handle the error appropriately.
         
         abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development. If it is not possible to recover from the error, display an alert panel that instructs the user to quit the application by pressing the Home button.
         */
        NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
        abort();
    }
    
    return fetchedResultsController_;
}    


#pragma mark -
#pragma mark Fetched results controller delegate


- (void)controllerWillChangeContent:(NSFetchedResultsController *)controller {
    [self.tableView beginUpdates];
}


- (void)controller:(NSFetchedResultsController *)controller didChangeSection:(id <NSFetchedResultsSectionInfo>)sectionInfo
           atIndex:(NSUInteger)sectionIndex forChangeType:(NSFetchedResultsChangeType)type {
    
    switch(type) {
        case NSFetchedResultsChangeInsert:
            [self.tableView insertSections:[NSIndexSet indexSetWithIndex:sectionIndex] withRowAnimation:UITableViewRowAnimationFade];
            break;
            
        case NSFetchedResultsChangeDelete:
            [self.tableView deleteSections:[NSIndexSet indexSetWithIndex:sectionIndex] withRowAnimation:UITableViewRowAnimationFade];
            break;
    }
}


- (void)controller:(NSFetchedResultsController *)controller didChangeObject:(id)anObject
       atIndexPath:(NSIndexPath *)indexPath forChangeType:(NSFetchedResultsChangeType)type
      newIndexPath:(NSIndexPath *)newIndexPath {
    
    UITableView *tableView = self.tableView;
    
    switch(type) {
            
        case NSFetchedResultsChangeInsert:
            [tableView insertRowsAtIndexPaths:[NSArray arrayWithObject:newIndexPath] withRowAnimation:UITableViewRowAnimationFade];
            break;
            
        case NSFetchedResultsChangeDelete:
            [tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationFade];
            break;
            
        case NSFetchedResultsChangeUpdate:
            [self configureCell:[tableView cellForRowAtIndexPath:indexPath] atIndexPath:indexPath];
            break;
            
        case NSFetchedResultsChangeMove:
            [tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationFade];
            [tableView insertRowsAtIndexPaths:[NSArray arrayWithObject:newIndexPath]withRowAnimation:UITableViewRowAnimationFade];
            break;
    }
}


- (void)controllerDidChangeContent:(NSFetchedResultsController *)controller {
    [self.tableView endUpdates];
}


/*
// Implementing the above methods to update the table view in response to individual changes may have performance implications if a large number of changes are made simultaneously. If this proves to be an issue, you can instead just implement controllerDidChangeContent: which notifies the delegate that all section and object changes have been processed. 
 
 - (void)controllerDidChangeContent:(NSFetchedResultsController *)controller {
    // In the simplest, most efficient, case, reload the table view.
    [self.tableView reloadData];
}
 */


#pragma mark -
#pragma mark Memory management

- (void)didReceiveMemoryWarning {
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];
    
    // Relinquish ownership any cached data, images, etc that aren't in use.
}


- (void)viewDidUnload {
    // Relinquish ownership of anything that can be recreated in viewDidLoad or on demand.
    // For example: self.myOutlet = nil;
}


- (void)dealloc {
    [fetchedResultsController_ release];
    [managedObjectContext_ release];
    [super dealloc];
}


@end

