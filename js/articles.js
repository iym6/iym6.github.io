import { DataManager } from './data.js';

let allArticles = [];
let visibleArticlesCount = 3;
const articlesPerLoad = 3;

document.addEventListener('DOMContentLoaded', async function() {
  await loadArticles();
  setupLoadMoreButton();
  setupArticleClickHandlers();
});

async function loadArticles() {
  try {
    allArticles = await DataManager.loadData('articles');
    displayArticles();
  } catch (error) {
    console.error('Ошибка загрузки статей:', error);
    displayError();
  }
}

function displayArticles() {
  const container = document.getElementById('articlesContainer');
  if (!container) return;

  const articlesToShow = allArticles.slice(0, visibleArticlesCount);
  
  container.innerHTML = articlesToShow.map(article => `
    <div class="article-card" data-article-id="${article.id}">
      <div class="article-image">
        <img src="${article.image}" alt="${article.title}"
             onerror="this.onerror=null;this.src='/img/articles/placeholder.jpg';">
      </div>
      <div class="article-content">
        <div class="article-date">${article.date}</div>
        <h3 class="article-title">${article.title}</h3>
      </div>
    </div>
  `).join('');
}

function setupLoadMoreButton() {
  const btn = document.getElementById('loadMoreBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    visibleArticlesCount += articlesPerLoad;
    displayArticles();
    setupArticleClickHandlers();
    updateLoadMoreButton();
    formatText();
  });

  updateLoadMoreButton();
}

function updateLoadMoreButton() {
  const btn = document.getElementById('loadMoreBtn');
  if (!btn) return;
  
  btn.style.display = visibleArticlesCount >= allArticles.length ? 'none' : 'block';
}

function displayError() {
  const container = document.getElementById('articlesContainer');
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <p>Не удалось загрузить статьи. Пожалуйста, попробуйте позже.</p>
      </div>
    `;
  }
}

function setupArticleClickHandlers() {
  document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', async function() {
      const articleId = this.getAttribute('data-article-id');
      const article = allArticles.find(a => a.id == articleId);
      if (article) {
        await showArticleModal(article);
      }
    });
  });
}

async function showArticleModal(article) {
  try {
    const response = await fetch(`../data/articles/${article.textFile}`);
    const text = await response.text();
    
    document.getElementById('modalTitle').textContent = article.title;
    document.getElementById('modalDate').textContent = article.date;
    document.getElementById('modalContent').innerHTML = formatText(text);
    
    const modal = document.getElementById('articleModal');
    modal.style.display = 'block';
    
    document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
      if (event.target == modal) modal.style.display = 'none';
    };
  } catch (error) {
    console.error('Ошибка загрузки текста статьи:', error);
    document.getElementById('modalContent').textContent = 'Не удалось загрузить текст статьи.';
  }
}

function formatText(content) {
  // Удаляем лишние пробелы и разбиваем на абзацы по двойным переносам строк
  const paragraphs = content
    .trim()
    .split(/\n\s*\n/) // Разделяем по двум и более переносам строк
    .filter(p => p.trim().length > 0); // Удаляем пустые абзацы

  // Формируем HTML с отступами между абзацами
  return paragraphs.map((paragraph, index) => {
    // Первый абзац без отступа, но с увеличенным нижним отступом
    if (index === 0) {
      return `<p class="first-paragraph">${paragraph}</p>`;
    }
    // Остальные абзацы с красной строкой и отступами
    return `<p class="regular-paragraph">${paragraph}</p>`;
  }).join('');
}