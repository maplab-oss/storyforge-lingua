export const languages = [
  { id: 'es', name: 'Spanish', code: 'es', stories: 45, characters: 23, words: 1240, status: 'active' },
  { id: 'fr', name: 'French', code: 'fr', stories: 38, characters: 19, words: 980, status: 'active' },
  { id: 'de', name: 'German', code: 'de', stories: 12, characters: 8, words: 450, status: 'beta' },
  { id: 'it', name: 'Italian', code: 'it', stories: 28, characters: 15, words: 890, status: 'active' },
  { id: 'pt', name: 'Portuguese', code: 'pt', stories: 22, characters: 12, words: 720, status: 'active' },
  { id: 'ja', name: 'Japanese', code: 'ja', stories: 8, characters: 6, words: 320, status: 'beta' },
];

export const stories = [
  { id: '1', title: 'La Aventura del Mercado', language: 'es', status: 'published', voice: 'Maria', words: 234, createdAt: '2024-01-15' },
  { id: '2', title: 'El Café Misterioso', language: 'es', status: 'draft', voice: 'Carlos', words: 189, createdAt: '2024-01-20' },
  { id: '3', title: 'La Playa en Verano', language: 'es', status: 'published', voice: 'Maria', words: 312, createdAt: '2024-01-22' },
  { id: '4', title: 'El Viaje en Tren', language: 'es', status: 'published', voice: 'Carlos', words: 278, createdAt: '2024-01-25' },
  { id: '5', title: 'Le Petit Restaurant', language: 'fr', status: 'published', voice: 'Sophie', words: 256, createdAt: '2024-01-18' },
  { id: '6', title: 'La Boulangerie du Coin', language: 'fr', status: 'published', voice: 'Pierre', words: 298, createdAt: '2024-01-21' },
  { id: '7', title: 'Une Journée à Paris', language: 'fr', status: 'draft', voice: 'Sophie', words: 187, createdAt: '2024-01-24' },
  { id: '8', title: 'Der Marktplatz', language: 'de', status: 'published', voice: 'Hans', words: 245, createdAt: '2024-01-19' },
  { id: '9', title: 'Das Kaffeehaus', language: 'de', status: 'draft', voice: 'Anna', words: 156, createdAt: '2024-01-23' },
  { id: '10', title: 'La Piazza Italiana', language: 'it', status: 'published', voice: 'Marco', words: 289, createdAt: '2024-01-17' },
  { id: '11', title: 'Il Mercato di Roma', language: 'it', status: 'published', voice: 'Giulia', words: 267, createdAt: '2024-01-20' },
  { id: '12', title: 'O Café Brasileiro', language: 'pt', status: 'published', voice: 'João', words: 234, createdAt: '2024-01-16' },
  { id: '13', title: 'A Praia do Rio', language: 'pt', status: 'draft', voice: 'Maria', words: 201, createdAt: '2024-01-22' },
  { id: '14', title: '東京の朝', language: 'ja', status: 'published', voice: 'Yuki', words: 198, createdAt: '2024-01-19' },
];

export const storyIdeas = [
  { id: '1', idea: 'A story about visiting a traditional market', language: 'es' },
  { id: '2', idea: 'A mystery at a local café', language: 'es' },
  { id: '3', idea: 'Meeting a new friend at the park', language: 'es' },
  { id: '4', idea: 'Ordering food at a French bistro', language: 'fr' },
  { id: '5', idea: 'A day at the Louvre museum', language: 'fr' },
  { id: '6', idea: 'Shopping at a German Christmas market', language: 'de' },
  { id: '7', idea: 'A cooking class in Italy', language: 'it' },
  { id: '8', idea: 'Exploring Lisbon by tram', language: 'pt' },
  { id: '9', idea: 'Learning calligraphy in Kyoto', language: 'ja' },
];

export const characters = [
  { id: '1', name: 'María González', language: 'es', type: 'main', stories: 12, status: 'active', createdAt: '2024-01-10', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
  { id: '2', name: 'Carlos Ruiz', language: 'es', type: 'supporting', stories: 8, status: 'active', createdAt: '2024-01-12', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
  { id: '3', name: 'Ana López', language: 'es', type: 'main', stories: 9, status: 'active', createdAt: '2024-01-14', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
  { id: '4', name: 'Sophie Dubois', language: 'fr', type: 'main', stories: 15, status: 'active', createdAt: '2024-01-08', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie' },
  { id: '5', name: 'Pierre Martin', language: 'fr', type: 'supporting', stories: 11, status: 'active', createdAt: '2024-01-11', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pierre' },
  { id: '6', name: 'Hans Müller', language: 'de', type: 'main', stories: 6, status: 'active', createdAt: '2024-01-13', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hans' },
  { id: '7', name: 'Anna Schmidt', language: 'de', type: 'supporting', stories: 4, status: 'active', createdAt: '2024-01-15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna' },
  { id: '8', name: 'Marco Rossi', language: 'it', type: 'main', stories: 10, status: 'active', createdAt: '2024-01-09', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marco' },
  { id: '9', name: 'Giulia Bianchi', language: 'it', type: 'main', stories: 8, status: 'active', createdAt: '2024-01-12', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Giulia' },
  { id: '10', name: 'João Silva', language: 'pt', type: 'main', stories: 7, status: 'active', createdAt: '2024-01-11', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao' },
  { id: '11', name: 'Maria Santos', language: 'pt', type: 'supporting', stories: 5, status: 'active', createdAt: '2024-01-14', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaSantos' },
  { id: '12', name: 'Yuki Tanaka', language: 'ja', type: 'main', stories: 4, status: 'active', createdAt: '2024-01-16', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki' },
];

export const characterIdeas = [
  { id: '1', idea: 'A friendly market vendor', language: 'es' },
  { id: '2', idea: 'A mysterious café owner', language: 'es' },
  { id: '3', idea: 'A taxi driver with stories', language: 'es' },
  { id: '4', idea: 'A French chef', language: 'fr' },
  { id: '5', idea: 'An art gallery curator', language: 'fr' },
  { id: '6', idea: 'A German bookstore owner', language: 'de' },
  { id: '7', idea: 'An Italian gelato maker', language: 'it' },
  { id: '8', idea: 'A Brazilian musician', language: 'pt' },
  { id: '9', idea: 'A Japanese tea master', language: 'ja' },
];

export const words = [
  { id: '1', word: 'hola', language: 'es', translation: 'hello', transliteration: 'O-la', partOfSpeech: 'interjection', rank: 50, tags: ['greetings', 'basic'], notes: 'Most common greeting', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '2', word: 'gracias', language: 'es', translation: 'thank you', transliteration: 'GRA-sias', partOfSpeech: 'interjection', rank: 75, tags: ['courtesy', 'basic'], notes: 'Essential politeness word', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '3', word: 'mercado', language: 'es', translation: 'market', transliteration: 'mer-KA-do', partOfSpeech: 'noun', rank: 450, tags: ['shopping', 'places'], notes: 'Common word for market or marketplace', dataSources: ['anki-core-1000', 'frequency-list'], feedback: [] },
  { id: '4', word: 'café', language: 'es', translation: 'coffee / café', transliteration: 'ka-FE', partOfSpeech: 'noun', rank: 320, tags: ['food', 'drinks'], notes: 'Can mean both the drink and the place', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '5', word: 'calle', language: 'es', translation: 'street', transliteration: 'KA-ye', partOfSpeech: 'noun', rank: 280, tags: ['places', 'city'], notes: 'Used in addresses', dataSources: ['frequency-list'], feedback: [] },
  { id: '6', word: 'casa', language: 'es', translation: 'house', transliteration: 'KA-sa', partOfSpeech: 'noun', rank: 120, tags: ['home', 'places'], notes: 'Also means home', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '7', word: 'playa', language: 'es', translation: 'beach', transliteration: 'PLA-ya', partOfSpeech: 'noun', rank: 520, tags: ['nature', 'places'], notes: 'Popular vacation word', dataSources: ['frequency-list'], feedback: [] },
  { id: '8', word: 'agua', language: 'es', translation: 'water', transliteration: 'A-gwa', partOfSpeech: 'noun', rank: 180, tags: ['drinks', 'basic'], notes: 'Feminine noun despite ending in -a', dataSources: ['anki-core-1000'], feedback: [] },
  
  { id: '9', word: 'bonjour', language: 'fr', translation: 'hello / good day', transliteration: 'bon-ZHOOR', partOfSpeech: 'interjection', rank: 45, tags: ['greetings', 'basic'], notes: 'Used during daytime', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '10', word: 'merci', language: 'fr', translation: 'thank you', transliteration: 'mer-SEE', partOfSpeech: 'interjection', rank: 70, tags: ['courtesy', 'basic'], notes: 'Essential politeness word', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '11', word: 'restaurant', language: 'fr', translation: 'restaurant', transliteration: 'res-to-RAHN', partOfSpeech: 'noun', rank: 280, tags: ['food', 'places'], notes: 'Same in French and English', dataSources: ['frequency-list'], feedback: [] },
  { id: '12', word: 'boulangerie', language: 'fr', translation: 'bakery', transliteration: 'boo-lan-zhuh-REE', partOfSpeech: 'noun', rank: 620, tags: ['food', 'places'], notes: 'Where to buy bread', dataSources: ['frequency-list'], feedback: [] },
  { id: '13', word: 'pain', language: 'fr', translation: 'bread', transliteration: 'pan', partOfSpeech: 'noun', rank: 340, tags: ['food'], notes: 'Staple of French cuisine', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '14', word: 'rue', language: 'fr', translation: 'street', transliteration: 'roo', partOfSpeech: 'noun', rank: 250, tags: ['places', 'city'], notes: 'Used in addresses', dataSources: ['frequency-list'], feedback: [] },
  { id: '15', word: 'maison', language: 'fr', translation: 'house', transliteration: 'may-ZON', partOfSpeech: 'noun', rank: 190, tags: ['home', 'places'], notes: 'Also means home', dataSources: ['anki-core-1000'], feedback: [] },
  
  { id: '16', word: 'guten Tag', language: 'de', translation: 'good day', transliteration: 'GOO-ten TAHK', partOfSpeech: 'phrase', rank: 55, tags: ['greetings', 'basic'], notes: 'Formal daytime greeting', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '17', word: 'danke', language: 'de', translation: 'thank you', transliteration: 'DAN-kuh', partOfSpeech: 'interjection', rank: 80, tags: ['courtesy', 'basic'], notes: 'Common thanks', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '18', word: 'Markt', language: 'de', translation: 'market', transliteration: 'MARKT', partOfSpeech: 'noun', rank: 480, tags: ['shopping', 'places'], notes: 'Masculine noun', dataSources: ['frequency-list'], feedback: [] },
  { id: '19', word: 'Kaffee', language: 'de', translation: 'coffee', transliteration: 'KA-fay', partOfSpeech: 'noun', rank: 350, tags: ['drinks', 'food'], notes: 'Masculine noun', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '20', word: 'Haus', language: 'de', translation: 'house', transliteration: 'HOUSE', partOfSpeech: 'noun', rank: 210, tags: ['home', 'places'], notes: 'Neuter noun', dataSources: ['anki-core-1000'], feedback: [] },
  
  { id: '21', word: 'ciao', language: 'it', translation: 'hello / bye', transliteration: 'CHOW', partOfSpeech: 'interjection', rank: 40, tags: ['greetings', 'basic'], notes: 'Informal greeting', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '22', word: 'grazie', language: 'it', translation: 'thank you', transliteration: 'GRA-tsee-eh', partOfSpeech: 'interjection', rank: 65, tags: ['courtesy', 'basic'], notes: 'Essential politeness', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '23', word: 'piazza', language: 'it', translation: 'square', transliteration: 'pee-AHT-tsa', partOfSpeech: 'noun', rank: 380, tags: ['places', 'city'], notes: 'Town square', dataSources: ['frequency-list'], feedback: [] },
  { id: '24', word: 'gelato', language: 'it', translation: 'ice cream', transliteration: 'jeh-LAH-toh', partOfSpeech: 'noun', rank: 550, tags: ['food', 'dessert'], notes: 'Italian ice cream', dataSources: ['frequency-list'], feedback: [] },
  { id: '25', word: 'casa', language: 'it', translation: 'house', transliteration: 'KA-sa', partOfSpeech: 'noun', rank: 160, tags: ['home', 'places'], notes: 'Also means home', dataSources: ['anki-core-1000'], feedback: [] },
  
  { id: '26', word: 'olá', language: 'pt', translation: 'hello', transliteration: 'oh-LAH', partOfSpeech: 'interjection', rank: 48, tags: ['greetings', 'basic'], notes: 'Common greeting', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '27', word: 'obrigado', language: 'pt', translation: 'thank you (m)', transliteration: 'oh-bree-GAH-doo', partOfSpeech: 'interjection', rank: 72, tags: ['courtesy', 'basic'], notes: 'Male speaker', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '28', word: 'café', language: 'pt', translation: 'coffee', transliteration: 'ka-FEH', partOfSpeech: 'noun', rank: 310, tags: ['drinks', 'food'], notes: 'Brazilian favorite', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '29', word: 'praia', language: 'pt', translation: 'beach', transliteration: 'PRY-ah', partOfSpeech: 'noun', rank: 490, tags: ['nature', 'places'], notes: 'Important in Brazilian culture', dataSources: ['frequency-list'], feedback: [] },
  { id: '30', word: 'casa', language: 'pt', translation: 'house', transliteration: 'KA-za', partOfSpeech: 'noun', rank: 150, tags: ['home', 'places'], notes: 'Also means home', dataSources: ['anki-core-1000'], feedback: [] },
  
  { id: '31', word: 'こんにちは', language: 'ja', translation: 'hello', transliteration: 'kon-nee-chee-wa', partOfSpeech: 'interjection', rank: 42, tags: ['greetings', 'basic'], notes: 'Daytime greeting', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '32', word: 'ありがとう', language: 'ja', translation: 'thank you', transliteration: 'a-ree-ga-toh', partOfSpeech: 'interjection', rank: 68, tags: ['courtesy', 'basic'], notes: 'Casual thanks', dataSources: ['anki-core-1000'], feedback: [] },
  { id: '33', word: '市場', language: 'ja', translation: 'market', transliteration: 'ee-chee-ba', partOfSpeech: 'noun', rank: 520, tags: ['shopping', 'places'], notes: 'Traditional market', dataSources: ['frequency-list'], feedback: [] },
  { id: '34', word: 'お茶', language: 'ja', translation: 'tea', transliteration: 'o-cha', partOfSpeech: 'noun', rank: 290, tags: ['drinks', 'culture'], notes: 'Central to Japanese culture', dataSources: ['anki-core-1000'], feedback: [] },
];

export const voices = [
  { id: 'maria', name: 'Maria', language: 'es', provider: 'elevenlabs' },
  { id: 'carlos', name: 'Carlos', language: 'es', provider: 'elevenlabs' },
  { id: 'sophie', name: 'Sophie', language: 'fr', provider: 'elevenlabs' },
  { id: 'pierre', name: 'Pierre', language: 'fr', provider: 'elevenlabs' },
  { id: 'hans', name: 'Hans', language: 'de', provider: 'elevenlabs' },
  { id: 'anna', name: 'Anna', language: 'de', provider: 'elevenlabs' },
  { id: 'marco', name: 'Marco', language: 'it', provider: 'elevenlabs' },
  { id: 'giulia', name: 'Giulia', language: 'it', provider: 'elevenlabs' },
  { id: 'joao', name: 'João', language: 'pt', provider: 'elevenlabs' },
  { id: 'maria-pt', name: 'Maria', language: 'pt', provider: 'elevenlabs' },
  { id: 'yuki', name: 'Yuki', language: 'ja', provider: 'elevenlabs' },
  { id: 'kenji', name: 'Kenji', language: 'ja', provider: 'elevenlabs' },
];
