function recaptchaCallback() {
    document.getElementById('error-checker').value = 'nonEmpty';
}

(function(window, document) {
    window.ARCADIA = window.ARCADIA || {};

    ARCADIA.init = function() {

        // Initialize Utility and Common functions
        ARCADIA.util.init();
        ARCADIA.common.init();

        // Add "data-page" to body tag to trigger page-specific function
        var page = document.body.getAttribute("data-page");

        if (ARCADIA[page] && typeof ARCADIA[page]["init"] === "function") {
            ARCADIA[page]["init"]();
        }
    };

    /*
     * Utility/Helper
     */
    ARCADIA.util = {
        init: function() {
            var _this = this;
        }
    };

    /*
     * Common/Site-Wide
     */
    ARCADIA.common = {
        init: function() {
            var _this = this;

            _this.registerVideos();
            _this.initSliders();
            _this.initTabs();
            _this.toggleWeatherPanel();
            // _this.getWeather();
            _this.toggleMobileNav();
            _this.registerModals();
            // _this.initStickyNav();
            _this.insertDatePicker();
        },

        insertDatePicker: function () {
            $("input[name*='Date']").each(function() {
                $(this).datepicker({
                  dateFormat: 'yy-mm-dd',  // Format: YYYY-MM-DD
                  changeMonth: true,
                  changeYear: true,
                  showButtonPanel: true,
                  closeText: 'Close'
                });
              });
        },

        initStickyNav: function () {
            addPadding();
            window.onresize = addPadding;

            function addPadding() {
                var height = document.querySelector('[data-nav]').offsetHeight;
                console.log(height);
                document.body.style.padding = height + 'px 0 0 0';
            }
        },

        registerVideos: function() {

            $('.js-video-btn').click(function() {
                var iframe = $(this).siblings('iframe');
                var src = iframe.data("src");
                iframe.fadeIn("slow");
                $(this).fadeOut("slow");
            });

        },

        registerModals: function() {
            const modalToggles = document.querySelectorAll('[data-modal-toggle]')

            if (!modalToggles) {
                return
            }

            modalToggles.forEach(function (toggle) {
                toggle.addEventListener('click', function (e) {
                    var id = e.currentTarget.dataset.modalToggle
                    var modal = document.querySelector(`[data-modal="${id}"]`)

                    if (!modal) {
                        return
                    }

                    var iframe = modal.querySelector('iframe')
                    if (modal.classList.contains('is-visible')) {
                        modal.classList.remove('is-visible')
                    } else {
                        modal.classList.add('is-visible')
                        modal.querySelector('iframe')
                    }
                    iframe.src = iframe.src
                })
            })
        },

        initSliders: function() {
            var sliders = $('.gallery');

            sliders.slick({
                centerMode: true,
                slidesToShow: 1,
                arrows: true,
                dots: false,
                infinite: true,
                speed: 500,
                centerPadding: '10%',
                adaptiveHeight: true,
                // fade: true,
                autoplay: false,
                autoplaySpeed: 2500,
                pauseOnHover: false,
                cssEase: 'linear',
                responsive: [
                     {
                        breakpoint: 740,
                        settings: {
                           arrows: false,
                           centerPadding: 0,
                        }
                     },
                ],
            });
        },

        initTabs: function() {
            $('.tabs__link').click(function(e) {
                e.preventDefault();
                var id = $(this).attr('data-tab');

                $('.tabs__link').removeClass('active');
                $('.tabs__content').removeClass('active');

                $(this).addClass('active');
                $(".tabs__content[data-content='" + id + "']").addClass('active');
            })
        },

        toggleWeatherPanel: function() {
            $('.js-weather-toggle').click(function() {
                $(this).siblings('.weather-panel').toggleClass('show');
            });
        },

        // getWeather: function() {
        //     console.log('get weather');
        //     $.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2673ef5c550abcb1a8f90394bbd20ddd/44.4779,-86.2515789', function(data) {
        //         var currently = data.currently;
        //         // console.log(currently.icon);
        //         // Small Widget
        //         $('.weather-sm__inner').html(
        //             '<span class="weather-sm__temp">' + Math.round(currently.temperature) + '&deg;</span>' +
        //             '<span class="weather-sm__icon ' + setWeatherIcon(currently.icon) + '"></span>'
        //         );
        //         // Today
        //         $('.weather-panel__today').html(
        //             '<h2 class="weather-panel__today-headline">' + moment(currently.time * 1000).format("dddd, MMM D h:m A") + '</h2>' +
        //             '<p class="weather-panel__today-forcast"><span class="weather-panel__today-forecast-icon ' + setWeatherIcon(currently.icon) + '"></span> <span class="weather-panel__today-forecast-label">' + currently.summary + '</span></p>'
        //         );
        //         // Current Conditions
        //         $('.weather-panel__conditions-temp').html(Math.round(currently.temperature) + '&deg;');
        //         $('.weather-panel__conditions-list').html(
        //             '<dt class="weather-panel__conditions-list-label">Wind:</dt>' +
        //             '<dd class="weather-panel__conditions-list-term">' + currently.windSpeed + ' MPH' + ' ' + getCardinal(currently.windBearing) + '</dd>' +
        //             '<dt class="weather-panel__conditions-list-label">Humidity:</dt>' +
        //             '<dd class="weather-panel__conditions-list-term">' + (currently.humidity * 100) + '%</dd>' +
        //             '<dt class="weather-panel__conditions-list-label">Feels Like:</dt>' +
        //             '<dd class="weather-panel__conditions-list-term">' + Math.round(currently.apparentTemperature) + '&deg;</dd>'
        //         );

        //         // Five Day Forcast
        //         // Get next 5 days in forecase
        //         var forecast = data.daily.data.slice(1, 6);
        //         // Loop through each object in array
        //         $.each(forecast, function(i, val) {
        //             // Append to container
        //             // console.log(val.icon);
        //             $('.weather-panel__five-day-list').append(
        //                 '<dt class="weather-panel__five-day-label">' + moment(val.time * 1000).format("dddd") + '</dt>' +
        //                 '<dd class="weather-panel__five-day-temp">' + Math.round(val.temperatureLow) + '&deg; / ' + Math.round(val.temperatureHigh) + '&deg;</dd>' +
        //                 '<dd class="weather-panel__five-day-icon ' + setWeatherIcon(val.icon) + '"></dd>'
        //             );
        //         });

        //         // Convert Compass Direction to Cardinal Direction (i.e. "N/NE/E/SE/S/SW/W/NW/N")
        //         function getCardinal(num) {
        //             var val = Math.floor((num / 22.5) + 0.5);
        //             var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        //             return arr[(val % 16)];
        //         }

        //         function setWeatherIcon(code) {
        //             var icon = '';
        //             switch (code) {
        //                 case 'day-sunny':
        //                 case 'sunny':
        //                     icon = 'wi-forecast-io-clear-day';
        //                     break;
        //                 case 'night-clear':
        //                 case 'clear':
        //                 case 'day-clear':
        //                     icon = 'wi-forecast-io-clear-night';
        //                     break;
        //                 case 'rain':
        //                     icon = 'wi-forecast-io-rain';
        //                     break;
        //                 case 'snow':
        //                     icon = 'wi-forecast-io-snow';
        //                     break;
        //                 case 'sleet':
        //                     icon = 'wi-forecast-io-sleet';
        //                     break;
        //                 case 'strong-wind':
        //                     icon = 'wi-forecast-io-wind';
        //                     break;
        //                 case 'wind':
        //                     icon = 'wi-forecast-io-wind';
        //                     break;
        //                 case 'fog':
        //                     icon = 'wi-forecast-io-fog';
        //                     break;
        //                 case 'cloudy':
        //                     icon = 'wi-forecast-io-cloudy';
        //                     break;
        //                 case 'day-cloudy':
        //                 case 'partly-cloudy-day':
        //                     icon = 'wi-forecast-io-partly-cloudy-day';
        //                     break;
        //                 case 'night-cloudy':
        //                 case 'partly-cloudy-night':
        //                     icon = 'wi-forecast-io-partly-cloudy-night';
        //                     break;
        //                 case 'hail':
        //                     icon = 'wi-forecast-io-hail';
        //                     break;
        //                 case 'thunderstorm':
        //                     icon = 'wi-forecast-io-thunderstorm';
        //                     break;
        //                 case 'tornado':
        //                     icon = 'wi-forecast-io-tornado';
        //                     break;
        //                 default:
        //                     icon = 'wi-forecast-io-cloudy';
        //                     break;
        //             }

        //             return 'wi ' + icon;
        //         }

        //     });
        // },

        toggleMobileNav: function() {
            $('.js-nav-toggle').click(function() {
                $('.nav-mobile').toggleClass('show');
            });
        },

    };

    /*
     * Page-Specific
     */
    ARCADIA.home = {
        init: function() {
            var _this = this;

            _this.initSlider();
        },

        initSlider: function() {
            var slider = $('.home-slider');

            slider.on('init reInit', function(event, slick, currentSlide) {
                var label = [];
                var count = 0;

                $('.home-slider__slide').each(function() {
                    // Push data label to array
                    label.push($(this).data('label'));
                });

                $('.home-slider .slick-dots li').each(function() {
                    // Add animation to fist slick dot
                    if (count == 0) {
                        $(this).addClass('slick-animation');
                    }
                    // Add label
                    $(this).append('<span class="home-slider__label">' + label[count] + '</span>');
                    count++;
                });
            });

            slider.slick({
                pauseOnFocus: false,
                pauseOnHover: false,
                pauseOnDotsHover: false,
                arrows: false,
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                autoplay: true,
                autoplaySpeed: 5000, // Be sure to adjust timing of animation in _partials/home.scss
                cssEase: 'linear'
            });

            slider.on('beforeChange', function(event, slick, currentSlide) {
                if (currentSlide == 0) {
                    $('#slick-slide00').addClass('slick-animation');
                }
                $('.slick-active').removeClass('slick-animation');
            });

            slider.on('afterChange', function(event, slick, currentSlide) {
                $('.slick-active').addClass('slick-animation');
            });
        },

        registerVideos: function() {

            $('.js-video-btn').click(function() {
                var iframe = $(this).siblings('iframe');
                var src = iframe.data("src");
                iframe.fadeIn("slow");
                $(this).fadeOut("slow");
            });

        },

    };

    ARCADIA.giftCards = {
        init: function() {
            var _this = this;

            _this.placeOrder();
        },

        placeOrder: function() {

            $("#gc-form").parsley();

            // show or hide the remove card button
            function toggleRemoveCard() {
                var cardCount = $('.field--gift').length - 2;
                if (cardCount == 1) {
                    $('.gc-remove').hide();
                } else {
                    $('.gc-remove').show();
                }
                buildLineItems();
            }

            toggleRemoveCard();

            // add a new gift card row
            $('.gc-add').on('click', function(e) {
                var parent = $(this).parent().parent();
                var cloneSource = parent.children('.field--gift').eq(1).clone();
                parent.children('.field--gift').eq(-2).after(cloneSource);
                toggleRemoveCard();
                buildLineItems();
            });

            // remove a gift card row
            $('#gc-form').on('click', '.gc-remove', function(e) {
                $(this).parent().remove();
                toggleRemoveCard();
            });

            // Build Line Items Array
            var lineItems = [];
            buildLineItems();

            // Call on input change
            $(document).on('change', '[data-qty]', function(e) {
                buildLineItems();
            });

            function buildLineItems() {
                lineItems = [];
                $('[data-qty]').each(function() {
                    if($(this).attr('id') == 'amount') {
                        var name = '$' + $(this).val() + ' Gift Card';
                        var qty = 1;
                        var unitCost = $(this).val();
                    } else {
                        var name = $(this).attr('aria-label');
                        var qty = $(this).val();
                        var unitCost = $(this).attr('data-unit-cost');
                    }

                    if(qty > 0) {
                        var lineItem = {
                            qty: qty,
                            unitCost: unitCost,
                            name: name
                        }
                        lineItems.push(lineItem);
                    }
                });
                drawTable(lineItems);
            }

            // Draw Cart Table
            function drawTable(lineItems) {
                $('[data-cart-table] tbody tr').remove();
                var i;
                var total = 0;
                if(lineItems.length > 0) {
                    for (i = 0; i < lineItems.length; i++) {
                        $('[data-cart-table] tbody').append('<tr><td>' + lineItems[i].name + '</td><td>$' + lineItems[i].unitCost + '</td><td>' + lineItems[i].qty + '</td><td>$' + (lineItems[i].qty * lineItems[i].unitCost) + '</td>');
                        total += (lineItems[i].qty * lineItems[i].unitCost)
                    }
                    $('[data-cart-total]').html('$' + total);
                } else {
                    $('[data-cart-total]').html('$0');
                }
            }

            $("#gc-form").on('submit', function(e) {
              e.preventDefault();
              $(this).parsley().validate();

              if($(this).parsley().isValid()) {
            		// process the form
            		$.ajax({
            			type: 'POST',
            			url: 'charge.php',
            			data: $(this).serialize(),
            			dataType: 'json',
            			encode: true
            		})
           			// using the done promise callback
           			.done(function(data) {
           				// here we will handle errors and validation messages
           				if(data.success) {
           					window.location = '/gift-cards?message=thank-you'; // redirect a user to another page
           				}
           			})
           			// using the fail promise callback
           			.fail(function(data) {
                        console.log("There was an error in processing your submission");
           			});
                }
            });

        },

    };

    ARCADIA.holeEntry = {
        init: function() {
            var _this = this;

            _this.mobileNavToggle();
        },

        mobileNavToggle: function() {
            $('.holy-entry__mobile-nav-select').on('change', function () {
               var url = $(this).val(); // get selected value
               if (url) { // require a URL
                  window.location = url; // redirect
               }
               return false;
            });
        },

    };

    ARCADIA.init();
})(window, document);
