import galery from './gallery-items.js';

const galeryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImagRef = document.querySelector('.lightbox__image');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
const closeBtnRef = document.querySelector('[data-action="close-lightbox"]');
const nextBtnRef = document.querySelector('[data-action="next"]');
const prevBtnRef = document.querySelector('[data-action="prev"]');
let curentImg;
let curentIndex;


galeryRef.addEventListener('click', openModal);





const renderImg = galery =>{   
    const listImg = createList(galery);
    galeryRef.append(...listImg);
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
        window.addEventListener('keydown', nextImage);
        window.addEventListener('keydown', prevImage);
        window.addEventListener('keydown', onPressEsc);
        modalOverlayRef.addEventListener('click', closeModal);
        closeBtnRef.addEventListener('click', closeModal);
        prevBtnRef.addEventListener('click', takePrevImg); 
        nextBtnRef.addEventListener('click', takeNextImg);
        modalRef.classList.add('is-open');
        modalImagRef.alt = e.target.alt;
        curentImg = e.target.dataset.source
        modalImagRef.src = curentImg;
    }


function closeModal(){
    modalOverlayRef.removeEventListener('click', closeModal);
    closeBtnRef.removeEventListener('click', closeModal);
    nextBtnRef.removeEventListener('click', takeNextImg);
    prevBtnRef.removeEventListener('click', takePrevImg);
    window.removeEventListener('keydown',onPressEsc);
    window.removeEventListener('keydown', nextImage);
    window.removeEventListener('keydown', prevImage);
    
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
    findCurentIndex();
    const prevIndex = curentIndex - 1 >=0 ? curentIndex - 1: 0;
    curentImg = galery[prevIndex].original;
    return modalImagRef.src = curentImg;
}


function takeNextImg(){
    findCurentIndex();
    const nextIndex = curentIndex + 1 === galery.length ? curentIndex : curentIndex +1;
    curentImg = galery[nextIndex].original;
    return modalImagRef.src = galery[nextIndex].original;
}


function findCurentIndex (){
    galery.find((item, index) =>{
        if(curentImg ===item.original){
            curentIndex=index;
        };
    });
}

function nextImage(e){
    if(e.key ==='ArrowRight' || e.code ==='KeyD') takeNextImg()
}

function prevImage(e){
    if(e.key ==='ArrowLeft' || e.code ==='KeyA')takePrevImg()
}


renderImg(galery);

