
function viewItem(item,iclass) {
    const itemView = document.querySelector('.item-view');
    const close = itemView.querySelector('.close button');
    const itemDetails = itemView.querySelector('.item-details');
    const itemData = itemDetails.querySelector('.item-data.items');
    const mobsData = itemDetails.querySelector('.item-data.mobs');

    close.addEventListener('click', () => {
        itemView.style.display = 'none';
    });
    itemView.addEventListener('click', () => {
        itemView.style.display = 'none';
    });
    itemDetails.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // console.log(item,iclass);

    // set image
    const iconFrame = itemDetails.querySelector('.icon-frame');
    const img = iconFrame.querySelector('img');
    img.src = 'https://placehold.co/160/black/white/png?text=Icon'
    if (item[0]) {
        img.src = `https://res.cloudinary.com/dt6q0wrzm/image/upload/${item[0]}.png`;
    }

    // item data
    const itemName = itemDetails.querySelector('.item-name');
    itemName.innerHTML = item[1];

    if (iclass == "Mob") {
        // mobs data
        itemData.classList.remove('active')
        mobsData.classList.add('active')

        if (item[9] == "Boss" || item[9] == "MiniBoss" || item[9] == "AreaBoss") {
            itemName.innerHTML = `${item[1]} [${item[9]}]`
        }

        const mobLevel = mobsData.querySelector('[item-data=level] span');
        mobLevel.textContent = item[2];
        
        const mobxp = mobsData.querySelector('[item-data=xp] span');
        mobxp.textContent = item[3];

        const mobhealth = mobsData.querySelector('[item-data=health] span');
        mobhealth.textContent = item[4];

        const mobdamage = mobsData.querySelector('[item-data=damage] span');
        mobdamage.textContent = item[5];

        const mobspawntime = mobsData.querySelector('[item-data=spawntime] span');
        mobspawntime.textContent = item[6];

        const mobroils = mobsData.querySelector('[item-data=roils] span');
        mobroils.textContent = item[7];

        

        const mobuniverse = mobsData.querySelector('[item-data=universe] span');
        mobuniverse.textContent = item[10];

        const mobDescription = itemDetails.querySelector('.description-label .text');
        if (item[11]) {
            mobDescription.innerHTML = item[11];
        } else {
            mobDescription.textContent = "No Description."
        }

    } else {
        // items data
        mobsData.classList.remove('active')
        itemData.classList.add('active')

        iconFrame.setAttribute('rarity', item[3].toLowerCase());

        const itemClass = itemData.querySelector('[item-data=class] span');
        itemClass.textContent = iclass;

        const itemRarity = itemData.querySelector('[item-data=rarity] span');
        itemRarity.textContent = item[3];
        itemRarity.setAttribute('rarity', item[3].toLowerCase());

        const itemLevel = itemData.querySelector('[item-data=level] span');
        itemLevel.textContent = item[2];

        const itemValueHolder = itemData.querySelector('[item-data=value]');
        const itemValueSpan = itemValueHolder.querySelector('span');
        itemValueSpan.innerHTML = item[4]
        if (iclass == 'Armor') {
            const itemValueTitle = itemValueHolder.querySelector('b');
            itemValueTitle.innerHTML = "Health"
        }

        const itemDrop = itemData.querySelector('[item-data=drop]  span');
        itemDrop.innerHTML = item[5]

        const itemUniverse = itemData.querySelector('[item-data=universe]  span');
        itemUniverse.innerHTML = item[6]

        const itemDescription = itemDetails.querySelector('.description-label .text');
        if (item[7]) {
            itemDescription.innerHTML = item[7];
        } else {
            itemDescription.textContent = "No Description."
        }
    }

    

    itemView.style.display = 'block';
}

export { viewItem };