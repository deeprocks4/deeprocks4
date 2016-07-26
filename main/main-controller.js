app.controller('MainController', function ($scope, $timeout) {
    'use strict';

    // Global Vars
    var $window = $(window),
        modules = [], // Store all modules in an array
		draggies = [], // Store all draggable components in an array
		toggle = false, // Toggle variable for dragging
        ticking = false,
        dragTimer,

        $ppBackground = $('#pp-background'),
        $ppContainer = $('#module-wrapper'),
        aspectRatio,

        ppBackgroundWidth,
        ppBackgroundHeight;

    var el = document.getElementById('pp-background');
		
	// init
	$scope.txtToggleDragging = "Enable Dragging";

    /**
     * Animation callback
     */
    function update() {

        // TODO
        // Determine when resize event needed
        var resize = ($ppBackground.width() !== ppBackgroundWidth || $ppBackground.height() !== ppBackgroundHeight);
        resize = true;

        // ---------------------------------------
        // Main Background Resize
        // ---------------------------------------

        if( resize ) {

            // Resize Vars
            aspectRatio = $ppBackground.width() / $ppBackground.height();

            if (($window.width() / $window.height()) < aspectRatio) {

                //TODO
                // IE Fallback for classList

                //$ppBackground.removeClass().addClass('full-height');
                el.classList.add('full-height');
                el.classList.remove('full-width');
            } else {
                //$ppBackground.removeClass().addClass('full-width');
                el.classList.remove('full-height');
                el.classList.add('full-width');
            }

            ppBackgroundWidth = $ppBackground.width();
            ppBackgroundHeight = $ppBackground.height();
        }

        // ---------------------------------------
        // Module Projection
        // ---------------------------------------
        // Scroll Vars
        var module = null,
            topOffset,
            leftOffset,
            offset,
            scrollTop = $window.scrollTop();


        // Calculate Offsets
        for(var m = 0; m < modules.length; m++) {
            module = modules[m];

            topOffset = (0 - $(module.element).offset().top) + scrollTop;
            leftOffset = 0 - $(module.element).offset().left;

            // Calculate Offsets
            $(module.background).css({
                '-webkit-transform': 'translate3d(' + leftOffset + 'px' + ',' + topOffset + 'px' + ',' + 0 + ')',
                'transform': 'translate3d(' + leftOffset + 'px' + ',' + topOffset + 'px' + ',' + 0 + ')'
            });

            //TweenLite.to(module.background, 0, {x: leftOffset , y: topOffset, z:0.01});

            if( resize ) {
                $('img', module.background).css({
                    'width': ppBackgroundWidth + 'px ',
                    'height': ppBackgroundHeight + 'px'
                });
            }

        }

        // allow further rAFs to be called
        ticking = false;
    }

    /**
     * Callback for our resize event
     */
    var onResize = function() {
        requestTick();
    }

    /**
     * Callback for our resize event
     */
    var onScroll = function() {
        requestTick();
    }

    /**
     * Calls rAF if it's not already
     * been done already
     */
    var requestTick = function() {
        if(!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    // Initialise
    var init = function () {

        // Retrieve all modules from the DOM and store in array
        $('.module').each(function(index) {
          var module = {};

          module.element = $(this);
          module.background = $('.module-background', this);

          modules.push(module);
        });

        // only listen for scroll events
        $window.on('scroll', onScroll);

        // only listen for scroll events
        window.addEventListener('resize', onResize, false);

        requestTick();

        // ---------------------------------------
        // Packery
        // ---------------------------------------
        var $container = $('.module-wrapper').packery({
            itemSelector: '.module',
            columnWidth: '.grid-sizer',
            rowHeight: 115,
            gutter: '.gutter-sizer'
        });

        $('.module').each( function( i, item ) {
            // make element draggable with Draggabilly
            var draggie = new Draggabilly( item );
			draggies.push(draggie);
			draggie.disable();
            // bind Draggabilly events to Packery
            $container.packery( 'bindDraggabillyEvents', draggie );
            draggie.on( 'dragStart', onDragStart );
            //draggie.on( 'dragMove', onDragMove );
        });

        $container.packery( 'on', 'layoutComplete',
          function() {
            requestTick();
          }
        );

        $container.packery( 'on', 'dragItemPositioned',
          function() {
            $ppContainer.removeClass('dragging');
            requestTick();
            stopDragTimer();
          }
        );
    };
	
    function onDragStart( draggie ) {
        $ppContainer.addClass('dragging');

        // Fire custom event
        startDragTimer();
    }

    function startDragTimer() {
        dragTimer = setInterval(function() {
            requestTick();
        }, (1000 / 60)); // 60 FPS
    }

    function stopDragTimer() {
        clearInterval(dragTimer);
    }
	
	$scope.toggleDragging = function() {
	  toggle = !toggle;
	  if (toggle) {
		$scope.txtToggleDragging = "Disable Dragging";
		for(var i = 0; i < draggies.length; i++) {
		  draggies[i].enable();
		}
	  } else {
		$scope.txtToggleDragging = "Enable Dragging";
		for(var i = 0; i < draggies.length; i++) {
		  draggies[i].disable();
		}
	  }
	}

    // Start it all
    init();

});