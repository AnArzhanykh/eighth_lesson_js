import galery from './gallery-items.js';

const galeryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImagRef = document.querySelector('.lightbox__image');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
const closeBtnRef = document.querySelector('[data-action="close-lightbox"]');
const nextBtnRef = document.querySelector('[data-action="next"]');
const prevBtnRef = document.querySelector('[data-action="prev"]');
let imgIdRef;


galeryRef.addEventListener('click', openModal);

modalOverlayRef.addEventListener('click', closeModal);

closeBtnRef.addEventListener('click', closeModal);

nextBtnRef.addEventListener('click', takeNextImg);

prevBtnRef.addEventListener('click', takePrevImg); 



const redderingImg = galery =>{   
    const listImg = createList(galery);
    galeryRef.append(...listImg);
    // galeryRef.append(...createList(galery));
}

function createList(galery){
    const gallereArr = galery.map( ({original, preview, description}) =>{

        const itemRef = document.createElement('li');
        itemRef.classList.add('gallery__item');

        const linkRef = document.createElement('a');
        linkRef.classList.add('gallery__link')
        linkRef.href = original;
        itemRef.append(linkRef);

        const imgRef= document.createElement('img');
        imgRef.classList.add('gallery__image');
        imgRef.src = preview;
        imgRef.alt = description;
        imgRef.setAttribute('data-source', original);
        linkRef.append(imgRef);

        return itemRef
    });
    return gallereArr;
}

function openModal(e){
        e.preventDefault();
    
        if(e.target.nodeName !== 'IMG'){
            return
        }

        window.addEventListener('keydown', onPressEsc);
        modalRef.classList.add('is-open');
        modalImagRef.alt = e.target.alt;
        imgIdRef = e.target.dataset.source
        modalImagRef.src = imgIdRef;
    }


function closeModal(){
    window.removeEventListener('keydown',onPressEsc);
    modalRef.classList.remove('is-open');
    modalImagRef.alt = '';
    modalImagRef.src = '';
}

function onPressEsc(e){
    if(e.code === 'Escape'){
        closeModal();
    }
}

function takePrevImg(){
    galery.find((item, index) =>{
        if(imgIdRef ===item.original){
            let nextIndex = index - 1;
            if(index === 0){
                return
            }
            imgIdRef = galery[nextIndex].original;
            return modalImagRef.src = galery[nextIndex].original;
        };
    })
}

function takeNextImg(){
    galery.find((item, index) =>{
        if(imgIdRef ===item.original){
            let nextIndex = index + 1;
            if(nextIndex === galery.length){
                return
            }
            imgIdRef = galery[nextIndex].original;
            return modalImagRef.src = galery[nextIndex].original;
        };
    })
}

redderingImg(galery);