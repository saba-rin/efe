console.info('We use JSlibrary "lightGallery" under their opensource license.\n Visit "https://github.com/saba-rin/efe/tree/master" for source code.')

const gallery = document.getElementById('gallery');
const $window = $(window);

let uiData;

const togglers = document.querySelectorAll('.toggler-icons');

const returnSpellSpeed = 800;

let inputBuffer = "";
window.addEventListener("keyup", (event) => {
    inputBuffer += event.key;
    if(inputBuffer.length > 5){
        inputBuffer = inputBuffer.substring(1);
    }

    if (inputBuffer == "erika") {
        const eModal = new bootstrap.Modal(document.getElementById('modal_secret'));
        eModal.toggle();
    }
})

{
    const btn = document.getElementById('scrollToTop');
    if ($window.scrollTop() > 200) {
        btn.classList.remove('scrlBtnHidden')
        btn.classList.add('scrlBtnShow');
    } else {
        btn.classList.remove('scrlBtnShow')
        btn.classList.add('scrlBtnHidden');
    }

    btn.addEventListener("click", () => {
        window.scroll({top:0, behavior:'smooth'});
        // $("html,body").animate({scrollTop:0}, returnSpellSpeed);
    })
}

const thumbsPerScroll = 40;

const directory = './assets/images/gallery/';

let lg, list, rawList;
let loaded = 0;
let loading = false;


document.getElementById('fSpoiler').addEventListener("change", blockSpoiler);

document.getElementById('loadBtn').addEventListener("click", loadMore);

let filters = document.getElementsByClassName('filters');
for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener("change", doSearch);
}


async function init() {
    if (!rawList) {
        await getData();
    }

    setTogglers();

    if (list.length > thumbsPerScroll) {
        await attatch(list, thumbsPerScroll);
    } else {
        await attatch(list, list.length);
    }

    await initializeGalleries();

    blockSpoiler();
}


function refresh() {
    initJg();

    setTimeout(() => {
        lg.refresh();
        blockSpoiler();
    }, 500);
}

init();