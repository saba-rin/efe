//  setup search
// -----------------------
function doSearch() {
    // reset loaded images count and loading state
    initParams();

    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    const pl = document.getElementById('fPlace');
    const ag = document.getElementById('fAgent');
    const pt = document.getElementById('fPatch');

    list = rawList;
    list = search(list, pl.value, ag.value, pt.value);

    // initialize galleries
    init();
}

function search(list, place, author, patch) {
    let tmpAry = [];

    // remove prefixes and formatting
    author = author.substring(3, author.length);
    place = place.substring(3, place.length);
    patch = parseInt(patch.substring(3, patch.length));

    // console.log(list);

    // TODO: OR search
    for (let i = 0; i < list.length; i++) {
        let addElem = true;

        if (author != "ALL") {
            if (author != list[i].creator) {
                addElem = false;
            }
        }

        if (place != "ALL") {
            if (place != list[i].place) {
                addElem = false;
            }
        }

        if (patch != 0) {
            if (patch != parseInt(list[i].patch)) {
                addElem = false;
            }
        }

        if (addElem) {
            // console.log(list[i])
            tmpAry.push(list[i]);
        }
    }

    return tmpAry;
}