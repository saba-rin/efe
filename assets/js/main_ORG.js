let lg;

display();

async function display(){
    const directory = './assets/images/gallery/';

    const list = await fetch('assets/contents.json').then(response => response.json());

    const gallery = document.getElementById('gallery');

    for (let i = 0; i < list.length; i++) {
        let outer = document.createElement('a');
        let inner = document.createElement('img');

        outer.href = directory + 'ffxiv_' + list[i].name + '.png';
        inner.src = directory + 'thumb/' + 'ffxiv_' + list[i].name + '.png';

        console.log(inner);

        outer.appendChild(inner);
        gallery.appendChild(outer);
    }  

    lg = window.lightGallery(
        document.getElementById("gallery"),
        {
            autoplayFirstVideo: false,
            pager: true,
            galleryId: "gallery",
            plugins: [lgZoom, lgPager],
            dynamic: true,
            mobileSettings: {
                controls: false,
                showCloseIcon: false,
                download: false,
                rotate: false
            }
        }
    );

    initGallery();
}

function initGallery(){
    // initiate justifiedGallery and lightGallery
    jQuery("#gallery")
    .justifiedGallery({
        captions: false,
        lastRow: "nojustify",
        rowHeight: 260,
        margins: 5
    })
    .on("jg.complete", function () {
        lg.openGallery();
        // window.lightGallery(
        //     document.getElementById("gallery"),
        //     {
        //     autoplayFirstVideo: false,
        //     pager: true,
        //     galleryId: "gallery",
        //     plugins: [lgZoom, lgPager],
        //     mobileSettings: {
        //         controls: false,
        //         showCloseIcon: false,
        //         download: false,
        //         rotate: false
        //     }
        //     }
        // );
    });
}

function test(){
    $('#gallery').justifiedGallery('destroy');
    lg.refresh();

    initGallery();
}

function removeTest(){
    const gallery = document.getElementById('gallery');

    elems = gallery.children;

    gallery.removeChild(elems[0]);

    test();
    // elems.forEach(element => {
        
    // });
}