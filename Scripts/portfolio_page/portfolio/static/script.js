gsap.registerPlugin(ScrollTrigger);

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-menu");

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

document.addEventListener('click', function (event) {
    const target = event.target;
    if (!hamburger.contains(target) && !nav.contains(target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// animations

// let service = gsap.utils.toArray(".services");
// let serviceScroll = gsap.to(service, {
//     ease: 'none',
//     duration: 1,
//     scrollTrigger: {
//         target: ".service-container",
//         pin: true,
//         start:"top center",
//         scrub:1,
//         end: "+=3000",
//         pinSpacing: true,
//         markers: true,
//     }
// });

ScrollTrigger.matchMedia({
    // mobile
    "(max-width: 768px)": function () {
        let section = gsap.utils.toArray(["#card1", "#card2", "#card3", "#card4"]);
        let scrollTween = gsap.to(section, {
            xPercent: -100 * (section.length - 1),
            ease: 'none',
            duration: 1,
            scrollTrigger: {
                trigger: ".card-container",
                pin: true,
                start: "top center",
                scrub: 1,
                end: "+=3000",
                pinSpacing: true, // Ensure enough space is preserved
                snap: 1 / (section.length - 1.5),
            }
        });
        gsap.from(".shead", {
            opacity: 1,
            y: 1,
            scrollTrigger: {
                trigger: ".shead",
                start: "top 30%",
                end: "+=3000",
                pin: true,
                scrub: true,
                pinSpacing: false,
                // markers: true,
            }
        });
        let service = gsap.utils.toArray([".services"]);

        let snaps = snapping => function () {
            if (service.height >= "50%") {
                1 / (service.height - 1)
            }
            else {
                1 / (service.height + 1)
            }
        }

        service.forEach((element, index) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top 20%",
                    end: "bottom top",  // Adjust this based on your content
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                    snap: {
                        snapTo: snaps,
                        // Or use "labels" if you have labels defined for precise snapping
                        duration: { min: 0.1, max: 0.2 },
                        ease: "power1.inOut"
                    },
                }
            });

            tl.from(element, {
                yPercent: "100%",
            });
        });


        let pinns = gsap.timeline({
            scrollTrigger: {
                trigger: "#pin",
                start: "top top",
                end: "+=6000",
                scrub: true,
                pin: true,
                pinSpacing: false,
            }
        });

    },

    // tab
    "(max-width: 1024px)": function () {


        let service = gsap.utils.toArray([".services"]);


        let snaps = snapping => function () {
            if (service.height >= "50%") {
                1 / (service.height - 1)
            }
            else {
                1 / (service.height + 1)
            }
        }

        service.forEach((element, index) => {
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top 20%",
                    end: "bottom top",  // Adjust this based on your content
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                    snap: {
                        snapTo: snaps,
                        // Or use "labels" if you have labels defined for precise snapping
                        duration: { min: 0.1, max: 0.2 },
                        ease: "power1.inOut"
                    },
                }
            });

            tl.from(element, {
                yPercent: "100%",
            });
        });


        let pinns = gsap.timeline({
            scrollTrigger: {
                trigger: "#pin",
                start: "top top",
                end: "+=6000",
                scrub: true,
                pin: true,
                pinSpacing: false,
            }
        })


        gsap.from(".shead", {
            scrollTrigger: {
                trigger: ".shead",
                start: "top 90%",
                end: "top center",
                scrub: true,
                pinSpacing: false,
                pin: false,
            },
        });

        gsap.from(".right-nav1", {
            scrollTrigger: {
                trigger: ".right-nav1",
                start: "top 90%",
                end: "top center",
                scrub: true,
            },
            scale: "0",
            x: "200",
            duration: "1"
        });

        gsap.from("#card1", {
            scrollTrigger: {
                trigger: "#card1",
                start: "top 90%",
                end: "top center",
                scrub: true,
            },
            x: "-500px",
            opacity: "0",
            duration: '1'
        });
        gsap.from("#card2", {
            scrollTrigger: {
                trigger: "#card2",
                start: "top 80%",
                end: "top center",
                scrub: true,
            },
            x: "+500px",
            opacity: "0",
            duration: '1'
        });
        gsap.from("#card3", {
            scrollTrigger: {
                trigger: "#card3",
                start: "top 90%",
                end: "top center",
                scrub: true,
            },
            x: "-500",
            opacity: "0",
            duration: "1"
        });
        gsap.from("#card4", {
            scrollTrigger: {
                trigger: "#card4",
                start: "top 90%",
                end: "top center",
                scrub: true,
            },
            x: "+=500px",
            opacity: "0",
            duration: "1"
        });
        let icon = gsap.utils.toArray(["#icon"]);
        gsap.from(icon, {
            scrollTrigger: {
                trigger: icon,
                start: "top 98%",
                end: "top 90%",
                scrub: true,
            },
            filter: "blur (20px)",
            x: "1000px"
        });

        let imgs = gsap.timeline({
            scrollTrigger:{
                trigger:".img-container",
                start:"top 90%",
                end: "top 10%",
                scrub:true,
                markers:true,
            }
        });
        imgs.from(".imgs", {x:"-200px", opacity:"0", delay:2, clearProps: "all"})
            .from(".imgs1", {x:"-300px", opacity:"0", clearProps: "all"}, "scene-1")
            .from(".imgs2", {x:"-400px", opacity:"0", delay:4, clearProps: "all"})
            .from(".imgs3", {x:"-500px",opacity:"0", clearProps: "all"})
    },
    // dekstop
    "(min-width: 1024px)": function () {

        let imgs = gsap.timeline({
            scrollTrigger:{
                trigger:".img-container",
                start:"top 90%",
                end: "top 10%",
                scrub:true,
            }
        });
        imgs.from(".imgs", {x:"-200px", opacity:"0", delay:2, clearProps: "all"})
            .from(".imgs1", {x:"-300px", opacity:"0", clearProps: "all"}, "scene-1")
            .from(".imgs2", {x:"-400px", opacity:"0", clearProps: "all"})
            .from(".imgs3", {x:"-500px",opacity:"0", delay:5, clearProps: "all"})


        let icon = gsap.utils.toArray(["#icon"]);
        gsap.from(icon, {
            scrollTrigger: {
                trigger: icon,
                start: "top 98%",
                end: "top 90%",
                scrub: true,
            },
            filter: "blur (20px)",
            x: "1000px"
        });


        let service = gsap.utils.toArray([".services"]);


        let snaps = snapping => function () {
            if (service.height >= "50%"){
                1 / (service.height -1)
            }
            else{
                1 / (service.height +1)
            }
        }

service.forEach((element, index) => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: "top 20%",
            end: "+=3000",  // Adjust this based on your content
            scrub: true,
            pin: true,
            pinSpacing: false,
            snap: {
                snapTo: snaps,
             // Or use "labels" if you have labels defined for precise snapping
                duration: { min: 0.1, max: 0.2 },
                ease: "power1.inOut"
            },
        }
    });

    tl.from(element, {
        yPercent: "100%",
    });
});


        let pinns = gsap.timeline({
            scrollTrigger: {
                trigger: "#pin",
                start: "top top",
                end: "+=6000",
                scrub: true,
                pin: true,
                pinSpacing: false,
            }
        })

        gsap.from(".shead", {
            scrollTrigger: {
                trigger: ".shead",
                start: "top 90%",
                end: "top center",
                scrub: true,
                pinSpacing: false,
                pin: false,
            },
        });

        gsap.from(".right-nav1", {
            scrollTrigger: {
                trigger: ".right-nav1",
                start: "top 90%",
                end: "top center",
                scrub: true,
            },
            scale: "0",
            x: "200",
            duration: "1"
        });
        gsap.from("#card1", {
            scrollTrigger: {
                trigger: "#card1",
                start: "top 90%",
                end: "top center",
                scrub: true,
            },
            x: "-=200",
            opacity: "0",
            duration: '1'
        });
        gsap.from("#card2", {
            scrollTrigger: {
                trigger: "#card2",
                start: "top 80%",
                end: "top center",
                scrub: true,
            },
            x: "-=500",
            opacity: "0",
            duration: '1'
        });
        gsap.from("#card3", {
            scrollTrigger: {
                trigger: "#card3",
                start: "top 90%",
                end: "top center",
                scrub: true,
            },
            y: "-=200",
            opacity: "0",
            duration: "1"
        });
        gsap.from("#card4", {
            scrollTrigger: {
                trigger: "#card4",
                start: "top 90%",
                end: "top center",
                scrub: true,
            },
            y: "-=200",
            opacity: "0",
            duration: "1"
        });
    },

})