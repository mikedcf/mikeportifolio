// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-= SISTEMA PORTFOLIO












// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-= ANIMACOES GSAP

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);


// animacao do scroll lento
ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
});

function animarPagina(){
    
    // animacao de entrada hero
    gsap.from('.hero', {
        opacity: 0,
        duration: 1,
        
    })
    
    gsap.from('picture:nth-child(2)', {
        y: 200,
        duration: 1,
        
    })
    
    gsap.from('picture:nth-child(1)', {
        y: -60,
        duration: 1,
        
    })
    
    
    
    // ANIMACOES CARDS
    
    gsap.from(".card", {
        opacity: 0,
        stagger: 0.3,
        filter: "blur(10px)",
        scrollTrigger: {
            // trigger: ".sectionCidade",
            trigger: ".cards",
            
            start: "0% 80%",
            end: "100% 70%",
            scrub: true,
        }
    })
    
    
    
    
    gsap.from(".secaoObrigado ul li",{
        opacity: 0,
        duration: 2,
        stagger: 0.5,
        filter: "blur(10px)",
        x: 40,
        scrollTrigger: {
            trigger: ".secaoObrigado ul",
            start: "0% 80%",
            end: "100% 50%",
            scrub: true,
        }
    
    })
    
    
    
    // ANIMACOES FOOTER
    
    
    
    gsap.from("footer", {
        y:-400,
        immediateRender: false,
    
        scrollTrigger: {
            trigger: "footer",
            start: "0% 100%",
            end: "100% 100%",
            scrub: true,
            invalidateOnRefresh: true,
        }
    })
    
    
    
    // LETRAS SURGINDO 
    
    // type: "chars", -- divide por carcteres
    // words -- divide por palavras
    
    // const split = SplitText.create(".textoSplit", {
    //     type: "lines,chars, words",
    //     mask: ""
    // })
    
    
    
    const grupoTexto = document.querySelectorAll(".textoSplit")



    grupoTexto.forEach((item) => {
        const split = SplitText.create(item, {
            type: "lines,chars, words"
        })
        gsap.from(split.chars, {
            opacity: 0,
            y: 40,
            duration: .3,
            stagger: .03,
            filter: "blur(10px)",
            scrollTrigger: {
                trigger: item,
            }
         
        })
    })
}

// PRELOAD DA LOGO

const tl = gsap.timeline({
    onComplete(){
        animarPagina();
        gsap.to("#preloader", {
            opacity: 0,
            display: "none",
        })
        
    }
});


tl.to('#preloader path', {
    duration: 1,
    strokeDashoffset: 0
})


tl.to('#preloader path', {
    fill: "rgb(168, 19, 19)",
    duration: .5,
    strokeDashoffset: 0
    
})










