'use strict';

(function() {
	// Sub pages Controller Spec
	describe('Sub pages Controller Tests', function() {
		// Initialize global variables
		var SubPagesController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Sub pages controller.
			SubPagesController = $controller('SubPagesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Sub page object fetched from XHR', inject(function(SubPages) {
			// Create sample Sub page using the Sub pages service
			var sampleSubPage = new SubPages({
				name: 'New Sub page'
			});

			// Create a sample Sub pages array that includes the new Sub page
			var sampleSubPages = [sampleSubPage];

			// Set GET response
			$httpBackend.expectGET('sub-pages').respond(sampleSubPages);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subPages).toEqualData(sampleSubPages);
		}));

		it('$scope.findOne() should create an array with one Sub page object fetched from XHR using a subPageId URL parameter', inject(function(SubPages) {
			// Define a sample Sub page object
			var sampleSubPage = new SubPages({
				name: 'New Sub page'
			});

			// Set the URL parameter
			$stateParams.subPageId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/sub-pages\/([0-9a-fA-F]{24})$/).respond(sampleSubPage);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subPage).toEqualData(sampleSubPage);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(SubPages) {
			// Create a sample Sub page object
			var sampleSubPagePostData = new SubPages({
				name: 'New Sub page'
			});

			// Create a sample Sub page response
			var sampleSubPageResponse = new SubPages({
				_id: '525cf20451979dea2c000001',
				name: 'New Sub page'
			});

			// Fixture mock form input values
			scope.name = 'New Sub page';

			// Set POST response
			$httpBackend.expectPOST('sub-pages', sampleSubPagePostData).respond(sampleSubPageResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Sub page was created
			expect($location.path()).toBe('/sub-pages/' + sampleSubPageResponse._id);
		}));

		it('$scope.update() should update a valid Sub page', inject(function(SubPages) {
			// Define a sample Sub page put data
			var sampleSubPagePutData = new SubPages({
				_id: '525cf20451979dea2c000001',
				name: 'New Sub page'
			});

			// Mock Sub page in scope
			scope.subPage = sampleSubPagePutData;

			// Set PUT response
			$httpBackend.expectPUT(/sub-pages\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/sub-pages/' + sampleSubPagePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid subPageId and remove the Sub page from the scope', inject(function(SubPages) {
			// Create new Sub page object
			var sampleSubPage = new SubPages({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Sub pages array and include the Sub page
			scope.subPages = [sampleSubPage];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/sub-pages\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSubPage);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.subPages.length).toBe(0);
		}));
	});
}());