/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */ 
        it('Are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
		
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL is defined an valid', function() {
            allFeeds.forEach(function(feed_url_list) {
				expect(feed_url_list.url).toContain('http');	//Check basic components of a URL included
				expect(feed_url_list.url).toContain('feed');	//Assumption api contains the word feed
				expect(feed_url_list.url).toContain('.');
				expect(feed_url_list.url).toContain('://');
				expect(feed_url_list.url).not.toBeNull(); 	//No url to be null
            });
		});
		
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		it('Name is defined and valid', function() {             
            allFeeds.forEach(function (feed_url_list) {      
				expect(feed_url_list.name).toBeDefined();    	//Name must exist
				expect(feed_url_list.name).not.toBeNull();   	//Cannot be null  
				expect(feed_url_list.name).not.toContain('.');	//Check name does not contain special characters
				expect(feed_url_list.name).not.toContain('#');
				expect(feed_url_list.name).not.toContain('/');
				expect(feed_url_list.name).not.toContain('\'');
            });
        });	 
    });
	
    /* TODO: Write a new test suite named "The menu" */
	describe('The Menu', function() {	
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		it('Left nav is hidden by default', function() { 
			expect($('body').hasClass('menu-hidden')).toBeTruthy();      
		});	
		
        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('Menu becomes visible on click', function() {        
            $('.menu-icon-link').click();                               //Perform menu click
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();	//Check hidden class is not active
            $('.menu-icon-link').click();                               //Perform second click to close
            expect($('body').hasClass('menu-hidden')).toBeTruthy();		//Check hidden class is reactivated
        });   
	});	
	
    /* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */	
		beforeEach(function(done) {		//Simulate feed load and pause testing until async load completes (Jasmine 'done')                             
			loadFeed(0, function () {	 
				done();
            });
		});	

		it("Have loaded without issue", function() {                      
			expect($('.entry').length).toBeGreaterThan(0);	//Check at-least 1 content div loads
        });
	});	 
	
    /* TODO: Write a new test suite named "New Feed Selection"*/
	describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		var FirstFeed;	//Placeholder to store feed information in
		var SecondFeed;

		beforeEach(function(done) {							//Simulate feed load and pause testing until async load completes (Jasmine 'done')   
			expect($('.entry:first').html()).toBeTruthy();	//Double check feed has content
			FirstFeed = $('.entry:first').html();     		//Load and save content from feed one
	
			loadFeed(1, function () {	 						//Load next feed
				done();											//Jasmin async handling
				expect($('.entry:first').html()).toBeTruthy();	//Double check feed has content
				SecondFeed = $('.entry:first').html();			//Save its contents
            });
		});		

	    it("Successfully changes feed content", function() {                  
          expect(SecondFeed).not.toEqual(FirstFeed);	//Check the two feeds are not the same as each other
        }); 
	});
}());
