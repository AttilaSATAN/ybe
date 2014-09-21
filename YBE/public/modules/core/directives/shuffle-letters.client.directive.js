'use strict';
angular.module('core')
    .directive('shuffleLetters', [
        function () {
            // Runs during compile
            return {
                // name: '',
                // priority: 1,
                // terminal: true,
                // scope: {}, // {} = isolate, true = child, false/undefined = no change
                // controller: function($scope, $element, $attrs, $transclude) {},
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
                // template: '',
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                link: function ($scope, iElm, iAttrs, controller) {

                    var str = iElm.text();
                    var options = {
                        'step': 40, // How many times should the letters be changed
                        'fps': 25, // Frames Per Second
                        'text': '', // Use this text instead of the contents
                        'callback': function () {} // Run once the animation is complete
                    };
                    str = str.split('');
                    // The types array holds the type for each character;
                    // Letters holds the positions of non-space characters;
                    var types = [],
                        letters = [];
                    // Looping through all the chars of the string
                    for (var i = 0; i < str.length; i++) {
                        var ch = str[i];
                        if (ch == " ") {
                            types[i] = "space";
                            continue;
                        } else if (/[a-z]/.test(ch)) {
                            types[i] = "lowerLetter";
                        } else if (/[A-Z]/.test(ch)) {
                            types[i] = "upperLetter";
                        } else {
                            types[i] = "symbol";
                        }
                        letters.push(i);
                    }
                    iElm.html("");
                    // Self executing named function expression:
                    (function shuffle(start) {
                        // This code is run options.fps times per second
                        // and updates the contents of the page element
                        var i,
                            len = letters.length,
                            strCopy = str.slice(0); // Fresh copy of the string
                        if (start > len) {
                            // The animation is complete. Updating the
                            // flag and triggering the callback;
                            return;
                        }
                        // All the work gets done here
                        for (i = Math.max(start, 0); i < len; i++) {
                            // The start argument and options.step limit
                            // the characters we will be working on at once
                            if (i < start + options.step) {
                                // Generate a random character at thsi position
                                strCopy[letters[i]] = randomChar(types[
                                    letters[i]]);
                            } else {
                                strCopy[letters[i]] = "";
                            }
                        }
                        
                        iElm.text(strCopy.join(""));
                        setTimeout(function () {
                            shuffle(start + 1);
                        }, 1000 / options.fps);
                    })(-options.step);

                    function randomChar(type) {
                        var pool = "";
                        if (type == "lowerLetter") {
                            pool = "abcdefghijklmnopqrstuvwxyz0123456789";
                        } else if (type == "upperLetter") {
                            pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        } else if (type == "symbol") {
                            //pool = ",.?/\\(^)![]{}*&^%$#'\"";
                            pool = '1234567890';
                        }
                        var arr = pool.split('');
                        return arr[Math.floor(Math.random() * arr.length)];
                    }
                }
            }
        }
    ]);