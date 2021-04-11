import galery from './gallery-items.js';

const galeryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImagRef = document.querySelector('.lightbox__image');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
const closeBtnRef = document.querySelector('[data-action="close-lightbox"]');
const nextBtnRef = document.querySelector('[data-action="next"]');
const prevBtnRef = document.querySelector('[data-action="prev"]');

const imgArr = [];



galeryRef.addEventListener('click', e =>{
    e.preventDefault();

    if(e.target.nodeName !== 'IMG'){
        return
    }
    window.addEventListener('keydown', onPressEsc);
    modalRef.classList.add('is-open');
    modalImagRef.alt = e.target.alt;
    let imgRefInd = e.target.dataset.source
    modalImagRef.src = imgRefInd;

    nextBtnRef.addEventListener('click', e =>{
        for(let i =0; i < imgArr.length; i+=1){
            if(imgRefInd ===imgArr[i] ){
                let nextIndex = i+1
                if(nextIndex === imgArr.length){
                    break
                }
                imgRefInd = imgArr[nextIndex];
                modalImagRef.src = imgArr[nextIndex];
                break
            }
        }
    });

    prevBtnRef.addEventListener('click', e =>{
        for(let i =0; i < imgArr.length; i+=1){
            if(imgRefInd ===imgArr[i] ){
                let nextIndex = i-1;
                if(i === 0){
                    break
                }
                imgRefInd = imgArr[nextIndex];
                modalImagRef.src = imgArr[nextIndex];
                break
            }
        }
    })

});

modalOverlayRef.addEventListener('click', e =>{
    window.removeEventListener('keydown',onPressEsc);
    closeModal();
});

closeBtnRef.addEventListener('click', e =>{
    window.removeEventListener('keydown',onPressEsc);
    closeModal();
});



const redderingImg = galery =>{   
    const listImg = createList(galery);
    galeryRef.append(...listImg);
    // galeryRef.append(...createList(galery));
}

function createList(galery){
    const gallereArr = [];
    galery.map( ({original, preview, description}) =>{

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
        imgArr.push(original)
        linkRef.append(imgRef);

        gallereArr.push(itemRef);
    });
    return gallereArr;
}

function closeModal(){
    modalRef.classList.remove('is-open');
    modalImagRef.alt = '';
    modalImagRef.src = '';
}

function onPressEsc(e){
    if(e.code === 'Escape'){
        closeModal();
    }
}

redderingImg(galery);