import { DataManager } from './data.js';

let allProjects = [];
let visibleProjectsCount = 3;
const projectsPerLoad = 3;

document.addEventListener('DOMContentLoaded', async function() {
  await loadProjects();
  setupLoadMoreButton();
});

async function loadProjects() {
  try {
    allProjects = await DataManager.loadData('projects');
    displayProjects();
  } catch (error) {
    console.error('Ошибка загрузки проектов:', error);
    displayError();
  }
}

function displayProjects() {
  const container = document.querySelector('.projects-grid');
  if (!container) return;

  const projectsToShow = allProjects.slice(0, visibleProjectsCount);
  
  container.innerHTML = projectsToShow.map(project => `
    <div class="project-card" data-project-id="${project.id}">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" 
             onerror="this.onerror=null;this.src='../img/${project.image}';">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="tech-stack">
          <div class="tech-tags">
            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function setupLoadMoreButton() {
  const btn = document.getElementById('loadMoreProjectsBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    visibleProjectsCount += projectsPerLoad;
    displayProjects();
    updateLoadMoreButton();
  });

  updateLoadMoreButton();
}

function updateLoadMoreButton() {
  const btn = document.getElementById('loadMoreProjectsBtn');
  if (!btn) return;
  
  btn.style.display = visibleProjectsCount >= allProjects.length ? 'none' : 'block';
}

function displayError() {
  const container = document.querySelector('.projects-grid');
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <p>Не удалось загрузить проекты. Пожалуйста, попробуйте позже.</p>
      </div>
    `;
  }
}