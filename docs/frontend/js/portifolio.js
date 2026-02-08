// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-= SISTEMA PORTFOLIO



// Sistema de navegação por âncoras (configurado após ScrollSmoother)
document.querySelectorAll("[data-scroll]").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const targetId = link.dataset.scroll;
        const target = document.getElementById(targetId);

        if (!target) {
            console.warn(`Elemento com id "${targetId}" não encontrado`);
            return;
        }

        // Calcula o offset do header fixo (altura aproximada do header)
        const headerOffset = 100;
        
        // Usa ScrollSmoother para scroll suave
        if (smoother) {
            // ScrollSmoother.scrollTo pode receber elemento ou posição numérica
            // Para considerar o header fixo, calculamos a posição com offset
            const targetPosition = target.offsetTop - headerOffset;
            smoother.scrollTo(targetPosition, true);
        } else {
            // Fallback para scroll nativo suave
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// SISTEMA DE CARROSSEL 

data = [
    {
        titulo: "Patinhas Seguras",
        descricao: "Projeto feito no Senac no curso de programação web feito em frontend com HTML,CSS,JS e backend node com express",
        imagem: "https://i.ibb.co/bM4BtdSD/patinhas-seguras.webp",
        categoria: "web",
        link: "https://mikedcf.github.io/patinhas-seguras/"
    },
]

let number = 0;

// Funções nomeadas para poder remover os event listeners depois
async function cliqueEsquerda() {
    // passa o slider
    number += 1;   
    await carrossel();
}

async function cliqueDireita() {
    // volta o slider
    number -= 1;
    await carrossel();
}

document.getElementById("arrowEsquerda").addEventListener("click", cliqueEsquerda);
document.getElementById("arrowDireita").addEventListener("click", cliqueDireita);

async function carrossel(){
    const containerSlider = document.getElementById("sliderProjetos");
    const tituloSlider = document.getElementById("tituloProjeto");
    const descricaoSlider = document.getElementById("descricaoProjeto");
    const setaDireita = document.getElementById("arrowDireita")
    const setaEsquerda = document.getElementById("arrowEsquerda")

    if(number > data.length -1){
        number = data.length - 1;
        return;
    }

    if(number < 0){
        number = 0;
        return;
    }


    const dados = data[Number(number)]

    gsap.to([containerSlider, tituloSlider, descricaoSlider], {
        opacity: 0,
        y: 30,
        duration: 0.3,
        onComplete: () => {

            containerSlider.style.backgroundImage = `url(${dados.imagem})`;
            tituloSlider.textContent = dados.titulo;
            descricaoSlider.textContent = dados.descricao;

            gsap.to([containerSlider, tituloSlider, descricaoSlider], {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            });
            atualizarDots();
        }
    });
}

function recProjeto(link){
    console.log(link);
    // Só abre o link se ele não estiver vazio
    if(link && link.trim() !== ""){
        window.open(link, "_blank");
    }
}



const dotsContainer = document.getElementById("dotsCarrossel");

function criarDots() {
    dotsContainer.innerHTML = "";

    data.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        dot.addEventListener("click", async () => {
            number = index;
            await carrossel();
            atualizarDots();
        });

        dotsContainer.appendChild(dot);
    });

    atualizarDots();
}

function atualizarDots() {
    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === number);
    });
}


const slider = document.getElementById("sliderProjetos");

let startX = 0;
let endX = 0;
const minSwipe = 70; // distância mínima pra considerar swipe

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
});

slider.addEventListener("touchend", async () => {
    const diff = startX - endX;

    // swipe para esquerda → próximo
    if (diff > minSwipe) {
        number += 1;
        await carrossel();
    }

    // swipe para direita → anterior
    if (diff < -minSwipe) {
        number -= 1;
        await carrossel();
    }
});

// SISTEMA DE TEMA

let darkMode = true;
let themeColor = false;

const btnTheme = document.getElementById("btnTheme");
const transition = document.querySelector(".theme-transition");

btnTheme.addEventListener("click", (e) => {

    if (themeColor) {
        themeColor = false;
        transition.style.background = "#6805d8";
        document.getElementById("logo-icon-img").src = "../img/md-logo.svg";
        document.getElementById("curriculoicon").src = "../img/arrow.svg";
        document.getElementById("tema-icon-img").src = "../img/tema.svg";
        document.getElementById("railway-icon-img").src = "../img/railway-logo.svg";
        document.getElementById("git-icon-img").src = "../img/gitbranco.svg";

        document.getElementById("auto-icon").src = "../img/tools.svg";
        document.getElementById("dev-icon").src = "../img/dev.svg";
        document.getElementById("site-icon").src = "../img/sitewithe.svg";
        document.getElementById("python-icon").src = "../img/pythonwhite.svg";
        document.getElementById("soft-icon").src = "../img/softwhit.svg";
        document.getElementById("pc-icon-img").src = "../img/pcmanutencao.svg";

        document.getElementById("git-icon-img-backend").src = "../img/gitbranco.svg";
        document.getElementById("railway-icon-img-backend").src = "../img/railway-logo.svg";

        document.getElementById("linha-icon-img").src = "../img/linha-black.svg";
        document.getElementById("d-icon").src = "../img/D.svg";
        document.getElementById("e-icon").src = "../img/E.svg";
        document.getElementById("v-icon").src = "../img/V.svg";
        document.getElementById("projetoicon").src = "../img/arrow.svg";

        document.getElementById("git-icon-contato").src = "../img/gitbranco.svg";
    } else {
        transition.style.background = "#f5f5ff";
        document.getElementById("logo-icon-img").src = "../img/logo-linearcolor.svg";
        document.getElementById("curriculoicon").src = "../img/seta-black.svg";
        document.getElementById("tema-icon-img").src = "../img/eclipse.svg";
        document.getElementById("railway-icon-img").src = "../img/railway-roxo.svg";
        document.getElementById("git-icon-img").src = "../img/github-fill-svgrepo-com.svg";

        document.getElementById("auto-icon").src = "../img/tools-svgrepo-com.svg";
        document.getElementById("dev-icon").src = "../img/dev-to-svgrepo-com.svg";
        document.getElementById("site-icon").src = "../img/site-svgrepo-com.svg";
        document.getElementById("python-icon").src = "../img/python-svgrepo-com (1).svg";
        document.getElementById("soft-icon").src = "../img/software-svgrepo-com.svg";
        document.getElementById("pc-icon-img").src = "../img/pc-computer-engineering-svgrepo-com.svg";

        document.getElementById("git-icon-img-backend").src = "../img/github-fill-svgrepo-com.svg";
        document.getElementById("railway-icon-img-backend").src = "../img/railway-roxo.svg";

        document.getElementById("linha-icon-img").src = "../img/linha-black.svg";
        document.getElementById("d-icon").src = "../img/D-black.svg";
        document.getElementById("e-icon").src = "../img/E-black.svg";
        document.getElementById("v-icon").src = "../img/V-black.svg";
        document.getElementById("projetoicon").src = "../img/seta-black.svg";

        document.getElementById("git-icon-contato").src = "../img/github-black.svg";
        themeColor = true;
    }

    const x = e.clientX;
    const y = e.clientY;

    gsap.set(transition, {
        clipPath: `circle(0% at ${x}px ${y}px)`
    });

    gsap.to(transition, {
        clipPath: `circle(150% at ${x}px ${y}px)`,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
            document.body.classList.toggle("light-theme");

            gsap.to(transition, {
                clipPath: `circle(0% at ${x}px ${y}px)`,
                duration: 0.8,
                ease: "power3.inOut"
            });
        }
    });

    darkMode = !darkMode;
});


// MENU HAMBURGUER


// MENU HAMBURGUER
let openMenu = false;
document.getElementById("btnHamburguer").addEventListener("click", (e) => {
    console.log("ok");
    e.stopPropagation(); // clicar dentro do menu não fecha
    document.getElementById("menuhumburguer").classList.toggle("active");
});

document.getElementById("menuhumburguer").addEventListener("click", (e) => {
    e.stopPropagation(); // clicar dentro do menu não fecha
});

document.addEventListener("click", () => {
    document.getElementById("menuhumburguer").classList.remove("active"); // clique fora fecha
});


const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if(window.scrollY > 30){
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-= ANIMACOES GSAP
gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText);


// PARA DESCER A PAGINA SUAVEMENTE
const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true,
});




function animarPagina(){

    const tl = gsap.timeline();

   
    const textoAnimado = document.querySelectorAll(".animation-text");

    textoAnimado.forEach((item) => {
        const split = SplitText.create(item, {
            type: "lines,chars, words"
        })
        gsap.from(split.chars, {
            opacity: 0,
            y: 40,
            duration: .5,
            stagger: .03,
            filter: "blur(10px)",
            scrollTrigger: {
                trigger: item,

            }
         
        });
    });



    // ANIMACAO DO TITULO 

    // "SOBRE"
    tl.from(".tituloAnimation", {
        opacity: 0,
        x: -100,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".sobre",
            start: "0% 60%",
            end: "20% 60%", 
            scrub: true,
        }
    })

    // SOBRE TEXTO
    tl.from(".sobreTextoAnimation",{
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: .03,
        filter: "blur(10px)",
        scrollTrigger:{
            trigger: ".sobre",
            start: "0% 60%",
            end: "20% 60%", 
            scrub: true,
        }
    })


    // BOTAO CURRICULO
    tl.from(".botaoAnimation", {
        opacity: 0,
        x: -300,
        duration: 2,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".sobre",
            trigger: ".sobre",
            start: "0% 60%",
            end: "20% 60%", 
            scrub: true,

        }
    })

    tl.from(".botaoAnimationimg", {
        opacity: 0,
        y: 100,
        duration: 1,
    })


    // MAPA DESENHO

    // LD ESQUERDO TEXTO E ICONES
    const textoldEsquerdo = document.querySelectorAll(".ldEquerdotexto");

    textoldEsquerdo.forEach((ldEquerdotexto) => {
        const split = SplitText.create(ldEquerdotexto, {
            type: "lines,chars, words"
        })
        gsap.from(split.chars, {
            opacity: 0,
            x: 40,
            duration: .5,
            stagger: .03,
            filter: "blur(10px)",
            scrollTrigger: {
                trigger: ldEquerdotexto,
                start: "0% 90%",
                end: "100% 50%", 
                scrub: true,

            }
         
        });
    });

    tl.from(".animationIcon",{
        opacity: 0,
        y: -40,
        rotate: 360,
        duration: .5,
        clearProps: "all",
        scrollTrigger: {

            trigger: ".ldEquerdotexto",
            start: "10% 100%",
            end: "40% 10%", 
            scrub: true,
        }
    })


    // LD DIREITO TEXTO E ICONES

    const textoldDireito = document.querySelectorAll(".ldDireitotexto");

    textoldDireito.forEach((ldDiretiotexto) => {
        const split = SplitText.create(ldDiretiotexto, {
            type: "lines,chars, words"
        })
        gsap.from(split.chars, {
            opacity: 0,
            x: -40,
            duration: .5,
            stagger: .03,
            filter: "blur(10px)",
            
            scrollTrigger: {
                trigger: ldDiretiotexto,
                start: "0% 90%",
                end: "100% 50%", 
                scrub: true,

            }
         
        });
    });



    tl.from(".iconsbox",{
        opacity: 2,
        x: -700,
        rotate: 360,
        duration: .2,
        stagger: .01,
        filter: "blur(10px)",
        clearProps: "all",
        scrollTrigger: {
            trigger: ".conteinerMap",
            start: "20% 50%",
            end: "35% 30%", 
            scrub: true,
        }
    })


    tl.from(".animationIcon",{
    opacity: 0,
    clearProps: "all",
    x: -40,
    rotate: 360,
    duration: .5,
    scrollTrigger: {
        trigger: ".conteinerMap",
        start: "0% 90%",
        end: "20% 60%", 
        scrub: true,
    }
    })


    // LINHA CENTRO

    tl.from(".linhaanimation", {
    opacity: 0,
    duration: .5,
    y: -100,
    filter: "blur(10px)",
    scrollTrigger: {
        trigger: ".conteinerMap",
        start: "0% 100%",
        end: "45% 40%", 
        scrub: true,
    }
    })


    // DEV ANIMATION
   
    const tla = gsap.timeline({
    scrollTrigger: {
        trigger: ".logo-d",      // pode ser o container também
        start: "top 75%",
        end: "45% 40%", 
        scrub: true,
        toggleActions: "play none none none"
        // play pause resume reset (se quiser repetir)
    }
    });
      
    // D — entra da esquerda (impacto)
    tla.from(".logo-d", {
    x: -180,
    opacity: 0,
    rotateX: 120,
    scale: 0.85,
    duration: 1,
    ease: "power4.out"
    })
    
    // E — cai de cima
    tla.from(".logo-e", {
    y: -200,
    opacity: 0,
    scale: 0.7,
    duration: 0.9,
    ease: "bounce.out"
    }, "-=0.4")
    
    // V — zoom + rotação leve
    tla.from(".logo-v", {
    scale: 0,
    opacity: 0,
    x: 500,
    y: 200,
    rotateY: -250,
    duration: 0.8,
    ease: "back.out(1.7)"
    }, "-=0.3");
      



    // ANIMACAO DO TITULO PROJETOS
    tl.from(".tituloProjetos", {
        opacity: 0,
        x: -100,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".projetos",
            start: "0% 60%",
            end: "20% 60%", 
            scrub: true,
        }
    })


    // ANIMACAO DO BOX PROJETOS

    tl.from(".sliderProjetos", {
        opacity: 0,
        y: 500,
        scale: 0.8,
        rotateX: -60,
        transformPerspective: 1000,
        duration: 1.2,
        ease: "power4.out",
        filter: "blur(14px)",
        scrollTrigger: {
            trigger: ".projetos",
            start: "top 85%",
            end: "top 25%",
            scrub: true,
        }
    });


    // ANIMACAO DA SETA DIREITA
    tl.from(".arrowDireitaAnimation", {
        opacity: 0,
        x: -100,
        rotate: -360,
        scale: 0.8,
        duration: 5,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".projetos",
            start: "35% 70%",
            end: "80% 95%", 
            scrub: true,
        }
    })


    // ANIMACAO DA SETA ESQUERDA

    tl.from(".arrowEsquerdaAnimation", {
        opacity: 0,
        x: 100,
        rotate: 360,
        scale: 0.8,
        duration: 5,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".projetos",
            start: "35% 70%",
            end: "80% 95%", 
            scrub: true,
        }
    })
    


    // ANIMACAO DO NOME DO PROJETO
    tl.from(".subtitulloAnimation", {
        opacity: 0,
        y: -100,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".projetos",
            start: "30% 50%",
            end: "60% 50%", 
            scrub: true,
        }
    });


    // ANIMACAO DO TEXTO DO PROJETO
    tl.from(".nomeProjeto p", {
        opacity: 0,
        y: 100,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".projetos",
            start: "30% 50%",
            end: "60% 50%",  
            scrub: true,
        }
    });



    // ANIMACAO DO BOTAO DO PROJETO
    tl.from(".boxTecnologias button", {
        opacity: 0,
        y: 200,
        rotate: 360,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".projetos",
            start: "60% 50%",
            end: "80% 50%", 
            scrub: true,
        }
    });



    // ANIMACAO DOS ICONES DO BOTAO DO PROJETO
    tl.from(".boxTecnologias button img", {
        opacity: 0,
        y: 100,
        rotate: -360,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".projetos",
            start: "85% 60%",
            end: "100% 60%", 
            scrub: true,
        }
    });


    // titulo contato
    tl.from(".tituloContatoAnimation", {
        opacity: 0,
        x: -100,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: "footer",
            start: "0% 60%",
            end: "20% 60%", 
            scrub: true,
        }
    });


    // ICONES CONTATO
    tl.from(".iconContatosEsquerda", {
        opacity: 0,
        x: -100,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".contato",
            start: "30% 60%",
            end: "100% 60%", 
            scrub: true,
        }
    });

    tl.from(".iconContatosCentro", {
        opacity: 0,
        y: 100,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".textoInfinito",
            start: "0% 70%",
            end: "29% 70%",  
            scrub: true,
        }
    });


    tl.from(".iconContatosDireita", {
        opacity: 0,
        x: 100,
        duration: 1,
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".contato",
            start: "30% 60%",
            end: "100% 60%",  
            scrub: true,
        }
    });


    // ANIMATION TEXTO INFINITO

    tl.from(".textoInfinito h3", {
        opacity: 0,
        y: -200,
        duration: 1,
        scrollTrigger:{
            trigger: ".textoInfinito",
            start: "40% 90%",
            end: "70% 90%",  
            scrub: true,
        }
    })


    

    // ANIMACAO DOS ICONES DA PARTE ESQUERDA
    gsap.from(".scrollanimation",{
        opacity: 0,
        x: -200,
        rotate: 360,
        clearProps: "all",
        stagger: .5,
        filter: "blur(50px)",
        scrollTrigger: {
            trigger: ".topo",
            start: "0% 45%",
            scrub: true,
            end: "50% 50%",
            
        }

    });

    // ANIMACAO DOS ICONES DA PARTE DIREITA
    gsap.from(".scrollanimation2",{
        opacity: 0,
        x: 80,
        clearProps: "all",
        rotate: 360,
        stagger: .5,
        filter: "blur(50px)",
        scrollTrigger: {
            trigger: ".topo",
            start: "0% 10%",
            end: "50% 40%", 
            scrub: true,
        }

    });


    // ANIMACAO DA IMAGEM DE PERFIL
    gsap.from(".scrollImgPerfil",{
        opacity: 2,
        y: 300,
        stagger: .5,
        filter: "blur(50px)",
        scrollTrigger: {
            trigger: ".topo",
            start: "0% 45%",
            end: "50% 40%", 
            scrub: true,
        }

    });

}
    


// PRELOAD DA LOGO

const tl = gsap.timeline({
    onComplete(){
        gsap.to("#preloader", {
            opacity: 0,
            display: "none",
        })
        
    }
});


tl.to('#preloader path', {
    duration: 1,
    strokeDashoffset: 0,
    
    
})


tl.to('#preloader path', {
    fill: "rgb(255, 255, 255)",
    duration: .9,
    strokeDashoffset: 0,
    
    
})


const btn = document.getElementById("btnHamburguer");
const menu = document.getElementById("menuhumburguer");

let aberto = false;

gsap.set(menu, { y: -15, scale: 0.95 });

btn.addEventListener("click", (e) => {
    e.stopPropagation();

    if(!aberto){
        gsap.to(menu, {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: "auto",
            duration: 0.35,
            ease: "power3.out"
        });
    } else {
        fecharMenu();
    }

    aberto = !aberto;
});

function fecharMenu(){
    gsap.to(menu, {
        opacity: 0,
        y: -15,
        scale: 0.95,
        pointerEvents: "none",
        duration: 0.55,
        ease: "power2.in"
    });
}

menu.addEventListener("click", e => e.stopPropagation());

document.addEventListener("click", () => {
    if(aberto){
        fecharMenu();
        aberto = false;
    }
});


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-= CHAMADAS DE FUNCAO

animarPagina()
carrossel();
criarDots();

