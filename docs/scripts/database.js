async function fetchData() {
  const response = await fetch('https://royal-blade-wiki.netlify.app/.netlify/functions/getSecret');
  const data = await response.json();

  return data.data;
}

function createMessageElement(messageData) {
  const templateElement = document.querySelector('.update-message.template');
  if (!templateElement) {
    console.error('Template element not found');
    return null;
  }
  
  const template = templateElement.cloneNode(true);

  // Populate main message details
  template.querySelector('.sender').textContent = messageData[0];
  template.querySelector('time').textContent = messageData[1];
  template.querySelector('time').setAttribute('datetime', messageData[1]);
  template.querySelector('.update-title').textContent = messageData[2];
  template.querySelector('.message.top').textContent = messageData[3];
  template.querySelector('.message.bottom').textContent = messageData[4];
  
  // Populate sub-lists
  const updateNotes = template.querySelector('.update-notes');
  updateNotes.querySelector('h3').textContent = messageData[5];
  
  const subLists = ['New', 'Changes', 'Fixes'];
  for (let i = 0; i < 3; i++) {
    // Start from index 5 (column G in the sheet) and increment by 2 for each sublist
    const startIndex = 6 + (i * 2);
    const items = messageData[startIndex]?.split('|') || [];
    const descriptions = messageData[startIndex + 1]?.split('|') || [];
    
    const subList = updateNotes.querySelectorAll('.sub-list')[i];
    if (!items.every(item => typeof item !== 'string' || item === '')) {
      subList.querySelector('h4').textContent = subLists[i];

      const ul = subList.querySelector('ul');
      ul.innerHTML = ''; // Clear default list item

      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<h5>${item}</h5><p>${descriptions[index] || ''}</p>`;
        ul.appendChild(li);
      });
    } else {
      subList.style.display = "none";
    }
  }
  template.style.display = "block";
  template.classList.remove("template");
  
  let toggle = template.querySelector('.upd-msg-toggle');
  toggle.addEventListener("click", () => {
      toggle.parentElement.classList.toggle("show");
  });

  return template;
}

async function displayMessages() {
  const container = document.querySelector('.messages-box');
  if (!container) {
    console.error('Messages container not found');
    return;
  }

  try {
    const data = await fetchData();
    // console.log(data);
    data.forEach((messageData, index) => {
      const messageElement = createMessageElement(messageData);
    
      if (messageElement) {
        container.appendChild(messageElement);
        
        // Check if it's the last element
        if (index === 0) {
          messageElement.classList.add('show');
        } else {
          messageElement.classList.remove('show');
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching or displaying data:', error);
  }
}

// Function to initialize the app // false // true
let Access = true;
function initApp() {
  if (Access) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', displayMessages);
    } else {
      displayMessages();
    }
  }
}

export { initApp };