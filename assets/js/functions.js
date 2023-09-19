async function getData() {
    rawList = await fetch('assets/data1694667127228.json').then(response => response.json());
    uiData = await fetch('assets/uiData.json').then(response => response.json());
    list = rawList;
}


//  initialize lightGallery and justified gallery
// --------------------------------------------------------
function initializeGalleries() {
    // lg = lightGallery(gallery, {
    //     autoplayFirstVideo: false,
    //     loop: false,
    //     hideControlOnEnd: true,
    //     download: false,
    //     plugins: [lgZoom],
    //     mobileSettings: {
    //         controls: false,
    //         showCloseIcon: false,
    //         rotate: false
    //     }
    // });

    const sanitizedListForLg = sanitizeForLg(list);

    lg = lightGallery(gallery, {
        dynamic: true,
        autoplayFirstVideo: false,
        hideControlOnEnd: true,
        download: true,
        plugins: [lgZoom, lgHash, lgShare],
        customSlideName: true,
        facebook: false,
        pinterest: false,
        twitterDropdownText: "Twitter / X",
        mobileSettings: {
            controls: false,
            showCloseIcon: false,
            rotate: false
        },
        dynamicEl: sanitizedListForLg
    });

    initJg();

    window.addEventListener("scroll", () => {
        if ($window.scrollTop() >= $(document).height() - $window.height() - 180 && !loading) {
            loadMore();
        }

        const btn = document.getElementById('scrollToTop');
        if ($window.scrollTop() > 200) {
            btn.classList.remove('scrlBtnHidden')
            btn.classList.add('scrlBtnShow');
        } else {
            btn.classList.remove('scrlBtnShow')
            btn.classList.add('scrlBtnHidden');
        }
    });
}


function sanitizeForLg(list) {
    let response = [];

    list.forEach(element => {
        let tmp = {};

        tmp.src = directory + element.folder + '/' + element.title + '.png';
        tmp.thumb = directory + element.folder + '/thumb/' + element.title + '.webp';
        tmp.slideName = element.title;
        tmp.tweetText = 'efrome.netからの写真共有';

        if (element.comment != undefined) {
            tmp.subHtml = `<p>${element.comment}</p>`;
        }

        response.push(tmp);
    });

    return response;
}


function loadMore() {
    loading = true;
    let loadUntil;
    if (list.length - loaded > thumbsPerScroll) {
        loadUntil = loaded + thumbsPerScroll;
    } else {
        loadUntil = list.length;
    }

    attatch(list, loadUntil);
    refresh();
    setTimeout(() => { loading = false }, 1000);
}


// initialize justifiedGallery only
function initJg() {
    $("#gallery")
        .justifiedGallery({
            captions: false,
            lastRow: "nojustify",
            rowHeight: 200,
            margins: 20
        });
}



//  filter images that can be spoiler
// --------------------------------------------
function blockSpoiler() {
    let elems = gallery.children;
    const limit = document.getElementById('fSpoiler').value;

    for (let i = 0; i < elems.length; i++) {
        if (!elems[i].classList.contains('jg-spinner') && list[i].patch > limit) {
            elems[i].classList.add('spoiler');
        } else {
            elems[i].classList.remove('spoiler');
        }
    }

    return true;
}


//  initialize parameters when make change to gallery
// ------------------------------------------------------------
function initParams() {
    loaded = 0;
}


//  setup togglers for smartphone
// ----------------------------------------
function setTogglers() {
    togglers.forEach(element => {
        element.src = 'assets/images/ui/togglers/' + Math.floor(Math.random() * uiData.togglers) + '.webp';

        element.addEventListener("click", (elem) => {
            elem.target.src = 'assets/images/ui/togglers/' + Math.floor(Math.random() * uiData.togglers) + '.webp';
        })
    });
}

//  experimental
// -----------------------
function shuffle() {
    initParams();
    list = list.sort((a, b) => { return Math.random() - 0.5; });
    refresh();
}

function refresh() {
    initJg();
    blockSpoiler();
}