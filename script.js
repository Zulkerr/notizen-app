document.addEventListener('DOMContentLoaded', () => {
  const noteText = document.getElementById('noteText');
  const noteCategory = document.getElementById('noteCategory');
  const addNoteBtn = document.getElementById('addNoteBtn');
  const notesList = document.getElementById('noteList'); // 🔁 ACHTUNG: Du hast im HTML "noteList", nicht "notesList"
  const searchInput = document.getElementById('searchInput');

  // Dark Mode automatisch setzen
  document.body.classList.toggle('dark', localStorage.getItem('darkMode') === 'true');

  // Notizen aus dem LocalStorage laden
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  renderNotes(notes);

  // Neue Notiz speichern
  addNoteBtn.addEventListener('click', () => {
    const text = noteText.value.trim();
    const category = noteCategory.value;

    if (text === '') return;

    const note = {
      id: Date.now(),
      text,
      category
    };

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes(notes);

    noteText.value = '';
    noteCategory.value = 'Allgemein';
  });

  // Suchen
  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = notes.filter(n => n.text.toLowerCase().includes(keyword));
    renderNotes(filtered);
  });

  // Funktion: Notizen anzeigen
  function renderNotes(noteArray) {
    notesList.innerHTML = '';

    if (noteArray.length === 0) {
      notesList.innerHTML = '<p>Keine Notizen vorhanden.</p>';
      return;
    }

    noteArray.forEach(note => {
      const div = document.createElement('div');
      div.className = 'note';

      div.innerHTML = `
        <div class="category">${note.category}</div>
        <div class="text">${note.text}</div>
        <button onclick="deleteNote(${note.id})">🗑️ Löschen</button>
      `;

      notesList.appendChild(div);
    });
  }

  // Notiz löschen
  window.deleteNote = function(id) {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes(notes);
  };

  // Dark Mode Umschalten mit Taste "D"
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'd') {
      document.body.classList.toggle('dark');
      localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    }
  });
});
