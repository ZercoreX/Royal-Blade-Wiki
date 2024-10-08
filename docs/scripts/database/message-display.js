import { initImageSlider } from './../slider.js';

function createMessageElement(messageData,tab) {
  const templateElement = document.querySelector('.message.template');
  if (!templateElement) { console.error('Template element not found'); return null; }
  
  const template = templateElement.cloneNode(true);

  template.querySelector('.sender').innerHTML = messageData[0];
  template.querySelector('time').innerHTML = messageData[1];
  template.querySelector('time').setAttribute('datetime', messageData[1]);
  
  const msg_title = template.querySelector('.msg-title');
  msg_title.querySelector('.title-2').innerHTML = messageData[2];

  template.querySelector('.message-label.top').innerHTML = messageData[3];
  template.querySelector('.message-label.bottom').innerHTML = messageData[4];

  if (tab === "Updates") {
    msg_title.querySelector('.title-1').innerHTML = messageData[5];

    const updateNotes = template.querySelector('.update-notes');
    updateNotes.querySelector('h3').innerHTML = messageData[5];

    // update notes lists & sublists
    const subLists = ['New', 'Changes', 'Fixes'];
    for (let i = 0; i < 3; i++) {
      // Start from index 5 (column G in the sheet) and increment by 2 for each sublist
      const startIndex = 6 + (i * 2);
      const items = messageData[startIndex]?.split('|') || [];
      const descriptions = messageData[startIndex + 1]?.split('|') || [];
      
      const subList = updateNotes.querySelectorAll('.sub-list')[i];
      if (!items.every(item => typeof item !== 'string' || item === '')) {
        subList.querySelector('h4').innerHTML = subLists[i];

        const ul = subList.querySelector('ul');
        ul.innerHTML = '';

        items.forEach((item, index) => {
          const li = document.createElement('li');
          li.innerHTML = `<h5>${item}</h5><p>${descriptions[index] || ''}</p>`;
          ul.appendChild(li);
        });
      } else {
        subList.style.display = "none";
      }
    }
  
  } else if (tab === "News") {
    if (messageData[5]) {
      msg_title.querySelector('.title-1').innerHTML = messageData[2];

      const imgslist = template.querySelector('.image-slider .list');
      const imgs = messageData[5]?.split('|') || [];

      imgs.forEach((imageSrc, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        slide.innerHTML = `<img src="${imageSrc}" alt="">`;
        imgslist.appendChild(slide);
      });
      
      initImageSlider(template.querySelector('.image-slider'));
    } 
  }
  

  template.style.display = "block";
  template.classList.remove("template");
  
  let toggle = template.querySelector('.msg-toggle');
  toggle.addEventListener("click", () => {  toggle.parentElement.classList.toggle("show");  });

  return template;
}

function messageDisplay(tab,data) {
  const messageBox = document.querySelector(`#${tab} .messages-box`);
  if (!messageBox) { console.log(`Messages box not found in this tab ${tab}`); return; }

  data.forEach((messageData, index) => {
      const messageElement = createMessageElement(messageData,tab);
      if (messageElement) {
          messageBox.appendChild(messageElement);
          if (index === 0) {
            messageElement.classList.add('show');
          } else {
            messageElement.classList.remove('show');
          }
        }
  });
}

export { messageDisplay };