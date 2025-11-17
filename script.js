window.addEventListener("load", () => {
    gsap.registerPlugin(SplitText, CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1"); // fixed commas

    const createSplit = (selector, type, className) => {
        return new SplitText(selector, {
            type: type,
            [type + "Class"]: className,
            mask: type,
        });
    };

    const splitPreloaderHeader = createSplit(
        ".preloader-header a",
        "chars",
        "char"
    );

    const splitPreloaderCopy = createSplit(".preloader-copy p", "lines", "line");
    const splitHeader = createSplit(".header-row h1", "lines", "line");

    const chars = splitPreloaderHeader.chars;
    const lines = splitPreloaderCopy.lines;
    const headerLines = splitHeader.lines;
    const initialChar = chars[0];
    const lastChar = chars[chars.length - 1]; 

    chars.forEach((char, index) => {
        gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
    });

    gsap.set(lines, { yPercent: 100 });
    gsap.set(headerLines, { yPercent: 100 });

    const preloaderImages = gsap.utils.toArray(".preloader-images .img");
    const preloaderImagesInner = gsap.utils.toArray(".preloader-images .img img");
    const t1 = gsap.timeline();

    t1.to(".progress-bar", {
        scaleX: 1,
        duration: 4,
        ease: "power3.inOut",
    })
    .set(".progress-bar", { transformOrigin: "right" })
    .to(".progress-bar", {
        scaleX: 0,
        duration: 1,
        ease: "power3.in",
    });

    preloaderImages.forEach((preloaderImg, index) => {
        t1.to(
            preloaderImg,
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
                ease: "hop",
                delay: index * 0.75, 
            },
            "-=5"
        );
    });


    preloaderImagesInner.forEach((preloaderImageInner, index) => {
        t1.to(
            preloaderImageInner,
            {
                scale: 1,
                duration: 1.5,
                ease: "hop",
                delay: index * 0.75,
            },
            "-=5.25"
        );
    })


    t1.to(
        lines,
        {
            yPercent: 0,
            duration: 2,
            ease: "hop",
            stagger: 0.1,
        },
        "-=5.5"
    );

    t1.to(
        chars,
        {
            yPercent: 0,
            duration: 1,
            ease: "hop",
            stagger: 0.025,
        },
        "-=5"
    );

    t1.to(
        ".preloader-images",
        {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
        },
        "-=1.5"
    );

    t1.to(
        lines,
        {
            y: "-125%",
            duration: 2,
            ease: "hop",
            stagger: 0.1,
        },
        "-=2"
    );


    t1.to (
        chars,
        {
            yPercent: (index) => {
                if (index === 0 || index === chars.length - 1) {
                    return 0;
                }
                return index % 2 === 0 ? 100 : -100;
            },
            duration: 1,
            ease: "hop",
            stagger: 0.025,
            delay: 0.5,
            onStart: () => {
                const initialCharMask = initialChar.parentElement;
                const lastCharMask = lastChar.parentElement;

                if (
                    initialCharMask &&
                    initialCharMask.classList.contains("char-mask")
                ) {
                    initialCharMask.style.overflow = "visible";
                }

                if (lastCharMask && lastCharMask.classList.contains("char-mask")) {
                    lastCharMask.style.overflow = "visible";
                }

                const viewportWwidth = window.innerWidth;
                const centerX = viewportWwidth / 2;
                const initialCharRect = initialChar.getBoundingClientRect();
                const lastCharReact = lastChar.getBoundingClientRect();

                gsap.to([initialChar, lastChar], {
                    duration: 1,
                    ease: "hop",
                    delay: 0.5,
                    x: (i) => {
                        if (i === 0) {
                            return centerX - initialCharRect.left - initialCharRect.width;
                        } else {
                            return centerX - lastCharReact.left;
                        }
                    },
                    onComplete: () => {
                        gsap.set(".preloader-header", { mixBlendMode: "difference" });
                        gsap.to(".preloader-header", {
                            y: "2rem",
                            scale: 0.22,
                            duration: 1.75,
                            ease: "hop",
                        });
                    },
                });
            },

        },
        "-=2.5"
    );


    t1.to(
        ".preloader",
        {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1.75,
            ease: "hop",
        },
        "-=0.5"
    );

    t1.to(
        ".header-row .line",
        {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
        },
        "-=0.75"
    );

    t1.to(
        ".divider",
        {
            scaleX: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
        },
        "<"
    );



});

   
















console.log(gsap);
