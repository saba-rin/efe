function attatch(list, thumbsToLoad){
    for (let i = loaded; i < thumbsToLoad; i++) {
        let imgEl = document.createElement('div');
        let thumbEl = document.createElement('img');

        const fullDirectory = directory + list[i].folder + '/';
        
        imgEl.href = fullDirectory + list[i].title + '.png';
        thumbEl.src = fullDirectory + 'thumb/' + list[i].title + '.webp';
        
        if (list[i].comment !== undefined) {
            thumbEl.alt = list[i].comment;
        }
        
        loaded++;
        // console.log(list[i].patch);
        imgEl.appendChild(thumbEl);
        gallery.appendChild(imgEl);

        imgEl.addEventListener('click',() => {
            lg.openGallery(i);
        });
    }

    return false;
}