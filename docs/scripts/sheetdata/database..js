import { viewItem } from "./item-view.js";

function RunItems(databaseContainer,data) {
    let activeSection;

    function switchToSection(section) {
        let sectionData = data[section];
        const sectionElement = databaseContainer.querySelector(".section")
        const sectionContent = sectionElement.querySelector(".content");
        sectionContent.innerHTML = sectionData[0][9];

        const itemsList = sectionElement.querySelector('.items-list tbody');
        const itemValueColumHeader = sectionElement.querySelector('.items-list .item-value');
        if (sectionData[0][8] == "Armor") {
            itemValueColumHeader.innerHTML = 'Health'
        }

        itemsList.innerHTML = ''
        sectionData.forEach(item => {
            const newrow = document.createElement('tr');
            item.forEach((cell, index) => {
                const itemClass = item[8];
                if (index < 7 && index > 0) {
                    const newcell = document.createElement('td');
                    if (index == 1) {
                        const nameWrapper = document.createElement('div');
                        nameWrapper.classList.add('name-wrapper');
                        newcell.appendChild(nameWrapper)

                        if (item[0]) {
                            const img = document.createElement('img');
                            img.classList.add("item-render")
                            img.src = `https://res.cloudinary.com/dt6q0wrzm/image/upload/${item[0]}.png`;

                            nameWrapper.appendChild(img);
                        } 
                        const viewButton = document.createElement("button");
                        viewButton.classList.add("item-link")
                        viewButton.innerHTML = cell;

                        viewButton.addEventListener("click", () => { 
                            viewItem(item,itemClass);
                        });

                        nameWrapper.appendChild(viewButton)
                    } else {
                        newcell.innerHTML = cell;
                    }

                    if (index == 3) {
                        newcell.setAttribute('rarity',item[3].toLowerCase());
                    } 
                    newrow.appendChild(newcell);
                }
            });
            itemsList.appendChild(newrow);
        });
    }

    Object.keys(data).forEach((dataSection, index) => { 
        const databaseButtons = databaseContainer.querySelector('.buttons');

        const li = document.createElement('li');
        li.innerHTML = `<button>${dataSection}</button>`;
        databaseButtons.appendChild(li);

        let btn = li.querySelector('button');
        if (index == 0) {
            btn.classList.add('active');
            activeSection = dataSection;
            switchToSection(dataSection);
        }

        btn.addEventListener("click", () => {
            if (dataSection != activeSection) {
                let activebutton = databaseButtons.querySelector(".active");
                activebutton.classList.remove("active");

                btn.classList.add("active");
                switchToSection(dataSection);
                activeSection = dataSection;
            }
        });
    });    
}

function RunMobs(databaseContainer,data) {
    let activeFloor;
    const MobsList = databaseContainer.querySelector('.items-list tbody');

    function insertMob(Mob,index) {
        const newrow = document.createElement('tr');
        Mob.forEach((cell, index) => {
            if (index > 0 && index < 9 ) { 
                const newcell = document.createElement('td');
                if (index == 1) {
                    const nameWrapper = document.createElement('div');
                    nameWrapper.classList.add('name-wrapper');
                    newcell.appendChild(nameWrapper)

                    if (Mob[0]) {
                        const img = document.createElement('img');
                        img.classList.add("item-render")
                        img.src = `https://res.cloudinary.com/dt6q0wrzm/image/upload/${item[0]}.png`;

                        nameWrapper.appendChild(img);
                    } 
                    const viewButton = document.createElement("button");
                    viewButton.classList.add("item-link")
                    if (Mob[9] == "Boss" || Mob[9] == "MiniBoss" || Mob[9] == "AreaBoss") { 
                        viewButton.innerHTML = `${cell} [${Mob[9]}]`;
                    } else {
                        viewButton.innerHTML = cell;
                    }

                    viewButton.addEventListener("click", () => { 
                        viewItem(Mob,"Mob");
                    });

                    nameWrapper.appendChild(viewButton)
                } else {
                    newcell.innerHTML = cell;
                }
                newrow.appendChild(newcell);
            }
        });

        newrow.setAttribute('floor', Mob[10]);
        if (activeFloor == Mob[10]) {
            newrow.classList.add('floor-active')
        }
        MobsList.appendChild(newrow);
    }

    let floors = [];
    function insertFloor(floor) {
        const databaseButtons = databaseContainer.querySelector('.buttons');
        const li = document.createElement('li');
        li.innerHTML = `<button>${floor}</button>`;
        databaseButtons.appendChild(li);

        floors.push(floor);
        const btn = li.querySelector('button');
        if (floors.length == 1) {
            btn.classList.add('active');
            activeFloor = floor;
        }

        btn.addEventListener("click", () => { 
            if (activeFloor != floor) {
                let activebutton = databaseButtons.querySelector(".active");
                activebutton.classList.remove("active");

                btn.classList.add("active");
                activeFloor = floor;

                const mobsActivated = MobsList.querySelectorAll('.floor-active');
                mobsActivated.forEach(m => {
                    m.classList.remove('floor-active');
                })

                const mobsToActivate = MobsList.querySelectorAll(`[floor=${activeFloor}]`);
                mobsToActivate.forEach(n => {
                    n.classList.add('floor-active');
                });
            }
        });
    }

    data["Mobs"].forEach((Mob,index) => {
        if (floors.includes(Mob[10])) {
            insertMob(Mob,index);
        } else {
            insertFloor(Mob[10]);
            insertMob(Mob,index);
        }
    });
}

function RunDataBase(tab, data) {
    // console.log(tab,data);
    const databaseContainer = document.querySelector(`#${tab} .database.${tab}`);
    if (!databaseContainer) { console.log(`database section not found in this tab ${tab}`); return; }

    if (tab == "Items") {
        RunItems(databaseContainer,data);
    } else if (tab == "Mobs") {
        RunMobs(databaseContainer,data);
    }
}

export { RunDataBase };