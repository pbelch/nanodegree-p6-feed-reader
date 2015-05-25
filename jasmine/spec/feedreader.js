$(function() {

    describe('RSS Feeds', function() {
        // Make sure that theallFeeds variable has been defined and that it is not empty. Experiment with this before you get started on
        it('Are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through each feed in the allFeeds object and ensures it has a URL definedand that the URL is not empty.
        it('URL is defined an valid', function() {
            allFeeds.forEach(function(feed_url_list) {
                expect(feed_url_list.url).toContain('http');
                expect(feed_url_list.url).toContain('feed');
                expect(feed_url_list.url).toContain('.');
                expect(feed_url_list.url).toContain('://');
                expect(feed_url_list.url).not.toBeNull();
            });
        });

        // Loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        it('Name is defined and valid', function() {
            allFeeds.forEach(function(feed_url_list) {
                expect(feed_url_list.name).toBeDefined();
                expect(feed_url_list.name).not.toBeNull();
                expect(feed_url_list.name).not.toContain('.');
                expect(feed_url_list.name).not.toContain('#');
                expect(feed_url_list.name).not.toContain('/');
                expect(feed_url_list.name).not.toEqual('');
            });
        });
    });

    describe('The Menu', function() {
        // Ensures the menu element is hidden by default
        it('Left nav is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        // Check the menu changes visibility when the menu icon is clicked and hides when clicked again.
        it('Menu becomes visible on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        // Ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it("Have loaded without issue", function() {
            expect($('.feed .entry').length).toBeGreaterThan(0); //Check at-least 1 content div loads
        });
    });

    describe('New Feed Selection', function() {
        // Test that the linked content does actually change on pressing a different link
        var FirstFeed;
        var SecondFeed

        beforeEach(function(done) {
            //Load feed using jasmine's async handling
            loadFeed(0, function() {
                FirstFeed = $(".header-title").html();
            });
            //Load feed using jasmine's async handling
            loadFeed(1, function() {
                SecondFeed = $(".header-title").html();
                done();
            });

        });
        // Make sure the HTML content is different than the previous feed's
        it("Successfully changes feed content", function() {
            expect(SecondFeed).not.toEqual(FirstFeed);
        });
    });


}());
