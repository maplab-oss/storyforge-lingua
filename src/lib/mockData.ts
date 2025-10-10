export const languages = [
  { id: '1', name: 'Spanish', code: 'es', stories: 45, characters: 23, words: 1240, status: 'active' },
  { id: '2', name: 'French', code: 'fr', stories: 38, characters: 19, words: 980, status: 'active' },
  { id: '3', name: 'German', code: 'de', stories: 12, characters: 8, words: 450, status: 'beta' },
];

export const stories = [
  { 
    id: '1', 
    title: 'La Aventura del Mercado', 
    language: 'es',
    status: 'published',
    voice: 'Maria',
    words: 234,
    createdAt: '2024-01-15'
  },
  { 
    id: '2', 
    title: 'El Café Misterioso', 
    language: 'es',
    status: 'draft',
    voice: 'Carlos',
    words: 189,
    createdAt: '2024-01-20'
  },
  { 
    id: '3', 
    title: 'Le Petit Restaurant', 
    language: 'fr',
    status: 'published',
    voice: 'Sophie',
    words: 256,
    createdAt: '2024-01-18'
  },
];

export const storyIdeas = [
  { id: '1', idea: 'A story about visiting a traditional market', language: 'es' },
  { id: '2', idea: 'A mystery at a local café', language: 'es' },
  { id: '3', idea: 'Ordering food at a French bistro', language: 'fr' },
];

export const characters = [
  { 
    id: '1', 
    name: 'María González', 
    language: 'es',
    type: 'main',
    stories: 12,
    status: 'active',
    createdAt: '2024-01-10'
  },
  { 
    id: '2', 
    name: 'Carlos Ruiz', 
    language: 'es',
    type: 'supporting',
    stories: 8,
    status: 'active',
    createdAt: '2024-01-12'
  },
  { 
    id: '3', 
    name: 'Sophie Dubois', 
    language: 'fr',
    type: 'main',
    stories: 15,
    status: 'active',
    createdAt: '2024-01-08'
  },
];

export const characterIdeas = [
  { id: '1', idea: 'A friendly market vendor', language: 'es' },
  { id: '2', idea: 'A mysterious café owner', language: 'es' },
  { id: '3', idea: 'A French chef', language: 'fr' },
];

export const words = [
  {
    id: '1',
    word: 'mercado',
    language: 'es',
    translation: 'market',
    transliteration: 'mer-KA-do',
    partOfSpeech: 'noun',
    rank: 450,
    tags: ['shopping', 'places'],
    notes: 'Common word for market or marketplace',
    dataSources: ['anki-core-1000', 'frequency-list'],
    feedback: [],
  },
  {
    id: '2',
    word: 'café',
    language: 'es',
    translation: 'coffee / café',
    transliteration: 'ka-FE',
    partOfSpeech: 'noun',
    rank: 320,
    tags: ['food', 'drinks'],
    notes: 'Can mean both the drink and the place',
    dataSources: ['anki-core-1000'],
    feedback: [],
  },
  {
    id: '3',
    word: 'restaurant',
    language: 'fr',
    translation: 'restaurant',
    transliteration: 'res-to-RAHN',
    partOfSpeech: 'noun',
    rank: 280,
    tags: ['food', 'places'],
    notes: 'Same in French and English',
    dataSources: ['frequency-list'],
    feedback: [],
  },
];

export const voices = [
  { id: 'maria', name: 'Maria', language: 'es', provider: 'elevenlabs' },
  { id: 'carlos', name: 'Carlos', language: 'es', provider: 'elevenlabs' },
  { id: 'sophie', name: 'Sophie', language: 'fr', provider: 'elevenlabs' },
  { id: 'pierre', name: 'Pierre', language: 'fr', provider: 'elevenlabs' },
];
