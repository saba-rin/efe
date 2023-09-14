function attatch(list, thumbsToLoad){
    for (let i = loaded; i < thumbsToLoad; i++) {
        let imgEl = document.createElement('a');
        let thumbEl = document.createElement('img');

        fullDirectory = directory + list[i].folder + '/';
        
        imgEl.href = fullDirectory + list[i].title + '.png';
        thumbEl.src = fullDirectory + 'thumb/' + list[i].title + '.webp';
        
        if (list[i].comment !== undefined) {
            thumbEl.alt = list[i].comment;
        }
        
        loaded++;
        // console.log(list[i].patch);
        imgEl.appendChild(thumbEl);
        gallery.appendChild(imgEl);
    }

    return false;
}