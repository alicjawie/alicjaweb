$(document).ready(function() {

    //===========================ANIMACJA NAWIGACJI++++++++++++++++

    function registerMobileNavigationAnimation() {
        $('.hamburger-icon').on("click", function(event) {
            let height = $(".nav-container").css("height");
    
            if (height == "60px") {
                openNavigation();
    
                $(".nav__item").on("click", function() {
                    closeNavigation();
     
                    toggleMobileLinkNameOnClick(this);
                });

                $(".section").on("click", function() {
                    closeNavigation();
                });
              
            } else {
                closeNavigation();
            }
        });
    }


    function toggleMobileLinkNameOnClick(sectionName) {
        $('.hamburger-icon').children().remove();
        $('.hamburger-icon').append('<span> <i class="fa fa-bars"></i>' + $(sectionName).text() + '</span>');
    }

    function toggleMobileLinkNameOnScroll(sectionName) {
        $('.hamburger-icon').children().remove();
        $('.hamburger-icon').append('<span> <i class="fa fa-bars"></i>' + sectionName + '</span>');
    }

    function closeNavigation() {
        animateNavigationHeight(60);
    }

    function openNavigation() {
        animateNavigationHeight(280);
    }

    function animateNavigationHeight(pixels) {
        $(".nav-container").animate({
            "height": pixels + 'px'
        }, 200);
    }

    //=========================ANIMACJA PROJEKTOW===================

    let windowSize = $(window).width();

    function registerWindowSize() {
        if (windowSize >= 768) {
            registerProjectContainerAnimation();
        }
    }

    function registerProjectContainerAnimation() {
        $('.project-container__element').hover( 
            function() {
            $(this).children().children().last().animate({
                "top": "10%"
            }, 200)},
            function() {
                $(this).children().children().last().animate({
                    "top": '90%'
                }, 200)
            }
        );
    }

    ///==========SCROLL NA CLICK+++++++++++++++

    function registerScrollOnNavClick() {
        $('.nav__item').click(function() {

            $(".nav__item").removeClass("active");
    
            let target = $(this).children().text().toLowerCase();
    
            $(this).addClass("active");
    
            $('html, body').animate({
                scrollTop: $('#'+ target).offset().top
            }, 500);
    
        });
    }

    ////=======scroll na scroll================
    function setActiveNavigationLink(i) {
        $(".nav__item").removeClass("active");
        let linksList = $(".nav__item");
        let activeElement = linksList.eq(i);
        activeElement.addClass("active");
    }

    function getSectionList() {
        return $('#fullpage').find("section");
    }

    function isBetweenSections() {
        let sectionList = getSectionList();

        for (let i = 0; i < sectionList.length; i++) {
            // console.log("sectionList: " + sectionList[i]);
            // console.log("i = " + i);
            // console.log("section top: " + sectionList[i].getBoundingClientRect().top);
            console.log("is in viewport " + isInViewport(sectionList[i]));
            if (sectionList[i].getBoundingClientRect().top > 0) {

                console.log(sectionList[i].getBoundingClientRect().top);
                return i;
            } 
        }
        return -1;
    }

    // console.log(isBetweenSections());

    isBetweenSections();

    function getCurrentSectionIndex() {
        let sectionList = getSectionList();

        for (let i = 0; i < sectionList.length; i++) {
            // console.log("sectionList: " + sectionList[i]);
            // console.log("i = " + i);
            // console.log("section top: " + sectionList[i].getBoundingClientRect().top);
            // console.log("is in viewport " + isInViewport(sectionList[i]));
            if (sectionList[i].getBoundingClientRect().top === 0) {
                return i;
            } 
        }
        return -1;
    }

    let listenerEnabled = true;

    function registerScrollOnUpDownArrows() {
        window.addEventListener('keydown', function(event) {          
            if (event.keyCode === 40 || event.which === 40) {
                goToNextSection();
            } else if  (event.keyCode === 38 || event.which === 38) {
                goToPreviousSection();
            }
        });
    }

    function goToNextSection() {
        let currentSection = getCurrentSectionIndex();
        let sectionList = getSectionList();
        let nextSectionId = sectionList[currentSection + 1];

        if (currentSection < sectionList.length - 1) {
            $('html, body').animate({
                scrollTop: $(nextSectionId).offset().top
            }, 500, 'swing', function() {
                listenerEnabled = true;
            }); 
            listenerEnabled = false; 
            setActiveNavigationLink(currentSection + 1);
            toggleMobileLinkNameOnScroll(nextSectionId.id);
        }
    }

    function goToPreviousSection() {
        let currentSection = getCurrentSectionIndex();
        let sectionList = getSectionList();
        let prevSectionId = sectionList[currentSection - 1];

        if (currentSection > 0) {
            $('html, body').animate({
                scrollTop: $(prevSectionId).offset().top
            }, 500, 'swing', function() {
                listenerEnabled = true;
            }); 
            listenerEnabled = false; 
            setActiveNavigationLink(currentSection - 1); 
            toggleMobileLinkNameOnScroll(prevSectionId.id);
            // console.log(prevSectionId.id);
        }        
    }

    function isInViewport(elem) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top = 0
        );
    };

    function registerMouseWheelListener(listener) {
        var myitem = document.getElementsByTagName('body')[0];
        if (myitem.addEventListener) {
            // IE9, Chrome, Safari, Opera
            myitem.addEventListener("mousewheel", MouseWheelHandler, false);
            // Firefox
            myitem.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
        }
        // IE 6/7/8
        else {
            myitem.attachEvent("onmousewheel", MouseWheelHandler);
        }

        function MouseWheelHandler(e) {
            e.preventDefault();
            // cross-browser wheel delta
            var e = window.event || e; // old IE support
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

            listener(delta);
            
            return false;
        }
    }

    function changeSectionOnWheel(delta) {

        if (listenerEnabled) {

            if (delta > 0) {
                goToPreviousSection();
            } else {
                goToNextSection();
            }
        }
    }

    function registerScrollOnMouseWheel() {
        registerMouseWheelListener(changeSectionOnWheel);
    }

    function init() {
        setActiveNavigationLink(getCurrentSectionIndex());
        registerScrollOnNavClick();
        registerMobileNavigationAnimation();
        registerScrollOnUpDownArrows();
        registerScrollOnMouseWheel();
        registerWindowSize();
    }

    init();
});


